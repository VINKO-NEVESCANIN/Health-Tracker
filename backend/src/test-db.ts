import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

async function main() {
  // Crear un usuario (paciente)
  const user = await prisma.user.create({
    data: {
      name: "Paciente de Prueba",
      email: "paciente@example.com",
      password: "123456", // ⚠️ en producción se cifra con bcrypt
    },
  });

  console.log("✅ Usuario creado:", user);

  // Crear un evento ligado al usuario
  const event = await prisma.event.create({
    data: {
      description: "Ataque de ansiedad leve",
      intensity: 5,
      userId: user.id, // 🔑 relación con User
    },
  });

  console.log("✅ Evento creado:", event);

  // Traer usuario con sus eventos
  const userWithEvents = await prisma.user.findUnique({
    where: { id: user.id },
    include: { events: true },
  });

  console.log("📌 Usuario con eventos:", userWithEvents);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
