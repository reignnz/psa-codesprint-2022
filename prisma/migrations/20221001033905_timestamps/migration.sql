/*
  Warnings:

  - You are about to drop the `Picture` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `last_updated_at` to the `pon` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Picture" DROP CONSTRAINT "Picture_ponId_fkey";

-- AlterTable
ALTER TABLE "pon" ADD COLUMN     "issued_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "last_updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "signatures" ADD COLUMN     "signed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "verifications" ADD COLUMN     "verified_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "Picture";

-- CreateTable
CREATE TABLE "requests" (
    "id" SERIAL NOT NULL,
    "ponId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "submitted_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pictures" (
    "id" TEXT NOT NULL,
    "content" BYTEA NOT NULL,
    "ponId" INTEGER NOT NULL,
    "uploaded_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pictures_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "requests_ponId_key" ON "requests"("ponId");

-- CreateIndex
CREATE UNIQUE INDEX "requests_userId_key" ON "requests"("userId");

-- AddForeignKey
ALTER TABLE "requests" ADD CONSTRAINT "requests_ponId_fkey" FOREIGN KEY ("ponId") REFERENCES "pon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requests" ADD CONSTRAINT "requests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pictures" ADD CONSTRAINT "pictures_ponId_fkey" FOREIGN KEY ("ponId") REFERENCES "pon"("id") ON DELETE CASCADE ON UPDATE CASCADE;
