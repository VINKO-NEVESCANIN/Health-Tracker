// src/config/env.ts
// Configuración central. En producción faltar JWT_SECRET es un error fatal,
// para no arrancar nunca con un secreto de ejemplo.
export const IS_PROD = process.env.NODE_ENV === "production";

export const JWT_SECRET: string = (() => {
  const s = process.env.JWT_SECRET;
  if (s && s.length >= 16) return s;
  if (IS_PROD) {
    throw new Error("JWT_SECRET es obligatorio en producción (mínimo 16 caracteres).");
  }
  return "secret_dev";
})();

// Solo para desarrollo: permite registrarse como Doctor/Admin desde /auth/register.
// En producción debe quedar apagado; las cuentas de doctor se crean con `npm run create-user`.
export const ALLOW_ROLE_SIGNUP = !IS_PROD && process.env.ALLOW_ROLE_SIGNUP === "true";
