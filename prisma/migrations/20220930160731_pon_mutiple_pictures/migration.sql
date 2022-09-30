/*
  Warnings:

  - You are about to drop the column `picture` on the `pon` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "pon" DROP COLUMN "picture";

-- CreateTable
CREATE TABLE "Picture" (
    "id" TEXT NOT NULL,
    "content" BYTEA NOT NULL,
    "ponId" INTEGER NOT NULL,

    CONSTRAINT "Picture_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Picture" ADD CONSTRAINT "Picture_ponId_fkey" FOREIGN KEY ("ponId") REFERENCES "pon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
