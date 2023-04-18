import { colors } from "./colors";
import { fontFamily } from "./fontFamily";
import { textColor } from "./textColor";
import { borderColor } from "./borderColor";
import { backgroundColor } from "./backgroundColor";
import { outlineColor } from "./outlineColor";
import { ringColor } from "./ringColor";
import { Config } from "tailwindcss";

const bccForbundetTheme: Partial<Config> = {
  theme: {
      fontFamily,
      colors,
      textColor,
      borderColor,
      backgroundColor,
      outlineColor,
      ringColor,
    },
};

export default bccForbundetTheme;
