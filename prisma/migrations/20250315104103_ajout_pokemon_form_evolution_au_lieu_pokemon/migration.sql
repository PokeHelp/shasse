-- DropForeignKey
ALTER TABLE `evolution` DROP FOREIGN KEY `evolution_pokemon_end_id_fkey`;

-- DropForeignKey
ALTER TABLE `evolution` DROP FOREIGN KEY `evolution_pokemon_start_id_fkey`;

-- AddForeignKey
ALTER TABLE `evolution` ADD CONSTRAINT `evolution_pokemon_end_id_fkey` FOREIGN KEY (`pokemon_end_id`) REFERENCES `pokemon_form`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `evolution` ADD CONSTRAINT `evolution_pokemon_start_id_fkey` FOREIGN KEY (`pokemon_start_id`) REFERENCES `pokemon_form`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RedefineIndex
CREATE INDEX `evolution_pokemon_form_end_id_fkey` ON `evolution`(`pokemon_end_id`);
DROP INDEX `evolution_pokemon_end_id_fkey` ON `evolution`;

-- RedefineIndex
CREATE INDEX `evolution_pokemon_form_start_id_fkey` ON `evolution`(`pokemon_start_id`);
DROP INDEX `evolution_pokemon_start_id_fkey` ON `evolution`;
