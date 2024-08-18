/*
  Warnings:

  - Added the required column `isDefauld` to the `Addresses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Addresses" ADD COLUMN     "isDefauld" BOOLEAN NOT NULL,
ALTER COLUMN "phoneno" SET DATA TYPE TEXT;
