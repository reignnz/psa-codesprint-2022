-- CreateTable
CREATE TABLE "visibility" (
    "ponId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "visibility_pkey" PRIMARY KEY ("ponId","userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "visibility_ponId_key" ON "visibility"("ponId");

-- CreateIndex
CREATE UNIQUE INDEX "visibility_userId_key" ON "visibility"("userId");

-- AddForeignKey
ALTER TABLE "visibility" ADD CONSTRAINT "visibility_ponId_fkey" FOREIGN KEY ("ponId") REFERENCES "pon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visibility" ADD CONSTRAINT "visibility_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
