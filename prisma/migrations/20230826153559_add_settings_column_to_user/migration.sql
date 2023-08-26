/*
  Warnings:

  - You are about to drop the `Settings` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Settings" DROP CONSTRAINT "Settings_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "settings" TEXT NOT NULL DEFAULT '';

-- DropTable
DROP TABLE "Settings";
