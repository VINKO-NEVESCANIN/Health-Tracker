/*
  Warnings:

  - You are about to drop the column `date` on the `Crisis` table. All the data in the column will be lost.
  - You are about to drop the column `durationMin` on the `Crisis` table. All the data in the column will be lost.
  - You are about to drop the column `intensity` on the `Crisis` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `Crisis` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Medication` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Medication` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `diseases` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `totalCrisis` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `PatientMedication` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Study` table. All the data in the column will be lost.
  - You are about to drop the column `fileUrl` on the `Study` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `Study` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Study` table. All the data in the column will be lost.
  - You are about to drop the `Vital` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `time` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `crisisDate` to the `Crisis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Medication` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PatientMedication" DROP CONSTRAINT "PatientMedication_medicationId_fkey";

-- DropForeignKey
ALTER TABLE "Vital" DROP CONSTRAINT "Vital_patientId_fkey";

-- DropIndex
DROP INDEX "Patient_email_key";

-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "time" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Crisis" DROP COLUMN "date",
DROP COLUMN "durationMin",
DROP COLUMN "intensity",
DROP COLUMN "notes",
ADD COLUMN     "crisisDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "duration" INTEGER,
ADD COLUMN     "recuperation" INTEGER,
ADD COLUMN     "unconscius" BOOLEAN;

-- AlterTable
ALTER TABLE "Medication" DROP COLUMN "createdAt",
DROP COLUMN "description",
ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "address",
DROP COLUMN "createdAt",
DROP COLUMN "diseases",
DROP COLUMN "email",
DROP COLUMN "phone",
DROP COLUMN "totalCrisis",
ADD COLUMN     "addictions" BOOLEAN,
ADD COLUMN     "anxiety" BOOLEAN,
ADD COLUMN     "birthdate" TIMESTAMP(3),
ADD COLUMN     "cogniDisorder" BOOLEAN,
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "height" TEXT,
ADD COLUMN     "hypertension" BOOLEAN,
ADD COLUMN     "migraine" BOOLEAN,
ADD COLUMN     "respiDisorder" BOOLEAN,
ADD COLUMN     "weight" TEXT;

-- AlterTable
ALTER TABLE "PatientMedication" DROP COLUMN "endDate";

-- AlterTable
ALTER TABLE "Study" DROP COLUMN "date",
DROP COLUMN "fileUrl",
DROP COLUMN "notes",
DROP COLUMN "type",
ADD COLUMN     "dateEEG" TIMESTAMP(3),
ADD COLUMN     "dateNSMAP" TIMESTAMP(3),
ADD COLUMN     "dateRMNC" TIMESTAMP(3),
ADD COLUMN     "resEEG" TEXT,
ADD COLUMN     "resNSMAP" TEXT,
ADD COLUMN     "resRMNC" TEXT;

-- DropTable
DROP TABLE "Vital";
