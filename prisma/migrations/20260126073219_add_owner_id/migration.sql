/*
  Warnings:

  - Added the required column `ownerId` to the `Business` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerId` to the `Shop` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Business" ADD COLUMN     "ownerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Shop" ADD COLUMN     "ownerId" TEXT NOT NULL;
