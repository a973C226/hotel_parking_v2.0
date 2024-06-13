/*
  Warnings:

  - Made the column `description` on table `Parking` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Parking" ALTER COLUMN "description" SET NOT NULL;
