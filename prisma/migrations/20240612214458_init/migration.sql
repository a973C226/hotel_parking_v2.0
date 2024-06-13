/*
  Warnings:

  - You are about to drop the column `coordinates` on the `Parking` table. All the data in the column will be lost.
  - Made the column `coord_x` on table `Parking` required. This step will fail if there are existing NULL values in that column.
  - Made the column `coord_y` on table `Parking` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Parking" DROP COLUMN "coordinates",
ALTER COLUMN "coord_x" SET NOT NULL,
ALTER COLUMN "coord_y" SET NOT NULL;
