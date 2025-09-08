/*
  Warnings:

  - You are about to drop the column `createAt` on the `Event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Event" DROP COLUMN "createAt",
ADD COLUMN     "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
