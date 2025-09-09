-- DropForeignKey
ALTER TABLE `owned_pokemon_detail` DROP FOREIGN KEY `owned_pokemon_detail_pokeball_id_fkey`;

-- AlterTable
ALTER TABLE `owned_pokemon_detail` MODIFY `pokeball_id` INTEGER UNSIGNED NULL;

-- AddForeignKey
ALTER TABLE `owned_pokemon_detail` ADD CONSTRAINT `owned_pokemon_detail_pokeball_id_fkey` FOREIGN KEY (`pokeball_id`) REFERENCES `pokeball`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
