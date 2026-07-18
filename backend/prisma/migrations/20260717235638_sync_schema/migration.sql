/*
  Warnings:

  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Patient` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `abbreviation` to the `Medication` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Appointment" DROP CONSTRAINT "Appointment_patientId_fkey";

-- DropForeignKey
ALTER TABLE "Crisis" DROP CONSTRAINT "Crisis_patientId_fkey";

-- DropForeignKey
ALTER TABLE "Patient" DROP CONSTRAINT "Patient_doctorId_fkey";

-- DropForeignKey
ALTER TABLE "Patient" DROP CONSTRAINT "Patient_userId_fkey";

-- DropForeignKey
ALTER TABLE "PatientMedication" DROP CONSTRAINT "PatientMedication_patientId_fkey";

-- DropForeignKey
ALTER TABLE "Study" DROP CONSTRAINT "Study_patientId_fkey";

-- AlterTable
ALTER TABLE "Medication" ADD COLUMN     "abbreviation" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PatientMedication" ADD COLUMN     "name" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt",
DROP COLUMN "name",
ADD COLUMN     "addictions" BOOLEAN,
ADD COLUMN     "age" INTEGER,
ADD COLUMN     "anxiety" BOOLEAN,
ADD COLUMN     "birthdate" TIMESTAMP(3),
ADD COLUMN     "cogniDisorder" BOOLEAN,
ADD COLUMN     "doctorId" INTEGER,
ADD COLUMN     "epilepsyType" TEXT,
ADD COLUMN     "firstCrisisDate" TIMESTAMP(3),
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "firstTime" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "height" TEXT,
ADD COLUMN     "hypertension" BOOLEAN,
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "migraine" BOOLEAN,
ADD COLUMN     "respiDisorder" BOOLEAN,
ADD COLUMN     "weight" TEXT;

-- DropTable
DROP TABLE "Patient";

-- AddForeignKey
ALTER TABLE "PatientMedication" ADD CONSTRAINT "PatientMedication_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PatientMedication" ADD CONSTRAINT "PatientMedication_medicationId_fkey" FOREIGN KEY ("medicationId") REFERENCES "Medication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Study" ADD CONSTRAINT "Study_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Crisis" ADD CONSTRAINT "Crisis_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
