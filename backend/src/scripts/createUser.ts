// Crea (o actualiza) una cuenta directamente en la base de datos.
// Uso:  npm run create-user -- correo@ejemplo.com "Contraseña123" Doctor "Nombre"
// Roles: Doctor | Admin | Paciente
import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import prisma from "../config/db";

async function main() {
  const [email, password, role = "Doctor", firstName = "Doctor"] = process.argv.slice(2);
  if (!email || !password) {
    console.error('Uso: npm run create-user -- correo "contraseña" [Doctor|Admin|Paciente] [nombre]');
    process.exit(1);
  }
  if (password.length < 8) {
    console.error("La contraseña debe tener al menos 8 caracteres.");
    process.exit(1);
  }
  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.upsert({
    where: { email },
    update: { password: hashed, role, firstName },
    create: { email, password: hashed, role, firstName },
  });
  console.log(`Listo: ${user.email} (${user.role}) id=${user.id}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
