/*
  Warnings:

  - The primary key for the `pokemon_game_location` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[game_id,rate_id,location_zone_id,pokemon_id,pokemon_obtation_id]` on the table `pokemon_game_location` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id` to the `pokemon_game_location` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pokemon_game_location` DROP PRIMARY KEY,
    ADD COLUMN `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- CreateIndex
CREATE UNIQUE INDEX `pokemon_game_location_game_id_rate_id_location_zone_id_pokem_key` ON `pokemon_game_location`(`game_id`, `rate_id`, `location_zone_id`, `pokemon_id`, `pokemon_obtation_id`);
