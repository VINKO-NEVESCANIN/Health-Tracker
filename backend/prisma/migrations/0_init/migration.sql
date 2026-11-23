-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "addictions" BOOLEAN,
    "age" INTEGER,
    "anxiety" BOOLEAN,
    "birthdate" TIMESTAMP(3),
    "cogniDisorder" BOOLEAN,
    "doctorId" INTEGER,
    "epilepsyType" TEXT,
    "firstCrisisDate" TIMESTAMP(3),
    "firstName" TEXT,
    "firstTime" BOOLEAN NOT NULL DEFAULT true,
    "gender" TEXT,
    "height" TEXT,
    "hypertension" BOOLEAN,
    "lastName" TEXT,
    "migraine" BOOLEAN,
    "respiDisorder" BOOLEAN,
    "weight" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appointment" (
    "id" SERIAL NOT NULL,
    "patientId" INTEGER NOT NULL,
    "doctorId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "notes" TEXT,
    "status" TEXT NOT NULL DEFAULT 'scheduled',
    "time" TEXT NOT NULL,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Medication" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "abbreviation" TEXT NOT NULL,

    CONSTRAINT "Medication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PatientMedication" (
    "id" SERIAL NOT NULL,
    "patientId" INTEGER NOT NULL,
    "medicationId" INTEGER NOT NULL,
    "dose" TEXT,
    "interval" TEXT,
    "presentation" TEXT,
    "abbreviation" TEXT,
    "name" TEXT,

    CONSTRAINT "PatientMedication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Study" (
    "id" SERIAL NOT NULL,
    "patientId" INTEGER NOT NULL,
    "dateEEG" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "dateNSMAP" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "dateRMNC" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "resEEG" TEXT DEFAULT 'No Realizado',
    "resNSMAP" TEXT DEFAULT 'No Realizado',
    "resRMNC" TEXT DEFAULT 'No Realizado',

    CONSTRAINT "Study_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Crisis" (
    "id" SERIAL NOT NULL,
    "patientId" INTEGER NOT NULL,
    "crisisDate" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER,
    "recuperation" INTEGER,
    "unconscius" BOOLEAN,
    "medication" TEXT,

    CONSTRAINT "Crisis_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientMedication" ADD CONSTRAINT "PatientMedication_medicationId_fkey" FOREIGN KEY ("medicationId") REFERENCES "Medication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientMedication" ADD CONSTRAINT "PatientMedication_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Study" ADD CONSTRAINT "Study_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Crisis" ADD CONSTRAINT "Crisis_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

