/*
  Warnings:

  - You are about to drop the column `item_description` on the `pon` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "pon" DROP COLUMN "item_description",
ADD COLUMN     "item_descriptions" TEXT[];
