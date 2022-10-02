/*
  Warnings:

  - You are about to drop the column `issuerId` on the `pon` table. All the data in the column will be lost.
  - You are about to drop the column `requestorId` on the `pon` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `requests` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `signatures` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `verifications` table. All the data in the column will be lost.
  - You are about to drop the `admins` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `aetos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `designated_officers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `staff` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[requestedById]` on the table `pon` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[issuedById]` on the table `pon` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[requestedById]` on the table `requests` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[signedById]` on the table `signatures` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[verifiedById]` on the table `verifications` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `issuedById` to the `pon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requestedById` to the `pon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requestedById` to the `requests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `signedById` to the `signatures` table without a default value. This is not possible if the table is not empty.
  - Added the required column `verifiedById` to the `verifications` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('STAFF', 'DESIGNATED_OFFICER', 'AETOS');

-- DropForeignKey
ALTER TABLE "admins" DROP CONSTRAINT "admins_userId_fkey";

-- DropForeignKey
ALTER TABLE "aetos" DROP CONSTRAINT "aetos_userId_fkey";

-- DropForeignKey
ALTER TABLE "designated_officers" DROP CONSTRAINT "designated_officers_userId_fkey";

-- DropForeignKey
ALTER TABLE "pon" DROP CONSTRAINT "pon_issuerId_fkey";

-- DropForeignKey
ALTER TABLE "pon" DROP CONSTRAINT "pon_requestorId_fkey";

-- DropForeignKey
ALTER TABLE "requests" DROP CONSTRAINT "requests_userId_fkey";

-- DropForeignKey
ALTER TABLE "signatures" DROP CONSTRAINT "signatures_userId_fkey";

-- DropForeignKey
ALTER TABLE "staff" DROP CONSTRAINT "staff_userId_fkey";

-- DropForeignKey
ALTER TABLE "verifications" DROP CONSTRAINT "verifications_userId_fkey";

-- DropIndex
DROP INDEX "pon_issuerId_key";

-- DropIndex
DROP INDEX "pon_requestorId_key";

-- DropIndex
DROP INDEX "requests_userId_key";

-- DropIndex
DROP INDEX "signatures_userId_key";

-- DropIndex
DROP INDEX "verifications_userId_key";

-- AlterTable
ALTER TABLE "pon" DROP COLUMN "issuerId",
DROP COLUMN "requestorId",
ADD COLUMN     "issuedById" INTEGER NOT NULL,
ADD COLUMN     "requestedById" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "requests" DROP COLUMN "userId",
ADD COLUMN     "requestedById" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "signatures" DROP COLUMN "userId",
ADD COLUMN     "signedById" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "isAdmin" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "verifications" DROP COLUMN "userId",
ADD COLUMN     "verifiedById" INTEGER NOT NULL;

-- DropTable
DROP TABLE "admins";

-- DropTable
DROP TABLE "aetos";

-- DropTable
DROP TABLE "designated_officers";

-- DropTable
DROP TABLE "staff";

-- CreateIndex
CREATE UNIQUE INDEX "pon_requestedById_key" ON "pon"("requestedById");

-- CreateIndex
CREATE UNIQUE INDEX "pon_issuedById_key" ON "pon"("issuedById");

-- CreateIndex
CREATE UNIQUE INDEX "requests_requestedById_key" ON "requests"("requestedById");

-- CreateIndex
CREATE UNIQUE INDEX "signatures_signedById_key" ON "signatures"("signedById");

-- CreateIndex
CREATE UNIQUE INDEX "verifications_verifiedById_key" ON "verifications"("verifiedById");

-- AddForeignKey
ALTER TABLE "requests" ADD CONSTRAINT "requests_requestedById_fkey" FOREIGN KEY ("requestedById") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pon" ADD CONSTRAINT "pon_requestedById_fkey" FOREIGN KEY ("requestedById") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pon" ADD CONSTRAINT "pon_issuedById_fkey" FOREIGN KEY ("issuedById") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "signatures" ADD CONSTRAINT "signatures_signedById_fkey" FOREIGN KEY ("signedById") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "verifications" ADD CONSTRAINT "verifications_verifiedById_fkey" FOREIGN KEY ("verifiedById") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
