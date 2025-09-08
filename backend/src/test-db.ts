import { PrismaClient } from "./generated/prisma";

const prisma = new PrismaClient();

async function main() {
  // Crear un evento de prueba
  const event = await prisma.event.create({
    data: {
      description: "Primer ataque de ansiedad registrado",
      intensity: 7,
      //timestamp: new Date(), Incorporado de forma Default ya no es necesario
    },
  });

  console.log("✅ Evento creado:", event);

  // Leer todos los eventos
  const events = await prisma.event.findMany();
  console.log("📌 Eventos en la base de datos:", events);
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
