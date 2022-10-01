/*
  Warnings:

  - The `item_description` column on the `pon` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "pon" ALTER COLUMN "company_name" DROP NOT NULL,
ALTER COLUMN "vehicle_number" DROP NOT NULL,
ALTER COLUMN "driver_name" DROP NOT NULL,
ALTER COLUMN "driver_pass_number" DROP NOT NULL,
DROP COLUMN "item_description",
ADD COLUMN     "item_description" TEXT[];
