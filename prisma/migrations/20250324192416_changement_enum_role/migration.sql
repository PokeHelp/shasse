/*
  Warnings:

  - You are about to alter the column `expires_at` on the `refresh_token` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `role` on the `user` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(1))` to `Enum(EnumId(1))`.

*/
-- AlterTable
ALTER TABLE `refresh_token` MODIFY `expires_at` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `role` ENUM('PUBLIC', 'ADMIN', 'SUPER_ADMIN') NOT NULL DEFAULT 'PUBLIC';
