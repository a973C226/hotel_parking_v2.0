/*
  Warnings:

  - You are about to drop the `FreeQuotas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RefreshToken` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `transportId` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "FreeQuotas" DROP CONSTRAINT "FreeQuotas_parkingId_fkey";

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "transportId" TEXT NOT NULL;

-- DropTable
DROP TABLE "FreeQuotas";

-- DropTable
DROP TABLE "RefreshToken";

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_transportId_fkey" FOREIGN KEY ("transportId") REFERENCES "Transport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
