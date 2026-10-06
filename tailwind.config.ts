import type { Config } from "tailwindcss";

/**
 * CEZAR LONDON — design tokens.
 * Palette, type scale and motion curves live here so the whole site stays
 * on-brand and stays easy to re-tune for the business.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      screens: {
        xs: "420px",
        "3xl": "1800px",
      },
      colors: {
        ink: {
          DEFAULT: "#080808",
          950: "#050505",
          900: "#0C0C0C",
          800: "#131313",
          700: "#1C1C1C",
          600: "#262626",
        },
        ivory: {
          DEFAULT: "#F5F2ED",
          200: "#E9E4DC",
          300: "#D8D5D2",
        },
        chrome: {
          100: "#F4F4F4",
          DEFAULT: "#C7C7C7",
          400: "#A9A9A9",
          500: "#8C8C8C",
          700: "#5F5F5F",
        },
        burgundy: {
          DEFAULT: "#8D1538",
          500: "#A81C43",
          700: "#6E1029",
          900: "#43081A",
        },
        mist: "#D8D5D2",
      },
      fontFamily: {
        display: ["var(--font-display)", "Cormorant Garamond", "Times New Roman", "serif"],
        sans: ["var(--font-sans)", "Manrope", "system-ui", "-apple-system", "sans-serif"],
      },
      letterSpacing: {
        micro: "0.36em",
        eyebrow: "0.26em",
        wide: "0.14em",
        display: "-0.03em",
        tighter2: "-0.05em",
      },
      fontSize: {
        micro: ["0.625rem", { lineHeight: "1.2", letterSpacing: "0.36em" }],
        eyebrow: ["0.6875rem", { lineHeight: "1.3", letterSpacing: "0.26em" }],
      },
      maxWidth: {
        shell: "1680px",
        prose: "60ch",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.16, 1, 0.3, 1)",
        silk: "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      keyframes: {
        marquee: {
          from: { transform: "translate3d(0,0,0)" },
          to: { transform: "translate3d(-50%,0,0)" },
        },
        sheen: {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(120%)" },
        },
        scrollLine: {
          "0%": { transform: "scaleY(0)", transformOrigin: "top" },
          "45%": { transform: "scaleY(1)", transformOrigin: "top" },
          "55%": { transform: "scaleY(1)", transformOrigin: "bottom" },
          "100%": { transform: "scaleY(0)", transformOrigin: "bottom" },
        },
        floatSlow: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        marquee: "marquee 46s linear infinite",
        sheen: "sheen 5s cubic-bezier(0.4,0,0.2,1) infinite",
        "scroll-line": "scrollLine 2.8s cubic-bezier(0.16,1,0.3,1) infinite",
        "float-slow": "floatSlow 7s ease-in-out infinite",
      },
      backgroundImage: {
        "chrome-text":
          "linear-gradient(180deg, #FFFFFF 0%, #E6E6E6 26%, #9A9A9A 48%, #F2F2F2 62%, #7C7C7C 100%)",
        "chrome-line":
          "linear-gradient(90deg, transparent 0%, rgba(199,199,199,0.65) 50%, transparent 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
