/*
  Warnings:

  - You are about to drop the column `game_id` on the `owned_pokemon` table. All the data in the column will be lost.
  - You are about to drop the column `method_id` on the `owned_pokemon` table. All the data in the column will be lost.
  - You are about to drop the column `pokemon_form_id` on the `owned_pokemon` table. All the data in the column will be lost.
  - Added the required column `pokemon_game_location_id` to the `owned_pokemon` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `owned_pokemon` DROP FOREIGN KEY `owned_pokemon_game_id_fkey`;

-- DropForeignKey
ALTER TABLE `owned_pokemon` DROP FOREIGN KEY `owned_pokemon_method_id_fkey`;

-- DropForeignKey
ALTER TABLE `owned_pokemon` DROP FOREIGN KEY `owned_pokemon_pokemon_form_id_fkey`;

-- DropIndex
DROP INDEX `hunting_method_id_fkey` ON `owned_pokemon`;

-- DropIndex
DROP INDEX `owned_pokemon_game_id_fkey` ON `owned_pokemon`;

-- DropIndex
DROP INDEX `owned_pokemon_pokemon_form_id_fkey` ON `owned_pokemon`;

-- AlterTable
ALTER TABLE `owned_pokemon` DROP COLUMN `game_id`,
    DROP COLUMN `method_id`,
    DROP COLUMN `pokemon_form_id`,
    ADD COLUMN `pokemon_game_location_id` INTEGER UNSIGNED NOT NULL;

-- AddForeignKey
ALTER TABLE `owned_pokemon` ADD CONSTRAINT `owned_pokemon_pokemon_game_location_id_fkey` FOREIGN KEY (`pokemon_game_location_id`) REFERENCES `pokemon_game_location`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
