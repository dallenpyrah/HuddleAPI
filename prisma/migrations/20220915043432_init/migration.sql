/*
  Warnings:

  - You are about to drop the column `issueId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `frameworkId` on the `Issue` table. All the data in the column will be lost.
  - You are about to drop the column `languageId` on the `Issue` table. All the data in the column will be lost.
  - You are about to drop the `Framework` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `IssueNotification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Language` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `framework` to the `Issue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `language` to the `Issue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Issue` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Comment` DROP FOREIGN KEY `Comment_issueId_fkey`;

-- DropForeignKey
ALTER TABLE `Issue` DROP FOREIGN KEY `Issue_frameworkId_fkey`;

-- DropForeignKey
ALTER TABLE `Issue` DROP FOREIGN KEY `Issue_languageId_fkey`;

-- DropForeignKey
ALTER TABLE `IssueNotification` DROP FOREIGN KEY `IssueNotification_issueId_fkey`;

-- AlterTable
ALTER TABLE `Comment` DROP COLUMN `issueId`;

-- AlterTable
ALTER TABLE `Issue` DROP COLUMN `frameworkId`,
    DROP COLUMN `languageId`,
    ADD COLUMN `framework` VARCHAR(191) NOT NULL,
    ADD COLUMN `language` VARCHAR(191) NOT NULL,
    ADD COLUMN `status` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `Framework`;

-- DropTable
DROP TABLE `IssueNotification`;

-- DropTable
DROP TABLE `Language`;
