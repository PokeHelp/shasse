/*
  Warnings:

  - You are about to alter the column `expires_at` on the `refresh_token` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - A unique constraint covering the columns `[name]` on the table `role` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `refresh_token` MODIFY `expires_at` TIMESTAMP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `role_name_key` ON `role`(`name`);
