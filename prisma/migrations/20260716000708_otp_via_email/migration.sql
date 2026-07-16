/*
  Warnings:

  - You are about to drop the column `phoneVerified` on the `Lead` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `OtpCode` table. All the data in the column will be lost.
  - Added the required column `email` to the `OtpCode` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Lead" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL DEFAULT 'India',
    "age" INTEGER,
    "gender" TEXT,
    "occupation" TEXT NOT NULL,
    "company" TEXT,
    "designation" TEXT,
    "linkedin" TEXT,
    "annualIncome" TEXT,
    "netWorth" TEXT,
    "budget" TEXT NOT NULL,
    "timeline" TEXT NOT NULL,
    "currentInvestments" TEXT NOT NULL DEFAULT '',
    "purpose" TEXT NOT NULL,
    "propertyType" TEXT NOT NULL,
    "goaLocation" TEXT NOT NULL,
    "hearAbout" TEXT NOT NULL,
    "expectedValue" TEXT,
    "paymentPreference" TEXT,
    "wouldLike" TEXT NOT NULL DEFAULT '',
    "score" INTEGER NOT NULL DEFAULT 0,
    "band" TEXT NOT NULL DEFAULT 'COLD',
    "utmSource" TEXT,
    "utmMedium" TEXT,
    "utmCampaign" TEXT,
    "referrer" TEXT,
    "status" TEXT NOT NULL DEFAULT 'NEW',
    "assignedTo" TEXT
);
INSERT INTO "new_Lead" ("age", "annualIncome", "assignedTo", "band", "budget", "city", "company", "country", "createdAt", "currentInvestments", "designation", "email", "expectedValue", "fullName", "gender", "goaLocation", "hearAbout", "id", "linkedin", "netWorth", "occupation", "paymentPreference", "phone", "propertyType", "purpose", "referrer", "score", "state", "status", "timeline", "updatedAt", "utmCampaign", "utmMedium", "utmSource", "wouldLike") SELECT "age", "annualIncome", "assignedTo", "band", "budget", "city", "company", "country", "createdAt", "currentInvestments", "designation", "email", "expectedValue", "fullName", "gender", "goaLocation", "hearAbout", "id", "linkedin", "netWorth", "occupation", "paymentPreference", "phone", "propertyType", "purpose", "referrer", "score", "state", "status", "timeline", "updatedAt", "utmCampaign", "utmMedium", "utmSource", "wouldLike" FROM "Lead";
DROP TABLE "Lead";
ALTER TABLE "new_Lead" RENAME TO "Lead";
CREATE UNIQUE INDEX "Lead_phone_key" ON "Lead"("phone");
CREATE TABLE "new_OtpCode" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "codeHash" TEXT NOT NULL,
    "expiresAt" DATETIME NOT NULL,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_OtpCode" ("attempts", "codeHash", "createdAt", "expiresAt", "id", "verified") SELECT "attempts", "codeHash", "createdAt", "expiresAt", "id", "verified" FROM "OtpCode";
DROP TABLE "OtpCode";
ALTER TABLE "new_OtpCode" RENAME TO "OtpCode";
CREATE INDEX "OtpCode_email_idx" ON "OtpCode"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
