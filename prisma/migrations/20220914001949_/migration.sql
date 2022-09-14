/*
  Warnings:

  - A unique constraint covering the columns `[languageId]` on the table `Issue` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[frameworkId]` on the table `Issue` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `frameworkId` to the `Issue` table without a default value. This is not possible if the table is not empty.
  - Added the required column `languageId` to the `Issue` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Issue` ADD COLUMN `frameworkId` INTEGER NOT NULL,
    ADD COLUMN `languageId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Language` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Framework` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Issue_languageId_key` ON `Issue`(`languageId`);

-- CreateIndex
CREATE UNIQUE INDEX `Issue_frameworkId_key` ON `Issue`(`frameworkId`);

-- AddForeignKey
ALTER TABLE `Issue` ADD CONSTRAINT `Issue_languageId_fkey` FOREIGN KEY (`languageId`) REFERENCES `Language`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Issue` ADD CONSTRAINT `Issue_frameworkId_fkey` FOREIGN KEY (`frameworkId`) REFERENCES `Framework`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
