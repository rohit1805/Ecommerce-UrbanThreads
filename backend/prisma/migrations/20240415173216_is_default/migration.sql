-- AlterTable
ALTER TABLE "Addresses" ALTER COLUMN "isDefauld" DROP NOT NULL,
ALTER COLUMN "isDefauld" SET DEFAULT false;
