/**
 * @module fs-kernels
 */
import { ExecaChildProcess } from "execa";
import pidusage from "pidusage";

import { Observable, of, merge, empty } from "rxjs";
import {
  filter,
  map,
  tap,
  mergeMap,
  catchError,
  switchMap,
  concatMap,
  timeout,
  first,
  toArray
} from "rxjs/operators";

import {
  Channels,
  shutdownRequest,
  childOf,
  ofMessageType
} from "@nteract/messaging";
import { createKernelRef, KernelRef } from "@nteract/types";

import { JupyterConnectionInfo } from "enchannel-zmq-backend";

import { KernelSpec } from "./kernelspecs";
import { cleanup, launch, LaunchedKernel, launchSpec } from "./spawnteract";

interface Usage {
  /**
   * percentage (from 0 to 100*number of cores)
   */
  cpu: number;

  /**
   * bytes
   */
  memory: number;

  /**
   * PPID - Parent PID
   */
  ppid: number;

  /**
   * PID - Process ID
   */
  pid: number;

  /**
   * ms user + system time (in local time)
   */
  ctime: number;

  /**
   * ms since the start of the process (local time)
   */
  elapsed: number;

  /**
   * ms since epoch (local time)
   */
  timestamp: number;
}

export class Kernel {
  id: KernelRef;
  kernelSpec: KernelSpec;
  process: ExecaChildProcess;
  connectionInfo: JupyterConnectionInfo;
  connectionFile: string;
  channels: Channels;

  constructor(launchedKernel: LaunchedKernel) {
    this.id = createKernelRef();
    this.process = launchedKernel.spawn;
    this.connectionInfo = launchedKernel.config;
    this.kernelSpec = launchedKernel.kernelSpec;
    this.connectionFile = launchedKernel.connectionFile;
    this.channels = launchedKernel.channels;
  }

  shutdownEpic() {
    const request = shutdownRequest({ restart: false });

    // Try to make a shutdown request
    // If we don't get a response within X time, force a shutdown
    // Either way do the same cleanup
    const shutDownHandling = this.channels.pipe(
      childOf(request),
      ofMessageType("shutdown_reply"),
      first(),
      // If we got a reply, great! :)
      map(msg => {
        return {
          text: msg.content,
          id: this.id
        };
      }),
      // If we don't get a response within 2s, assume failure :(
      timeout(1000 * 2),
      catchError(err => of({ error: err, id: this.id })),
      mergeMap(async action => {
        debugger;
        // End all communication on the channels
        this.channels.complete();

        await this.shutdownProcess();

        return merge(
          // Pass on our intermediate action (whether or not kernel ACK'd shutdown request promptly)
          of(action),
          // Indicate overall success (channels cleaned up)
          of({
            id: this.id
          }),
          // Inform about the state
          of({
            status: "shutting down",
            id: this.id
          })
        );
      }),
      catchError(err =>
        // Catch all, in case there were other errors here
        of({ error: err, id: this.id })
      )
    );

    // On subscription, send the message
    return Observable.create(observer => {
      const subscription = shutDownHandling.subscribe(observer);
      this.channels.next(request);
      return subscription;
    });
  }

  async shutdownProcess() {
    cleanup(this.connectionFile);
    if (!this.process.killed && this.process.pid) {
      process.kill(this.process.pid);
    }
    this.process.removeAllListeners();
  }

  async shutdown() {
    const observable = this.shutdownEpic();
    return observable.pipe(toArray()).toPromise();
  }

  async getUsage(): Promise<Usage> {
    return await pidusage(this.process.pid);
  }
}

export async function launchKernel(input: string | KernelSpec) {
  let launchedKernel;
  if (typeof input === "string") {
    launchedKernel = await launch(input);
  } else {
    launchedKernel = await launchSpec(input);
  }
  return new Kernel(launchedKernel);
}
