import { colors } from "./colors";
import { fontFamily } from "./fontFamily";
import { textColor } from "./textColor";
import { borderColor } from "./borderColor";
import { backgroundColor } from "./backgroundColor";
import { Config } from "tailwindcss";

const bccForbundetTheme: Partial<Config> = {
  theme: {
    extend: {
      fontFamily,
      colors,
      textColor,
      borderColor,
      backgroundColor,
    },
  },
};

export default bccForbundetTheme.theme;
