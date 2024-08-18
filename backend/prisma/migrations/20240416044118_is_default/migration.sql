/*
  Warnings:

  - You are about to drop the column `isDefauld` on the `Addresses` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Addresses" DROP COLUMN "isDefauld",
ADD COLUMN     "isDefault" BOOLEAN DEFAULT false;
