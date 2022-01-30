-- CreateTable
CREATE TABLE "accounts" (
    "_id" SERIAL NOT NULL,
    "balance" INTEGER NOT NULL DEFAULT 0,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_email_key" ON "accounts"("email");
