-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ISSUED', 'PENDING', 'SIGNED', 'VERIFIED', 'ARCHIVED');

-- AlterTable
ALTER TABLE "pon" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'ISSUED';
