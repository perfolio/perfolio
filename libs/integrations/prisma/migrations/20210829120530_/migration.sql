-- AlterTable
ALTER TABLE "Subscription" ALTER COLUMN "plan" SET DEFAULT E'TRIAL',
ALTER COLUMN "stripeSubscriptionId" DROP NOT NULL;
