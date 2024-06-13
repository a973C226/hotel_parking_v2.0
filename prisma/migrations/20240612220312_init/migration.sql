/*
  Warnings:

  - You are about to alter the column `coord_x` on the `Parking` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `coord_y` on the `Parking` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "Parking" ALTER COLUMN "coord_x" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "coord_y" SET DATA TYPE DOUBLE PRECISION;
