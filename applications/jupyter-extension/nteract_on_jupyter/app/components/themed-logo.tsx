

import * as React from "react";

interface ThemedLogoProps {
  height?: number;
  theme?: "light" | "dark";
}

const img = {
  logo: 'https://i.ibb.co/DVW2Q8d/wisecube.png',
  height: 25,
  width: 30
}

const ThemedLogo = (props: ThemedLogoProps) => (
  <img height={img.height} width={img.width} src={img.logo} alt="WiseCube" />
);

ThemedLogo.defaultProps = {
  height: 20,
  theme: "light"
};

export { ThemedLogo };
