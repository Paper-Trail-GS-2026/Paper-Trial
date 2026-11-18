// ==========================================
// 1. CONSTANTES DE CORES DO DESIGN SYSTEM
// ==========================================

/** Azul e marinho da referência Lovable */
const paperTrailBrandColors = {
  DEFAULT: "#3978B8",
  hover: "#30689F",
  ink: "#17212F",
  navy: "#26384B",
  navy2: "#17212F",
  soft: "#EAF1F8",
  softLine: "#B5C7DB",
};

/** Neutros */
const paperTrailNeutralColors = {
  paper: "#FFFFFF",
  ground: "#F7F8FA",
  ink: "#202936",
  body: "#4B5563",
  softInk: "#525C69",
  mute: "#626D7B",
  rule: "#E8EBEF",
  rule2: "#EEF1F5",
};

/** Status */
const paperTrailStatusColors = {
  ok: "#27845A",
  mint: "#99e6bf",
  warn: "#D99135",
  danger: "#AC302E",
};

// ==========================================
// 2. MAPA DE CORES PARA TAILWIND CSS
// ==========================================

const tailwindColors = {
  // Compatibilidade com código legado
  blue: paperTrailBrandColors.DEFAULT,
  lightBlue: paperTrailBrandColors.soft,
  text: paperTrailBrandColors.DEFAULT,
  mainBackground: paperTrailNeutralColors.ground,
  secondaryBackground: paperTrailNeutralColors.paper,

  // Marca
  brand: {
    DEFAULT: paperTrailBrandColors.DEFAULT,
    hover: paperTrailBrandColors.hover,
    ink: paperTrailBrandColors.ink,
  },
  navy: {
    DEFAULT: paperTrailBrandColors.navy,
    2: paperTrailBrandColors.navy2,
  },
  soft: paperTrailBrandColors.soft,
  "soft-line": paperTrailBrandColors.softLine,

  // Neutros
  paper: paperTrailNeutralColors.paper,
  ground: paperTrailNeutralColors.ground,
  ink: paperTrailNeutralColors.ink,
  body: paperTrailNeutralColors.body,
  "soft-ink": paperTrailNeutralColors.softInk,
  mute: paperTrailNeutralColors.mute,
  rule: {
    DEFAULT: paperTrailNeutralColors.rule,
    2: paperTrailNeutralColors.rule2,
  },

  // Status
  ok: paperTrailStatusColors.ok,
  mint: paperTrailStatusColors.mint,
  warn: paperTrailStatusColors.warn,
  danger: paperTrailStatusColors.danger,
  "danger-surface": "#F3E3E1",
  "status-ready": "#236644",
  "status-ready-bg": "#E7F3EC",
  "status-pending": "#855214",
  "status-pending-bg": "#FFF3DE",
};

// ==========================================
// 3. PALETAS PARA MODO CLARO E MODO ESCURO
// ==========================================

/** @type {import('./src/Types/types').PaperTrailThemeColors} */
const paperTrailLightColors = {
  background: paperTrailNeutralColors.ground,
  card: paperTrailNeutralColors.paper,
  surface: paperTrailNeutralColors.paper,
  soft: paperTrailBrandColors.soft,
  text: paperTrailNeutralColors.ink,
  textSecondary: paperTrailNeutralColors.body,
  textMuted: paperTrailNeutralColors.mute,
  border: paperTrailNeutralColors.rule,
  borderSecondary: paperTrailNeutralColors.rule2,
  brand: paperTrailBrandColors.DEFAULT,
  icon: paperTrailNeutralColors.ink,
  onBrand: paperTrailNeutralColors.paper,
  danger: paperTrailStatusColors.danger,
  iconSecondary: paperTrailNeutralColors.mute,
};

/** @type {import('./src/Types/types').PaperTrailThemeColors} */
const paperTrailDarkColors = {
  background: paperTrailBrandColors.navy2,
  card: paperTrailBrandColors.navy,
  surface: paperTrailBrandColors.navy,
  soft: "#2E4359",                              // superfície tonal do tema escuro
  text: paperTrailNeutralColors.paper,
  textSecondary: paperTrailBrandColors.soft,
  textMuted: paperTrailBrandColors.softLine,
  border: "rgba(255, 255, 255, 0.12)",          // borda suave translúcida
  borderSecondary: "rgba(255, 255, 255, 0.08)",
  brand: "#91C4F4",
  icon: paperTrailNeutralColors.paper,
  onBrand: paperTrailBrandColors.navy2,
  danger: "#FFB4AB",
  iconSecondary: paperTrailBrandColors.softLine,
};

// ==========================================
// 4. CONFIGURAÇÃO OFICIAL TAILWIND CSS
// ==========================================

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./App.tsx", "./index.ts", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        ...tailwindColors,
        dark: {
          brand: paperTrailDarkColors.brand,
          soft: paperTrailDarkColors.soft,
          rule: paperTrailDarkColors.border,
          danger: paperTrailDarkColors.danger,
          "danger-surface": "#4A3035",
        },
      },
      fontSize: {
        display: ["28px", { lineHeight: "35px" }],
        title: ["28px", { lineHeight: "35px" }],
        heading: ["18px", { lineHeight: "25px" }],
        "body-copy": ["15px", { lineHeight: "23px" }],
        label: ["14px", { lineHeight: "20px" }],
        caption: ["13px", { lineHeight: "19px" }],
      },
    },
  },
  plugins: [],
};

// ==========================================
// 5. EXPORTS PARA USO EM RUNTIME (ThemeContext)
// ==========================================

module.exports.paperTrailLightColors = paperTrailLightColors;
module.exports.paperTrailDarkColors = paperTrailDarkColors;
module.exports.paperTrailBrandColors = paperTrailBrandColors;
module.exports.paperTrailNeutralColors = paperTrailNeutralColors;
module.exports.paperTrailStatusColors = paperTrailStatusColors;
