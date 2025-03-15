-- DropForeignKey
ALTER TABLE `pokemon_game_location` DROP FOREIGN KEY `pokemon_game_location_pokemon_id_fkey`;

-- AddForeignKey
ALTER TABLE `pokemon_game_location` ADD CONSTRAINT `pokemon_game_location_pokemon_id_fkey` FOREIGN KEY (`pokemon_id`) REFERENCES `pokemon_form`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RedefineIndex
CREATE INDEX `pokemon_rating_game_pokemon_form_id_fkey` ON `pokemon_game_location`(`pokemon_id`);
DROP INDEX `pokemon_rating_game_pokemon_id_fkey` ON `pokemon_game_location`;
