-- CreateTable
CREATE TABLE "InternalUserMetadata" (
    "userId" TEXT NOT NULL,
    "logins" TIMESTAMP(3)[],

    PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "plan" "Plan" NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Subscription.userId_unique" ON "Subscription"("userId");

-- AddForeignKey
ALTER TABLE "InternalUserMetadata" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
