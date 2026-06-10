/*
  Warnings:

  - You are about to drop the column `startDate` on the `PatientMedication` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PatientMedication" DROP COLUMN "startDate",
ADD COLUMN     "presentation" TEXT;

-- AlterTable
ALTER TABLE "Study" ALTER COLUMN "dateEEG" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "dateNSMAP" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "dateRMNC" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "resEEG" SET DEFAULT 'No Realizado',
ALTER COLUMN "resNSMAP" SET DEFAULT 'No Realizado',
ALTER COLUMN "resRMNC" SET DEFAULT 'No Realizado';