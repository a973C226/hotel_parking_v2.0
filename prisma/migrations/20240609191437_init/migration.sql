/*
  Warnings:

  - Made the column `parkingName` on table `Parking` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Parking" ALTER COLUMN "parkingName" SET NOT NULL;
