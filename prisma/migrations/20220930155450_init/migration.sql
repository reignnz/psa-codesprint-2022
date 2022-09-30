-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "staff" (
    "userId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "designated_officers" (
    "userId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "aetos" (
    "userId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "pon" (
    "id" SERIAL NOT NULL,
    "requestorId" INTEGER NOT NULL,
    "issuerId" INTEGER NOT NULL,
    "company_name" TEXT NOT NULL,
    "vehicle_number" TEXT NOT NULL,
    "driver_name" TEXT NOT NULL,
    "driver_pass_number" TEXT NOT NULL,
    "item_description" TEXT NOT NULL,
    "picture" BYTEA NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "pon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "signatures" (
    "ponId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "verifications" (
    "ponId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "staff_userId_key" ON "staff"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "designated_officers_userId_key" ON "designated_officers"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "aetos_userId_key" ON "aetos"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "pon_requestorId_key" ON "pon"("requestorId");

-- CreateIndex
CREATE UNIQUE INDEX "pon_issuerId_key" ON "pon"("issuerId");

-- CreateIndex
CREATE UNIQUE INDEX "signatures_ponId_key" ON "signatures"("ponId");

-- CreateIndex
CREATE UNIQUE INDEX "signatures_userId_key" ON "signatures"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "verifications_ponId_key" ON "verifications"("ponId");

-- CreateIndex
CREATE UNIQUE INDEX "verifications_userId_key" ON "verifications"("userId");

-- AddForeignKey
ALTER TABLE "staff" ADD CONSTRAINT "staff_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "designated_officers" ADD CONSTRAINT "designated_officers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aetos" ADD CONSTRAINT "aetos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pon" ADD CONSTRAINT "pon_requestorId_fkey" FOREIGN KEY ("requestorId") REFERENCES "staff"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pon" ADD CONSTRAINT "pon_issuerId_fkey" FOREIGN KEY ("issuerId") REFERENCES "designated_officers"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "signatures" ADD CONSTRAINT "signatures_ponId_fkey" FOREIGN KEY ("ponId") REFERENCES "pon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "signatures" ADD CONSTRAINT "signatures_userId_fkey" FOREIGN KEY ("userId") REFERENCES "staff"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "verifications" ADD CONSTRAINT "verifications_ponId_fkey" FOREIGN KEY ("ponId") REFERENCES "pon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "verifications" ADD CONSTRAINT "verifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "aetos"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
