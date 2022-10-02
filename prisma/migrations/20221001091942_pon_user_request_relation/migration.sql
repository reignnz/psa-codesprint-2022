/*
  Warnings:

  - You are about to drop the column `requestedById` on the `pon` table. All the data in the column will be lost.
  - You are about to drop the column `ponId` on the `requests` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[requestId]` on the table `pon` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `requestId` to the `pon` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "pon" DROP CONSTRAINT "pon_requestedById_fkey";

-- DropForeignKey
ALTER TABLE "requests" DROP CONSTRAINT "requests_ponId_fkey";

-- DropIndex
DROP INDEX "pon_requestedById_key";

-- DropIndex
DROP INDEX "requests_ponId_key";

-- AlterTable
ALTER TABLE "pon" DROP COLUMN "requestedById",
ADD COLUMN     "requestId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "requests" DROP COLUMN "ponId";

-- CreateIndex
CREATE UNIQUE INDEX "pon_requestId_key" ON "pon"("requestId");

-- AddForeignKey
ALTER TABLE "pon" ADD CONSTRAINT "pon_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "requests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
