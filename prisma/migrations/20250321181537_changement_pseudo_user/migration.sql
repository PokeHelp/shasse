/*
  Warnings:

  - You are about to alter the column `expires_at` on the `refresh_token` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to drop the column `last_connexion` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[iso_code]` on the table `langue` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[pseudonym]` on the table `user` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `pseudonym` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `refresh_token` MODIFY `expires_at` TIMESTAMP NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `last_connexion`,
    DROP COLUMN `username`,
    ADD COLUMN `pseudonym` VARCHAR(100) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `langue_iso_code_key` ON `langue`(`iso_code`);

-- CreateIndex
CREATE UNIQUE INDEX `user_pseudonym_key` ON `user`(`pseudonym`);
