-- DropForeignKey
ALTER TABLE "Picture" DROP CONSTRAINT "Picture_ponId_fkey";

-- DropForeignKey
ALTER TABLE "aetos" DROP CONSTRAINT "aetos_userId_fkey";

-- DropForeignKey
ALTER TABLE "designated_officers" DROP CONSTRAINT "designated_officers_userId_fkey";

-- DropForeignKey
ALTER TABLE "pon" DROP CONSTRAINT "pon_issuerId_fkey";

-- DropForeignKey
ALTER TABLE "pon" DROP CONSTRAINT "pon_requestorId_fkey";

-- DropForeignKey
ALTER TABLE "signatures" DROP CONSTRAINT "signatures_ponId_fkey";

-- DropForeignKey
ALTER TABLE "signatures" DROP CONSTRAINT "signatures_userId_fkey";

-- DropForeignKey
ALTER TABLE "staff" DROP CONSTRAINT "staff_userId_fkey";

-- DropForeignKey
ALTER TABLE "verifications" DROP CONSTRAINT "verifications_ponId_fkey";

-- DropForeignKey
ALTER TABLE "verifications" DROP CONSTRAINT "verifications_userId_fkey";

-- AddForeignKey
ALTER TABLE "staff" ADD CONSTRAINT "staff_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "designated_officers" ADD CONSTRAINT "designated_officers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aetos" ADD CONSTRAINT "aetos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pon" ADD CONSTRAINT "pon_requestorId_fkey" FOREIGN KEY ("requestorId") REFERENCES "staff"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pon" ADD CONSTRAINT "pon_issuerId_fkey" FOREIGN KEY ("issuerId") REFERENCES "designated_officers"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Picture" ADD CONSTRAINT "Picture_ponId_fkey" FOREIGN KEY ("ponId") REFERENCES "pon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "signatures" ADD CONSTRAINT "signatures_ponId_fkey" FOREIGN KEY ("ponId") REFERENCES "pon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "signatures" ADD CONSTRAINT "signatures_userId_fkey" FOREIGN KEY ("userId") REFERENCES "staff"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "verifications" ADD CONSTRAINT "verifications_ponId_fkey" FOREIGN KEY ("ponId") REFERENCES "pon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "verifications" ADD CONSTRAINT "verifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "aetos"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
