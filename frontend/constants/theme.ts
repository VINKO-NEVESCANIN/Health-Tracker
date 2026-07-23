// Paleta y estilos compartidos, tomados del diseño de Figma
// (gradiente morado, tarjetas blancas redondeadas, acentos de color por sección).

export const theme = {
  purple50: "#faf5ff",
  purple100: "#f3e8ff",
  purple200: "#e9d5ff",
  purple400: "#c084fc",
  purple500: "#a855f7",
  purple600: "#9333ea",
  purple700: "#7e22ce",

  pink50: "#fdf2f8",
  pink500: "#ec4899",
  pink600: "#db2777",

  indigo50: "#eef2ff",
  indigo500: "#6366f1",
  indigo600: "#4f46e5",

  blue50: "#eff6ff",
  blue500: "#3b82f6",
  blue600: "#2563eb",

  gray50: "#f9fafb",
  gray400: "#9ca3af",
  gray500: "#6b7280",
  gray700: "#374151",
  gray800: "#1f2937",

  white: "#ffffff",
  danger: "#dc2626",
};

export const gradients = {
  header: [theme.purple500, theme.purple700] as const,
  page: [theme.purple100, theme.purple200] as const,
};

export const shadow = {
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 6 },
  shadowOpacity: 0.12,
  shadowRadius: 14,
  elevation: 4,
};
