import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Crear contraseñas
  const adminPass = await bcrypt.hash("admin123", 10);
  const doctorPass = await bcrypt.hash("doctor123", 10);

  // ADMIN
  const admin = await prisma.user.create({
    data: {
      name: "Administrador",
      email: "admin@health.com",
      password: adminPass,
      role: "admin",
    },
  });

  // DOCTOR
  const doctor = await prisma.user.create({
    data: {
      name: "Dr. Doom",
      email: "doctor@health.com",
      password: doctorPass,
      role: "doctor",
    },
  });

  // PACIENTES
  const patients = await prisma.patient.createMany({
    data: [
      {
        firstName: "Juan",
        lastName: "Pérez",
        age: 29,
        epilepsyType: "Tónico-clónica",
        totalCrisis: 3,
        doctorId: doctor.id,
        phone: "6621231234",
        email: "juan@example.com"
      },
      {
        firstName: "María",
        lastName: "López",
        age: 34,
        epilepsyType: "Ausencias",
        totalCrisis: 1,
        doctorId: doctor.id,
        phone: "6622222222",
        email: "maria@example.com"
      },
      {
        firstName: "Carlos",
        lastName: "García",
        age: 41,
        epilepsyType: "Focal",
        totalCrisis: 5,
        doctorId: doctor.id,
        phone: "6621111111",
        email: "carlos@example.com"
      }
    ],
  });

  // Obtener pacientes insertados
  const allPatients = await prisma.patient.findMany();

  // MEDICAMENTOS
  const med1 = await prisma.medication.create({
    data: { name: "Valproato", description: "Antiepiléptico" }
  });

  const med2 = await prisma.medication.create({
    data: { name: "Carbamazepina", description: "Control de crisis focales" }
  });

  // MEDICAMENTOS-PACIENTES
  await prisma.patientMedication.createMany({
    data: [
      {
        patientId: allPatients[0].id,
        medicationId: med1.id,
        dose: "500 mg",
        interval: "Cada 12 horas"
      },
      {
        patientId: allPatients[1].id,
        medicationId: med2.id,
        dose: "200 mg",
        interval: "Cada 8 horas"
      }
    ],
  });

  // CITAS
  await prisma.appointment.createMany({
    data: [
      {
        patientId: allPatients[0].id,
        doctorId: doctor.id,
        date: new Date("2025-01-10"),
        notes: "Seguimiento mensual",
      },
      {
        patientId: allPatients[1].id,
        doctorId: doctor.id,
        date: new Date("2025-01-13"),
      }
    ],
  });

  // SIGNOS VITALES
  await prisma.vital.createMany({
    data: [
      {
        patientId: allPatients[0].id,
        heartRate: 80,
        oxygen: 97,
        temperature: 36.4,
      },
      {
        patientId: allPatients[1].id,
        heartRate: 75,
        oxygen: 98,
        temperature: 36.7,
      }
    ],
  });

  // CRISIS
  await prisma.crisis.create({
    data: {
      patientId: allPatients[2].id,
      intensity: 3,
      durationMin: 2,
      notes: "Crisis nocturna"
    }
  });

  // ESTUDIOS
  await prisma.study.create({
    data: {
      patientId: allPatients[0].id,
      type: "EEG",
      notes: "Actividad eléctrica anormal",
      fileUrl: "https://example.com/estudio-eeg.pdf"
    }
  });

  console.log("🌱 Seed ejecutado con éxito.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
