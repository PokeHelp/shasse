/*
  Warnings:

  - The primary key for the `pokemon_form` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `gender_id` on the `pokemon_form` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[pokemon_id,form_id]` on the table `pokemon_form` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id` to the `pokemon_form` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `pokemon_form` DROP FOREIGN KEY `pokemon_form_gender_id_fkey`;

-- DropIndex
DROP INDEX `pokemon_form_gender_id_fkey` ON `pokemon_form`;

-- AlterTable
ALTER TABLE `pokemon_form` DROP PRIMARY KEY,
    DROP COLUMN `gender_id`,
    ADD COLUMN `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    ADD COLUMN `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    ADD COLUMN `status` VARCHAR(45) NOT NULL DEFAULT 'on',
    ADD COLUMN `updated_at` DATETIME(0) NULL,
    ADD PRIMARY KEY (`id`);

-- CreateTable
CREATE TABLE `pokemon_form_gender` (
    `pokemon_form_id` INTEGER UNSIGNED NOT NULL,
    `gender_id` INTEGER UNSIGNED NOT NULL,

    PRIMARY KEY (`gender_id`, `pokemon_form_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `pokemon_form_pokemon_id_form_id_key` ON `pokemon_form`(`pokemon_id`, `form_id`);

-- AddForeignKey
ALTER TABLE `pokemon_form_gender` ADD CONSTRAINT `pokemon_form_gender_gender_id_fkey` FOREIGN KEY (`gender_id`) REFERENCES `gender`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pokemon_form_gender` ADD CONSTRAINT `pokemon_form_gender_pokemon_form_id_fkey` FOREIGN KEY (`pokemon_form_id`) REFERENCES `pokemon_form`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
