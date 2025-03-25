/*
  Warnings:

  - You are about to alter the column `expires_at` on the `refresh_token` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to drop the `role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `role_user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `role_user` DROP FOREIGN KEY `role_user_role_id_fkey`;

-- DropForeignKey
ALTER TABLE `role_user` DROP FOREIGN KEY `role_user_user_id_fkey`;

-- AlterTable
ALTER TABLE `refresh_token` MODIFY `expires_at` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `role` ENUM('1', '2', '3') NOT NULL DEFAULT '1';

-- DropTable
DROP TABLE `role`;

-- DropTable
DROP TABLE `role_user`;
