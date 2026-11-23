/*
  Warnings:

  - You are about to drop the column `fecha` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `notas` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `fecha` on the `Crisis` table. All the data in the column will be lost.
  - You are about to drop the column `notas` on the `Crisis` table. All the data in the column will be lost.
  - You are about to drop the column `descripcion` on the `Medication` table. All the data in the column will be lost.
  - You are about to drop the column `nombre` on the `Medication` table. All the data in the column will be lost.
  - You are about to drop the column `apellido` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `direccion` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `edad` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `nombre` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `telefono` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `dosis` on the `PatientMedication` table. All the data in the column will be lost.
  - You are about to drop the column `intervalo` on the `PatientMedication` table. All the data in the column will be lost.
  - You are about to drop the column `fecha` on the `Study` table. All the data in the column will be lost.
  - You are about to drop the column `notas` on the `Study` table. All the data in the column will be lost.
  - You are about to drop the column `tipo` on the `Study` table. All the data in the column will be lost.
  - You are about to drop the column `fecha` on the `Vital` table. All the data in the column will be lost.
  - You are about to drop the column `temp` on the `Vital` table. All the data in the column will be lost.
  - Added the required column `date` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Medication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Study` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "fecha",
DROP COLUMN "notas",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'scheduled';

-- AlterTable
ALTER TABLE "Crisis" DROP COLUMN "fecha",
DROP COLUMN "notas",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "durationMin" INTEGER,
ADD COLUMN     "intensity" INTEGER,
ADD COLUMN     "notes" TEXT;

-- AlterTable
ALTER TABLE "Medication" DROP COLUMN "descripcion",
DROP COLUMN "nombre",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "apellido",
DROP COLUMN "direccion",
DROP COLUMN "edad",
DROP COLUMN "nombre",
DROP COLUMN "telefono",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "age" INTEGER,
ADD COLUMN     "diseases" TEXT,
ADD COLUMN     "epilepsyType" TEXT,
ADD COLUMN     "firstCrisisDate" TIMESTAMP(3),
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "totalCrisis" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "PatientMedication" DROP COLUMN "dosis",
DROP COLUMN "intervalo",
ADD COLUMN     "dose" TEXT,
ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "interval" TEXT,
ADD COLUMN     "startDate" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Study" DROP COLUMN "fecha",
DROP COLUMN "notas",
DROP COLUMN "tipo",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fileUrl" TEXT,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Vital" DROP COLUMN "fecha",
DROP COLUMN "temp",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "temperature" DOUBLE PRECISION;
