-- CreateTable
CREATE TABLE `langue` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `iso_code` CHAR(2) NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL,
    `status` VARCHAR(45) NOT NULL DEFAULT 'on',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `translate` (
    `langue_id` INTEGER UNSIGNED NOT NULL,
    `reference_id` BIGINT UNSIGNED NOT NULL,
    `reference_table` ENUM('TYPE', 'POKEMON_CATEGORY', 'GAME', 'POKEMON', 'CAPACITY', 'CATEGORY_CAPACITY', 'INFLUENCE', 'SKILL_OBTENTION_TYPE', 'CAPSULE', 'EFFECT_WITHOUT_FIGHT', 'CAPACITY_EFFECT', 'TARGET', 'POKEMON_OBTENTION', 'METEO', 'SHASSE_METHOD', 'DETAIL_RATE', 'POKEBALL', 'EGG_GROUP', 'EVOLUTION_METHOD', 'ZONE', 'LOCATION', 'LAND', 'EVOLUTION_INFO', 'ABILITY_INFO_NAME', 'ABILITY_INFO_DESCRIPTION', 'ABILITY_INFO_EFFECT') NOT NULL,
    `name` TEXT NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL,
    `status` VARCHAR(45) NOT NULL DEFAULT 'on',

    PRIMARY KEY (`reference_table`, `reference_id`, `langue_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `discord_id` BIGINT UNSIGNED NULL,
    `email` VARCHAR(255) NOT NULL,
    `username` VARCHAR(100) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `last_connexion` DATETIME(0) NOT NULL,
    `langue_id` INTEGER UNSIGNED NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL,
    `status` VARCHAR(45) NOT NULL DEFAULT 'on',

    UNIQUE INDEX `user_email_key`(`email`),
    INDEX `user_langue_id_fkey`(`langue_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,
    `level_access` INTEGER NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL,
    `status` VARCHAR(45) NOT NULL DEFAULT 'on',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role_user` (
    `role_id` INTEGER UNSIGNED NOT NULL,
    `user_id` INTEGER UNSIGNED NOT NULL,

    INDEX `role_user_user_id_fkey`(`user_id`),
    PRIMARY KEY (`role_id`, `user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `shasse_method` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL,
    `status` VARCHAR(45) NOT NULL DEFAULT 'on',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `shasse` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `method_id` INTEGER UNSIGNED NOT NULL,
    `meeting_number` INTEGER UNSIGNED NOT NULL,
    `time` TIME(0) NOT NULL,
    `is_finish` BOOLEAN NOT NULL,
    `use_charm_chroma` BOOLEAN NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL,
    `status` VARCHAR(45) NOT NULL DEFAULT 'on',

    INDEX `shasse_method_id_fkey`(`method_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pokeball` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `picture` VARCHAR(45) NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL,
    `status` VARCHAR(45) NOT NULL DEFAULT 'on',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `generation` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `number` INTEGER NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL,
    `status` VARCHAR(45) NOT NULL DEFAULT 'on',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `game` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `generation_id` INTEGER UNSIGNED NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL,
    `status` VARCHAR(45) NOT NULL DEFAULT 'on',

    INDEX `game_generation_id_fkey`(`generation_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pokemon_category` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL,
    `status` VARCHAR(45) NOT NULL DEFAULT 'on',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pokemon` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `internationnal_number` INTEGER NOT NULL,
    `hatching_cycle` INTEGER NOT NULL,
    `global_xp` INTEGER NOT NULL,
    `capture_rate` INTEGER NOT NULL,
    `call_help_rate` INTEGER NOT NULL,
    `size` DECIMAL(5, 2) NOT NULL,
    `weight` DECIMAL(5, 2) NOT NULL,
    `male_rate` DECIMAL(5, 2) NOT NULL,
    `femelle_rate` DECIMAL(5, 2) NOT NULL,
    `category_id` INTEGER UNSIGNED NOT NULL,
    `generation_id` INTEGER UNSIGNED NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL,
    `status` VARCHAR(45) NOT NULL DEFAULT 'on',

    INDEX `pokemon_category_id_fkey`(`category_id`),
    INDEX `pokemon_generation_id_fkey`(`generation_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `owned_pokemon` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `shasse_id` BIGINT UNSIGNED NOT NULL,
    `user_id` INTEGER UNSIGNED NOT NULL,
    `pokemon_id` INTEGER UNSIGNED NOT NULL,
    `game_id` INTEGER UNSIGNED NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL,
    `status` VARCHAR(45) NOT NULL DEFAULT 'on',

    INDEX `owned_pokemon_game_id_fkey`(`game_id`),
    INDEX `owned_pokemon_pokemon_id_fkey`(`pokemon_id`),
    INDEX `owned_pokemon_shasse_id_fkey`(`shasse_id`),
    INDEX `owned_pokemon_user_id_fkey`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `owned_pokemon_detail` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `nickname` VARCHAR(45) NOT NULL,
    `is_shiny` BOOLEAN NOT NULL,
    `pokeball_id` INTEGER UNSIGNED NOT NULL,
    `owned_pokemon` BIGINT UNSIGNED NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL,
    `status` VARCHAR(45) NOT NULL DEFAULT 'on',

    INDEX `owned_pokemon_detail_owned_pokemon_fkey`(`owned_pokemon`),
    INDEX `owned_pokemon_detail_pokeball_id_fkey`(`pokeball_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ability` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `generation_id` INTEGER UNSIGNED NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL,
    `status` VARCHAR(45) NOT NULL DEFAULT 'on',

    INDEX `ability_generation_id_fkey`(`generation_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ability_info` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `generation_id` INTEGER UNSIGNED NOT NULL,
    `ability_id` INTEGER UNSIGNED NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL,
    `status` VARCHAR(45) NOT NULL DEFAULT 'on',

    INDEX `ability_info_ability_id_fkey`(`ability_id`),
    INDEX `ability_info_generation_id_fkey`(`generation_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pokemon_info` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `xp_gift` INTEGER NOT NULL,
    `generation_id` INTEGER UNSIGNED NOT NULL,
    `pokemon_id` INTEGER UNSIGNED NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL,
    `status` VARCHAR(45) NOT NULL DEFAULT 'on',

    INDEX `pokemon_info_generation_id_fkey`(`generation_id`),
    INDEX `pokemon_info_pokemon_id_fkey`(`pokemon_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ability_order` (
    `pokemon_info_id` INTEGER UNSIGNED NOT NULL,
    `ability_id` INTEGER UNSIGNED NOT NULL,
    `order` TINYINT UNSIGNED NOT NULL,
    `is_hidden` BOOLEAN NOT NULL,

    INDEX `ability_order_pokemon_info_id_fkey`(`pokemon_info_id`),
    PRIMARY KEY (`ability_id`, `pokemon_info_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `evolution_method` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL,
    `status` VARCHAR(45) NOT NULL DEFAULT 'on',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `evolution` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `level` INTEGER NULL,
    `evolution_method` INTEGER UNSIGNED NOT NULL,
    `pokemon_start_id` INTEGER UNSIGNED NOT NULL,
    `pokemon_end_id` INTEGER UNSIGNED NOT NULL,
    `evolution_info_id` INTEGER UNSIGNED NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL,
    `status` VARCHAR(45) NOT NULL DEFAULT 'on',

    INDEX `evolution_evolution_info_id_fkey`(`evolution_info_id`),
    INDEX `evolution_evolution_method_fkey`(`evolution_method`),
    INDEX `evolution_pokemon_end_id_fkey`(`pokemon_end_id`),
    INDEX `evolution_pokemon_start_id_fkey`(`pokemon_start_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `evolution_info` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL,
    `status` VARCHAR(45) NOT NULL DEFAULT 'on',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `egg_group` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL,
    `status` VARCHAR(45) NOT NULL DEFAULT 'on',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `egg_group_order` (
    `pokemon_info_id` INTEGER UNSIGNED NOT NULL,
    `egg_group_id` INTEGER UNSIGNED NOT NULL,
    `order` INTEGER NOT NULL,

    INDEX `egg_group_order_pokemon_info_id_fkey`(`pokemon_info_id`),
    PRIMARY KEY (`egg_group_id`, `pokemon_info_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `type` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `color` CHAR(7) NOT NULL,
    `icon_name` VARCHAR(45) NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL,
    `status` VARCHAR(45) NOT NULL DEFAULT 'on',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `type_order` (
    `type_id` INTEGER UNSIGNED NOT NULL,
    `pokemon_info_id` INTEGER UNSIGNED NOT NULL,
    `order` INTEGER NOT NULL,

    INDEX `type_order_pokemon_info_id_fkey`(`pokemon_info_id`),
    PRIMARY KEY (`type_id`, `pokemon_info_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `nationnal_number` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `number` INTEGER NOT NULL,
    `land_id` INTEGER UNSIGNED NOT NULL,
    `game_id` INTEGER UNSIGNED NOT NULL,
    `pokemon_id` INTEGER UNSIGNED NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL,
    `status` VARCHAR(45) NOT NULL DEFAULT 'on',

    INDEX `nationnal_number_game_id_fkey`(`game_id`),
    INDEX `nationnal_number_land_id_fkey`(`land_id`),
    INDEX `nationnal_number_pokemon_id_fkey`(`pokemon_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `land` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL,
    `status` VARCHAR(45) NOT NULL DEFAULT 'on',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `capacity` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL,
    `status` VARCHAR(45) NOT NULL DEFAULT 'on',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `capacity_effect` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `z_effect` BOOLEAN NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL,
    `status` VARCHAR(45) NOT NULL DEFAULT 'on',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `capacity_category` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL,
    `status` VARCHAR(45) NOT NULL DEFAULT 'on',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `capsule` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL,
    `status` VARCHAR(45) NOT NULL DEFAULT 'on',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `detail` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL,
    `status` VARCHAR(45) NOT NULL DEFAULT 'on',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `effect_without_fight` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL,
    `status` VARCHAR(45) NOT NULL DEFAULT 'on',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `influence` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL,
    `status` VARCHAR(45) NOT NULL DEFAULT 'on',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `location` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL,
    `status` VARCHAR(45) NOT NULL DEFAULT 'on',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `zone` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL,
    `status` VARCHAR(45) NOT NULL DEFAULT 'on',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `location_zone` (
    `location_id` INTEGER UNSIGNED NOT NULL,
    `zone_id` INTEGER UNSIGNED NOT NULL,

    INDEX `location_zone_location_id_fkey`(`location_id`),
    PRIMARY KEY (`zone_id`, `location_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `meteo` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL,
    `status` VARCHAR(45) NOT NULL DEFAULT 'on',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pokemon_obtation` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL,
    `status` VARCHAR(45) NOT NULL DEFAULT 'on',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rate` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `rate` DECIMAL(5, 2) NOT NULL,
    `min_level` SMALLINT UNSIGNED NOT NULL,
    `max_level` SMALLINT UNSIGNED NOT NULL,
    `limit` SMALLINT UNSIGNED NULL,
    `meteo_id` INTEGER UNSIGNED NOT NULL,
    `detail_rate_id` INTEGER UNSIGNED NOT NULL,
    `condition_rate_id` INTEGER UNSIGNED NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL,
    `status` VARCHAR(45) NOT NULL DEFAULT 'on',

    INDEX `rate_condition_rate_id_fkey`(`condition_rate_id`),
    INDEX `rate_detail_rate_id_fkey`(`detail_rate_id`),
    INDEX `rate_meteo_id_fkey`(`meteo_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `shasse_method_game` (
    `shasse_method_id` INTEGER UNSIGNED NOT NULL,
    `game_id` INTEGER UNSIGNED NOT NULL,

    INDEX `shasse_method_game_shasse_method_id_fkey`(`shasse_method_id`),
    PRIMARY KEY (`game_id`, `shasse_method_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `shasse_method_rate` (
    `shasse_method_id` INTEGER UNSIGNED NOT NULL,
    `rate_id` INTEGER UNSIGNED NOT NULL,

    INDEX `shasse_method_rate_rate_id_fkey`(`rate_id`),
    PRIMARY KEY (`shasse_method_id`, `rate_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `skill_obtation_type` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL,
    `status` VARCHAR(45) NOT NULL DEFAULT 'on',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `statistique` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `pv` SMALLINT UNSIGNED NOT NULL,
    `attack` SMALLINT UNSIGNED NOT NULL,
    `defense` SMALLINT UNSIGNED NOT NULL,
    `special_attack` SMALLINT UNSIGNED NULL,
    `special_defense` SMALLINT UNSIGNED NULL,
    `special` SMALLINT UNSIGNED NULL,
    `speed` SMALLINT UNSIGNED NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL,
    `status` VARCHAR(45) NOT NULL DEFAULT 'on',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `statistique_group_game` (
    `game_id` INTEGER UNSIGNED NOT NULL,
    `pokemon_id` INTEGER UNSIGNED NOT NULL,
    `statistique_id` INTEGER UNSIGNED NOT NULL,

    INDEX `statistique_group_game_game_id_fkey`(`game_id`),
    INDEX `statistique_group_game_statistique_id_fkey`(`statistique_id`),
    PRIMARY KEY (`pokemon_id`, `game_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `target` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `is_multiple` BOOLEAN NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL,
    `status` VARCHAR(45) NOT NULL DEFAULT 'on',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `capacity_type` (
    `capacity_info_id` INTEGER UNSIGNED NOT NULL,
    `type_id` INTEGER UNSIGNED NOT NULL,

    INDEX `capacity_type_capacity_info_id_fkey`(`capacity_info_id`),
    PRIMARY KEY (`type_id`, `capacity_info_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `capacity_info` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `power` SMALLINT UNSIGNED NOT NULL,
    `dynamax_power` SMALLINT UNSIGNED NOT NULL,
    `precision` SMALLINT UNSIGNED NOT NULL,
    `pp` SMALLINT UNSIGNED NOT NULL,
    `self_destruct` BOOLEAN NOT NULL,
    `has_backlash` BOOLEAN NOT NULL,
    `game_id` INTEGER UNSIGNED NOT NULL,
    `target_id` INTEGER UNSIGNED NOT NULL,
    `capacity_effect_id` INTEGER UNSIGNED NOT NULL,
    `capacity_id` INTEGER UNSIGNED NOT NULL,
    `capacity_category_id` INTEGER UNSIGNED NOT NULL,
    `capacity_effect_z_id` INTEGER UNSIGNED NOT NULL,
    `influence_id` INTEGER UNSIGNED NOT NULL,
    `effect_without_fight_id` INTEGER UNSIGNED NOT NULL,
    `capsule_id` INTEGER UNSIGNED NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL,
    `status` VARCHAR(45) NOT NULL DEFAULT 'on',

    INDEX `capacity_info_capacity_category_id_fkey`(`capacity_category_id`),
    INDEX `capacity_info_capacity_effect_id_fkey`(`capacity_effect_id`),
    INDEX `capacity_info_capacity_effect_z_id_fkey`(`capacity_effect_z_id`),
    INDEX `capacity_info_capacity_id_fkey`(`capacity_id`),
    INDEX `capacity_info_capsule_id_fkey`(`capsule_id`),
    INDEX `capacity_info_effect_without_fight_id_fkey`(`effect_without_fight_id`),
    INDEX `capacity_info_game_id_fkey`(`game_id`),
    INDEX `capacity_info_influence_id_fkey`(`influence_id`),
    INDEX `capacity_info_target_id_fkey`(`target_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pokemon_rating_game` (
    `game_id` INTEGER UNSIGNED NOT NULL,
    `rate_id` INTEGER UNSIGNED NOT NULL,
    `zone_id` INTEGER UNSIGNED NOT NULL,
    `pokemon_obtation_id` INTEGER UNSIGNED NOT NULL,
    `pokemon_id` INTEGER UNSIGNED NOT NULL,

    INDEX `pokemon_rating_game_pokemon_id_fkey`(`pokemon_id`),
    INDEX `pokemon_rating_game_pokemon_obtation_id_fkey`(`pokemon_obtation_id`),
    INDEX `pokemon_rating_game_rate_id_fkey`(`rate_id`),
    INDEX `pokemon_rating_game_zone_id_fkey`(`zone_id`),
    PRIMARY KEY (`game_id`, `rate_id`, `zone_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `skill_obtation` (
    `capacity_id` INTEGER UNSIGNED NOT NULL,
    `pokemon_id` INTEGER UNSIGNED NOT NULL,
    `game_id` INTEGER UNSIGNED NOT NULL,
    `skill_obtation_type_id` INTEGER UNSIGNED NOT NULL,
    `level` SMALLINT UNSIGNED NULL,

    INDEX `skill_obtation_capacity_id_fkey`(`capacity_id`),
    INDEX `skill_obtation_game_id_fkey`(`game_id`),
    INDEX `skill_obtation_skill_obtation_type_id_fkey`(`skill_obtation_type_id`),
    PRIMARY KEY (`pokemon_id`, `game_id`, `capacity_id`, `skill_obtation_type_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_langue_id_fkey` FOREIGN KEY (`langue_id`) REFERENCES `langue`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `role_user` ADD CONSTRAINT `role_user_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `role_user` ADD CONSTRAINT `role_user_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `shasse` ADD CONSTRAINT `shasse_method_id_fkey` FOREIGN KEY (`method_id`) REFERENCES `shasse_method`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `game` ADD CONSTRAINT `game_generation_id_fkey` FOREIGN KEY (`generation_id`) REFERENCES `generation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pokemon` ADD CONSTRAINT `pokemon_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `pokemon_category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pokemon` ADD CONSTRAINT `pokemon_generation_id_fkey` FOREIGN KEY (`generation_id`) REFERENCES `generation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `owned_pokemon` ADD CONSTRAINT `owned_pokemon_game_id_fkey` FOREIGN KEY (`game_id`) REFERENCES `game`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `owned_pokemon` ADD CONSTRAINT `owned_pokemon_pokemon_id_fkey` FOREIGN KEY (`pokemon_id`) REFERENCES `pokemon`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `owned_pokemon` ADD CONSTRAINT `owned_pokemon_shasse_id_fkey` FOREIGN KEY (`shasse_id`) REFERENCES `shasse`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `owned_pokemon` ADD CONSTRAINT `owned_pokemon_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `owned_pokemon_detail` ADD CONSTRAINT `owned_pokemon_detail_owned_pokemon_fkey` FOREIGN KEY (`owned_pokemon`) REFERENCES `owned_pokemon`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `owned_pokemon_detail` ADD CONSTRAINT `owned_pokemon_detail_pokeball_id_fkey` FOREIGN KEY (`pokeball_id`) REFERENCES `pokeball`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ability` ADD CONSTRAINT `ability_generation_id_fkey` FOREIGN KEY (`generation_id`) REFERENCES `generation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ability_info` ADD CONSTRAINT `ability_info_ability_id_fkey` FOREIGN KEY (`ability_id`) REFERENCES `ability`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ability_info` ADD CONSTRAINT `ability_info_generation_id_fkey` FOREIGN KEY (`generation_id`) REFERENCES `generation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pokemon_info` ADD CONSTRAINT `pokemon_info_generation_id_fkey` FOREIGN KEY (`generation_id`) REFERENCES `generation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pokemon_info` ADD CONSTRAINT `pokemon_info_pokemon_id_fkey` FOREIGN KEY (`pokemon_id`) REFERENCES `pokemon`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ability_order` ADD CONSTRAINT `ability_order_ability_id_fkey` FOREIGN KEY (`ability_id`) REFERENCES `ability`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ability_order` ADD CONSTRAINT `ability_order_pokemon_info_id_fkey` FOREIGN KEY (`pokemon_info_id`) REFERENCES `pokemon_info`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `evolution` ADD CONSTRAINT `evolution_evolution_info_id_fkey` FOREIGN KEY (`evolution_info_id`) REFERENCES `evolution_info`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `evolution` ADD CONSTRAINT `evolution_evolution_method_fkey` FOREIGN KEY (`evolution_method`) REFERENCES `evolution_method`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `evolution` ADD CONSTRAINT `evolution_pokemon_end_id_fkey` FOREIGN KEY (`pokemon_end_id`) REFERENCES `pokemon`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `evolution` ADD CONSTRAINT `evolution_pokemon_start_id_fkey` FOREIGN KEY (`pokemon_start_id`) REFERENCES `pokemon`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `egg_group_order` ADD CONSTRAINT `egg_group_order_egg_group_id_fkey` FOREIGN KEY (`egg_group_id`) REFERENCES `egg_group`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `egg_group_order` ADD CONSTRAINT `egg_group_order_pokemon_info_id_fkey` FOREIGN KEY (`pokemon_info_id`) REFERENCES `pokemon_info`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `type_order` ADD CONSTRAINT `type_order_pokemon_info_id_fkey` FOREIGN KEY (`pokemon_info_id`) REFERENCES `pokemon_info`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `type_order` ADD CONSTRAINT `type_order_type_id_fkey` FOREIGN KEY (`type_id`) REFERENCES `type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `nationnal_number` ADD CONSTRAINT `nationnal_number_game_id_fkey` FOREIGN KEY (`game_id`) REFERENCES `game`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `nationnal_number` ADD CONSTRAINT `nationnal_number_land_id_fkey` FOREIGN KEY (`land_id`) REFERENCES `land`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `nationnal_number` ADD CONSTRAINT `nationnal_number_pokemon_id_fkey` FOREIGN KEY (`pokemon_id`) REFERENCES `pokemon`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `location_zone` ADD CONSTRAINT `location_zone_location_id_fkey` FOREIGN KEY (`location_id`) REFERENCES `location`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `location_zone` ADD CONSTRAINT `location_zone_zone_id_fkey` FOREIGN KEY (`zone_id`) REFERENCES `zone`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rate` ADD CONSTRAINT `rate_condition_rate_id_fkey` FOREIGN KEY (`condition_rate_id`) REFERENCES `detail`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rate` ADD CONSTRAINT `rate_detail_rate_id_fkey` FOREIGN KEY (`detail_rate_id`) REFERENCES `detail`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rate` ADD CONSTRAINT `rate_meteo_id_fkey` FOREIGN KEY (`meteo_id`) REFERENCES `meteo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `shasse_method_game` ADD CONSTRAINT `shasse_method_game_game_id_fkey` FOREIGN KEY (`game_id`) REFERENCES `game`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `shasse_method_game` ADD CONSTRAINT `shasse_method_game_shasse_method_id_fkey` FOREIGN KEY (`shasse_method_id`) REFERENCES `shasse_method`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `shasse_method_rate` ADD CONSTRAINT `shasse_method_rate_rate_id_fkey` FOREIGN KEY (`rate_id`) REFERENCES `rate`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `shasse_method_rate` ADD CONSTRAINT `shasse_method_rate_shasse_method_id_fkey` FOREIGN KEY (`shasse_method_id`) REFERENCES `shasse_method`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `statistique_group_game` ADD CONSTRAINT `statistique_group_game_game_id_fkey` FOREIGN KEY (`game_id`) REFERENCES `game`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `statistique_group_game` ADD CONSTRAINT `statistique_group_game_pokemon_id_fkey` FOREIGN KEY (`pokemon_id`) REFERENCES `pokemon`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `statistique_group_game` ADD CONSTRAINT `statistique_group_game_statistique_id_fkey` FOREIGN KEY (`statistique_id`) REFERENCES `statistique`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `capacity_type` ADD CONSTRAINT `capacity_type_capacity_info_id_fkey` FOREIGN KEY (`capacity_info_id`) REFERENCES `capacity_info`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `capacity_type` ADD CONSTRAINT `capacity_type_type_id_fkey` FOREIGN KEY (`type_id`) REFERENCES `type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `capacity_info` ADD CONSTRAINT `capacity_info_capacity_category_id_fkey` FOREIGN KEY (`capacity_category_id`) REFERENCES `capacity_category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `capacity_info` ADD CONSTRAINT `capacity_info_capacity_effect_id_fkey` FOREIGN KEY (`capacity_effect_id`) REFERENCES `capacity_effect`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `capacity_info` ADD CONSTRAINT `capacity_info_capacity_effect_z_id_fkey` FOREIGN KEY (`capacity_effect_z_id`) REFERENCES `capacity_effect`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `capacity_info` ADD CONSTRAINT `capacity_info_capacity_id_fkey` FOREIGN KEY (`capacity_id`) REFERENCES `capacity`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `capacity_info` ADD CONSTRAINT `capacity_info_capsule_id_fkey` FOREIGN KEY (`capsule_id`) REFERENCES `capsule`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `capacity_info` ADD CONSTRAINT `capacity_info_effect_without_fight_id_fkey` FOREIGN KEY (`effect_without_fight_id`) REFERENCES `effect_without_fight`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `capacity_info` ADD CONSTRAINT `capacity_info_game_id_fkey` FOREIGN KEY (`game_id`) REFERENCES `game`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `capacity_info` ADD CONSTRAINT `capacity_info_influence_id_fkey` FOREIGN KEY (`influence_id`) REFERENCES `influence`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `capacity_info` ADD CONSTRAINT `capacity_info_target_id_fkey` FOREIGN KEY (`target_id`) REFERENCES `target`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pokemon_rating_game` ADD CONSTRAINT `pokemon_rating_game_game_id_fkey` FOREIGN KEY (`game_id`) REFERENCES `game`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pokemon_rating_game` ADD CONSTRAINT `pokemon_rating_game_pokemon_id_fkey` FOREIGN KEY (`pokemon_id`) REFERENCES `pokemon`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pokemon_rating_game` ADD CONSTRAINT `pokemon_rating_game_pokemon_obtation_id_fkey` FOREIGN KEY (`pokemon_obtation_id`) REFERENCES `pokemon_obtation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pokemon_rating_game` ADD CONSTRAINT `pokemon_rating_game_rate_id_fkey` FOREIGN KEY (`rate_id`) REFERENCES `rate`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pokemon_rating_game` ADD CONSTRAINT `pokemon_rating_game_zone_id_fkey` FOREIGN KEY (`zone_id`) REFERENCES `zone`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `skill_obtation` ADD CONSTRAINT `skill_obtation_capacity_id_fkey` FOREIGN KEY (`capacity_id`) REFERENCES `capacity`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `skill_obtation` ADD CONSTRAINT `skill_obtation_game_id_fkey` FOREIGN KEY (`game_id`) REFERENCES `game`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `skill_obtation` ADD CONSTRAINT `skill_obtation_pokemon_id_fkey` FOREIGN KEY (`pokemon_id`) REFERENCES `pokemon`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `skill_obtation` ADD CONSTRAINT `skill_obtation_skill_obtation_type_id_fkey` FOREIGN KEY (`skill_obtation_type_id`) REFERENCES `skill_obtation_type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
