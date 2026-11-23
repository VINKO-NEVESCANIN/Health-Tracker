-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "doctorId" INTEGER,
    "firstName" TEXT,
    "lastName" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstTime" BOOLEAN NOT NULL DEFAULT true,
    "role" TEXT NOT NULL,
    "gender" TEXT,
    "age" INTEGER,
    "height" TEXT,
    "weight" TEXT,
    "birthdate" TIMESTAMP(3),
    "epilepsyType" TEXT,
    "firstCrisisDate" TIMESTAMP(3),
    "anxiety" BOOLEAN,
    "migraine" BOOLEAN,
    "addictions" BOOLEAN,
    "hypertension" BOOLEAN,
    "cogniDisorder" BOOLEAN,
    "respiDisorder" BOOLEAN,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appointment" (
    "id" SERIAL NOT NULL,
    "patientId" INTEGER NOT NULL,
    "doctorId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TEXT NOT NULL,
    "notes" TEXT,
    "status" TEXT NOT NULL DEFAULT 'scheduled',

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Medication" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "abbreviation" TEXT NOT NULL,

    CONSTRAINT "Medication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PatientMedication" (
    "id" SERIAL NOT NULL,
    "patientId" INTEGER NOT NULL,
    "medicationId" INTEGER NOT NULL,
    "name" TEXT,
    "dose" TEXT,
    "interval" TEXT,
    "startDate" TIMESTAMP(3),

    CONSTRAINT "PatientMedication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Study" (
    "id" SERIAL NOT NULL,
    "patientId" INTEGER NOT NULL,
    "dateEEG" TIMESTAMP(3),
    "dateRMNC" TIMESTAMP(3),
    "dateNSMAP" TIMESTAMP(3),
    "resEEG" TEXT,
    "resRMNC" TEXT,
    "resNSMAP" TEXT,

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

    CONSTRAINT "Crisis_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientMedication" ADD CONSTRAINT "PatientMedication_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientMedication" ADD CONSTRAINT "PatientMedication_medicationId_fkey" FOREIGN KEY ("medicationId") REFERENCES "Medication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Study" ADD CONSTRAINT "Study_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Crisis" ADD CONSTRAINT "Crisis_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

