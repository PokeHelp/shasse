/*
  Warnings:

  - You are about to drop the `pokemon_rating_game` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `pokemon_rating_game` DROP FOREIGN KEY `pokemon_rating_game_game_id_fkey`;

-- DropForeignKey
ALTER TABLE `pokemon_rating_game` DROP FOREIGN KEY `pokemon_rating_game_location_zone_id_fkey`;

-- DropForeignKey
ALTER TABLE `pokemon_rating_game` DROP FOREIGN KEY `pokemon_rating_game_pokemon_id_fkey`;

-- DropForeignKey
ALTER TABLE `pokemon_rating_game` DROP FOREIGN KEY `pokemon_rating_game_pokemon_obtation_id_fkey`;

-- DropForeignKey
ALTER TABLE `pokemon_rating_game` DROP FOREIGN KEY `pokemon_rating_game_rate_id_fkey`;

-- DropTable
DROP TABLE `pokemon_rating_game`;

-- CreateTable
CREATE TABLE `pokemon_game_location` (
    `game_id` INTEGER UNSIGNED NOT NULL,
    `rate_id` INTEGER UNSIGNED NOT NULL,
    `location_zone_id` INTEGER UNSIGNED NOT NULL,
    `pokemon_obtation_id` INTEGER UNSIGNED NOT NULL,
    `pokemon_id` INTEGER UNSIGNED NOT NULL,

    INDEX `pokemon_rating_game_pokemon_id_fkey`(`pokemon_id`),
    INDEX `pokemon_rating_game_pokemon_obtation_id_fkey`(`pokemon_obtation_id`),
    INDEX `pokemon_rating_game_rate_id_fkey`(`rate_id`),
    INDEX `pokemon_rating_game_location_zone_id_fkey`(`location_zone_id`),
    PRIMARY KEY (`game_id`, `rate_id`, `location_zone_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `pokemon_game_location` ADD CONSTRAINT `pokemon_game_location_game_id_fkey` FOREIGN KEY (`game_id`) REFERENCES `game`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pokemon_game_location` ADD CONSTRAINT `pokemon_game_location_pokemon_id_fkey` FOREIGN KEY (`pokemon_id`) REFERENCES `pokemon`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pokemon_game_location` ADD CONSTRAINT `pokemon_game_location_pokemon_obtation_id_fkey` FOREIGN KEY (`pokemon_obtation_id`) REFERENCES `pokemon_obtation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pokemon_game_location` ADD CONSTRAINT `pokemon_game_location_rate_id_fkey` FOREIGN KEY (`rate_id`) REFERENCES `rate`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pokemon_game_location` ADD CONSTRAINT `pokemon_game_location_location_zone_id_fkey` FOREIGN KEY (`location_zone_id`) REFERENCES `location_zone`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
