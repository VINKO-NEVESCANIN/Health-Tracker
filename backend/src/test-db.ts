import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // 1️⃣ Crear doctor (User)
  const doctor = await prisma.user.create({
    data: {
      name: "Doctor Prueba",
      email: "doctor@example.com",
      password: "123456",
      role: "doctor",
    },
  });

  console.log("✅ Doctor creado:", doctor);

  // 2️⃣ Crear paciente
  const patient = await prisma.patient.create({
    data: {
      firstName: "Paciente",
      lastName: "Test",
      doctorId: doctor.id,
      age: 30,
    },
  });

  console.log("✅ Paciente creado:", patient);

  // 3️⃣ Crear crisis (EVENTO REAL)
  const crisis = await prisma.crisis.create({
    data: {
      patientId: patient.id,
      intensity: 5,
      durationMin: 10,
      notes: "Ataque de ansiedad leve",
    },
  });

  console.log("✅ Crisis creada:", crisis);

  // 4️⃣ Traer paciente con crisis
  const patientWithCrisis = await prisma.patient.findUnique({
    where: { id: patient.id },
    include: { crisis: true },
  });

  console.log("📌 Paciente con crisis:", patientWithCrisis);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
