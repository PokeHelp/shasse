/*
  Warnings:

  - You are about to drop the column `langue_id` on the `user` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `user_langue_id_fkey`;

-- DropIndex
DROP INDEX `user_langue_id_fkey` ON `user`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `langue_id`;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
