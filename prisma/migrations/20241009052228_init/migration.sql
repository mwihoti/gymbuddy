/*
  Warnings:

  - You are about to drop the column `clientId` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `trainerId` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `trainerId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_clientId_fkey";

-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_trainerId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_trainerId_fkey";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "clientId",
DROP COLUMN "trainerId";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "trainerId";
