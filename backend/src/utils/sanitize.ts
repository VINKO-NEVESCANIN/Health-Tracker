// src/utils/sanitize.ts
// Nunca devolver el hash de la contraseña al cliente.
export const publicUser = <T extends { password?: unknown }>(user: T | null) => {
  if (!user) return user;
  const { password, ...rest } = user as any;
  return rest;
};
