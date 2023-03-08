import defaultTheme from "tailwindcss/defaultTheme";
import { Config } from "tailwindcss";

const bccForbundetTheme: Partial<Config> = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["Archivo", ...defaultTheme.fontFamily.sans],
        serif: ["IBM Plex Serif", ...defaultTheme.fontFamily.serif],
      },
      colors: {
        neutral: {
          0: "#ffffff",
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },
        "primary-dark-green": {
          50: "#f5f8f8",
          100: "#eaeeef",
          200: "#d2dadb",
          300: "#acbdbd",
          400: "#8ea6a6",
          500: "#437571",
          600: "#004e48",
          700: "#023d38",
          800: "#021f1c",
          900: "#020a0b",
        },
        "tree-green": {
          50: "#f3faf7",
          100: " #d8efe5",
          200: " #b1decc",
          300: " #82c6ad",
          400: " #5cab91",
          500: " #3e8e75",
          600: " #30715e",
          700: " #2a5b4e",
          800: " #254a40",
          900: " #223f37",
        },
        "mantis-green": {
          50: "#f5faf3",
          100: "#e7f5e3",
          200: "#cfeac8",
          300: "#a9d89d",
          400: "#78bd67",
          500: "#57a245",
          600: "#448534",
          700: "#37692c",
          800: "#2f5427",
          900: "#284522",
        },
        "neptune-blue": {
          50: "#f2f9f9",
          100: "#ddeef0",
          200: "#bfdfe2",
          300: "#92c7ce",
          400: "#74b2bc",
          500: "#438a97",
          700: "#345e6a",
          600: "#3a7280",
          800: "#314f59",
          900: "#2d444c",
        },
        "polo-blue": {
          50: "#f4f6fa",
          100: "#e6ebf3",
          200: "#d2dbeb",
          300: "#b4c4dc",
          400: "#97abce",
          500: "#758abc",
          600: "#6274ae",
          700: "#57639e",
          800: "#4b5382",
          900: "#3f4669",
        },
        "cold-purple": {
          50: "#f6f6fc",
          100: "#efeef9",
          200: "#e1e0f4",
          300: "#cac6ec",
          400: "#a69ddc",
          500: "#9181d1",
          600: "#7d65c2",
          700: "#6c53ae",
          800: "#5b4592",
          900: "#4b3a78",
        },
        "wisteria-pink": {
          50: "#fbf8fc",
          100: "#f6eef9",
          200: "#f0e0f4",
          300: "#e3c7eb",
          400: "#d0a3dd",
          500: "#bd7fcd",
          600: "#aa62bb",
          700: "#924ea2",
          800: "#7a4485",
          900: "#63386b",
        },
        "viola-pink": {
          50: "#faf5f7",
          100: "#f6edf1",
          200: "#eedce3",
          300: "#e2bfcc",
          400: "#ce97ab",
          500: "#bc788f",
          600: "#a75b71",
          700: "#8e485a",
          800: "#763e4c",
          900: "#643742",
        },
        "muddy-waters": {
          50: "#f9f4f1",
          100: "#eedfd7",
          200: "#dbbeac",
          300: "#c89a81",
          400: "#bd8167",
          500: "#b06450",
          600: "#9b4f44",
          700: "#813d3c",
          800: "#6b3538",
          900: "#592e30",
        },
        "sand-brown": {
          50: "#f9f7f3",
          100: "#f2ede2",
          200: "#e4d9c4",
          300: "#d2bf9f",
          400: "#bfa178",
          500: "#b28b5d",
          600: "#a47852",
          700: "#896245",
          800: "#6f4f3d",
          900: "#5b4233",
        },
        gimblet: {
          50: "#faf9f2",
          100: "#f3f1e1",
          200: "#e5e1c3",
          300: "#d5cd9c",
          400: "#bdac67",
          500: "#b6a059",
          600: "#a98d4d",
          700: "#8c7142",
          800: "#725c3a",
          900: "#5d4b31",
        },
      },
    },
  },
};

export default bccForbundetTheme.theme;
