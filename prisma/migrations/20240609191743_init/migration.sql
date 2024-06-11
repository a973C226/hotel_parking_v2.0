/*
  Warnings:

  - Made the column `coordinates` on table `Parking` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Parking" ALTER COLUMN "coordinates" SET NOT NULL;
