/*
  Warnings:

  - You are about to drop the column `orderId` on the `Addresses` table. All the data in the column will be lost.
  - Added the required column `addressId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Addresses" DROP CONSTRAINT "Addresses_orderId_fkey";

-- DropIndex
DROP INDEX "Addresses_orderId_key";

-- AlterTable
ALTER TABLE "Addresses" DROP COLUMN "orderId";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "addressId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES "Addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
