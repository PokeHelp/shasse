-- CreateTable
CREATE TABLE `langue` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `iso_code` CHAR(2) NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL,
    `status` VARCHAR(45) NOT NULL DEFAULT 'on',

    UNIQUE INDEX `langue_name_key`(`name`),
    UNIQUE INDEX `langue_iso_code_key`(`iso_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `translation` (
    `langue_id` INTEGER UNSIGNED NOT NULL,
    `reference_id` BIGINT UNSIGNED NOT NULL,
    `reference_table` ENUM('TYPE', 'POKEMON_CATEGORY', 'GAME', 'POKEMON', 'CAPACITY', 'CATEGORY_CAPACITY', 'INFLUENCE', 'SKILL_OBTENTION_TYPE', 'CAPSULE', 'EFFECT_OUTSIDE_FIGHT', 'CAPACITY_EFFECT', 'TARGET', 'POKEMON_OBTENTION', 'METEO', 'SHINY_HUNTING_METHOD', 'DETAIL', 'POKEBALL', 'EGG_GROUP', 'EVOLUTION_METHOD', 'ZONE', 'LOCATION', 'LAND', 'EVOLUTION_INFO', 'ABILITY', 'GROUP_GAME', 'FORM', 'GENDER') NOT NULL,
    `name` TEXT NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL,
    `status` VARCHAR(45) NOT NULL DEFAULT 'on',

    INDEX `translation_langue_id_fkey`(`langue_id`),
    PRIMARY KEY (`reference_table`, `reference_id`, `langue_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `shiny_hunting_method` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL,
    `status` VARCHAR(45) NOT NULL DEFAULT 'on',

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
    `id` INTEGER UNSIGNED NOT NULL,
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
CREATE TABLE `game_group_game` (
    `game_id` INTEGER UNSIGNED NOT NULL,
    `group_game_id` INTEGER UNSIGNED NOT NULL,
    `land_id` INTEGER UNSIGNED NOT NULL,

    INDEX `game_group_game_group_game_id_fkey`(`group_game_id`),
    INDEX `game_group_game_land_id_fkey`(`land_id`),
    PRIMARY KEY (`game_id`, `group_game_id`, `land_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `group_game` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL,
    `status` VARCHAR(45) NOT NULL DEFAULT 'on',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `capsule_game_capacity_info` (
    `capacity_info_id` INTEGER UNSIGNED NOT NULL,
    `capsule_id` INTEGER UNSIGNED NOT NULL,
    `groupe_game_id` INTEGER UNSIGNED NOT NULL,

    INDEX `capsule_game_capacity_info_capsule_id_fkey`(`capsule_id`),
    INDEX `capsule_game_capacity_info_groupe_game_id_fkey`(`groupe_game_id`),
    PRIMARY KEY (`capacity_info_id`, `groupe_game_id`)
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
    `international_number` INTEGER NOT NULL,
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
CREATE TABLE `gender` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL,
    `status` VARCHAR(45) NOT NULL DEFAULT 'on',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `form` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL,
    `status` VARCHAR(45) NOT NULL DEFAULT 'on',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pokemon_form_gender` (
    `pokemon_form_id` INTEGER UNSIGNED NOT NULL,
    `gender_id` INTEGER UNSIGNED NOT NULL,

    INDEX `pokemon_form_gender_pokemon_form_id_fkey`(`pokemon_form_id`),
    PRIMARY KEY (`gender_id`, `pokemon_form_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pokemon_form` (
    `pokemon_id` INTEGER UNSIGNED NOT NULL,
    `form_id` INTEGER UNSIGNED NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `status` VARCHAR(45) NOT NULL DEFAULT 'on',
    `updated_at` DATETIME(0) NULL,

    INDEX `pokemon_form_form_id_fkey`(`form_id`),
    UNIQUE INDEX `pokemon_form_pokemon_id_form_id_key`(`pokemon_id`, `form_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `owned_pokemon` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(191) NOT NULL,
    `pokemon_form_id` INTEGER UNSIGNED NOT NULL,
    `game_id` INTEGER UNSIGNED NOT NULL,
    `is_shiny` BOOLEAN NOT NULL,
    `method_id` INTEGER UNSIGNED NOT NULL,
    `meeting_number` INTEGER UNSIGNED NULL,
    `time` TIME(0) NULL,
    `is_finish` BOOLEAN NOT NULL,
    `use_charm_chroma` BOOLEAN NOT NULL,
    `creation_date` DATETIME(3) NOT NULL,
    `finish_date` DATETIME(3) NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL,
    `status` VARCHAR(45) NOT NULL DEFAULT 'on',

    INDEX `shiny_hunting_method_id_fkey`(`method_id`),
    INDEX `owned_pokemon_game_id_fkey`(`game_id`),
    INDEX `owned_pokemon_pokemon_form_id_fkey`(`pokemon_form_id`),
    INDEX `owned_pokemon_user_id_fkey`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `owned_pokemon_detail` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `nickname` VARCHAR(45) NOT NULL,
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
    `appearance_generation_id` INTEGER UNSIGNED NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL,
    `status` VARCHAR(45) NOT NULL DEFAULT 'on',

    INDEX `ability_generation_id_fkey`(`appearance_generation_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ability_info` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `generation_id` INTEGER UNSIGNED NOT NULL,
    `ability_id` INTEGER UNSIGNED NOT NULL,
    `effect_outside_fight_id` INTEGER UNSIGNED NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL,
    `status` VARCHAR(45) NOT NULL DEFAULT 'on',

    INDEX `ability_info_ability_id_fkey`(`ability_id`),
    INDEX `ability_info_generation_id_fkey`(`generation_id`),
    INDEX `ability_info_effect_outside_fight_id_fkey`(`effect_outside_fight_id`),
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
    INDEX `evolution_pokemon_form_end_id_fkey`(`pokemon_end_id`),
    INDEX `evolution_pokemon_form_start_id_fkey`(`pokemon_start_id`),
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
CREATE TABLE `national_number` (
    `group_game_id` INTEGER UNSIGNED NOT NULL,
    `pokemon_id` INTEGER UNSIGNED NOT NULL,
    `number` INTEGER NOT NULL,

    INDEX `national_number_group_game_id_fkey`(`group_game_id`),
    PRIMARY KEY (`pokemon_id`, `group_game_id`)
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
CREATE TABLE `effect_outside_fight` (
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
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `location_id` INTEGER UNSIGNED NOT NULL,
    `zone_id` INTEGER UNSIGNED NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL,
    `status` VARCHAR(45) NOT NULL DEFAULT 'on',

    INDEX `location_zone_location_id_fkey`(`location_id`),
    INDEX `location_zone_zone_id_fkey`(`zone_id`),
    UNIQUE INDEX `location_zone_location_id_zone_id_key`(`location_id`, `zone_id`),
    PRIMARY KEY (`id`)
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
    `is_alpha` BOOLEAN NOT NULL,

    INDEX `rate_condition_rate_id_fkey`(`condition_rate_id`),
    INDEX `rate_detail_rate_id_fkey`(`detail_rate_id`),
    INDEX `rate_meteo_id_fkey`(`meteo_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `shiny_hunting_method_game` (
    `shiny_hunting_method_id` INTEGER UNSIGNED NOT NULL,
    `group_game_id` INTEGER UNSIGNED NOT NULL,

    INDEX `shiny_hunting_method_game_shiny_hunting_method_id_fkey`(`shiny_hunting_method_id`),
    PRIMARY KEY (`group_game_id`, `shiny_hunting_method_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `shiny_hunting_method_rate` (
    `shiny_hunting_method_id` INTEGER UNSIGNED NOT NULL,
    `rate_id` INTEGER UNSIGNED NOT NULL,

    INDEX `shiny_hunting_method_rate_rate_id_fkey`(`rate_id`),
    PRIMARY KEY (`shiny_hunting_method_id`, `rate_id`)
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
CREATE TABLE `statistic` (
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
CREATE TABLE `statistic_group_game` (
    `group_game_id` INTEGER UNSIGNED NOT NULL,
    `pokemon_id` INTEGER UNSIGNED NOT NULL,
    `statistic_id` INTEGER UNSIGNED NOT NULL,

    INDEX `statistic_group_game_statistic_id_fkey`(`statistic_id`),
    INDEX `statistic_group_game_group_game_id_fkey`(`group_game_id`),
    PRIMARY KEY (`pokemon_id`, `group_game_id`)
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
CREATE TABLE `capacity_info` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `power` SMALLINT NOT NULL,
    `dynamax_power` SMALLINT NOT NULL,
    `precision` SMALLINT NOT NULL,
    `pp` SMALLINT UNSIGNED NOT NULL,
    `has_backlash` BOOLEAN NOT NULL,
    `target_id` INTEGER UNSIGNED NOT NULL,
    `capacity_effect_id` INTEGER UNSIGNED NOT NULL,
    `capacity_id` INTEGER UNSIGNED NOT NULL,
    `capacity_effect_z_id` INTEGER UNSIGNED NOT NULL,
    `type_id` INTEGER UNSIGNED NOT NULL,
    `effect_outside_fight_id` INTEGER UNSIGNED NOT NULL,
    `capacity_category_id` INTEGER UNSIGNED NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NULL,
    `status` VARCHAR(45) NOT NULL DEFAULT 'on',

    INDEX `capacity_info_capacity_effect_id_fkey`(`capacity_effect_id`),
    INDEX `capacity_info_capacity_effect_z_id_fkey`(`capacity_effect_z_id`),
    INDEX `capacity_info_capacity_id_fkey`(`capacity_id`),
    INDEX `capacity_info_target_id_fkey`(`target_id`),
    INDEX `capacity_info_type_id_fkey`(`type_id`),
    INDEX `capacity_info_capacity_category_id_fkey`(`capacity_category_id`),
    INDEX `capacity_info_effect_outside_fight_id_fkey`(`effect_outside_fight_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `capacity_info_influence` (
    `capacity_info` INTEGER UNSIGNED NOT NULL,
    `influenceId` INTEGER UNSIGNED NOT NULL,

    INDEX `capacity_info_influence_influenceId_fkey`(`influenceId`),
    PRIMARY KEY (`capacity_info`, `influenceId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pokemon_game_location` (
    `game_id` INTEGER UNSIGNED NOT NULL,
    `rate_id` INTEGER UNSIGNED NOT NULL,
    `location_zone_id` INTEGER UNSIGNED NOT NULL,
    `pokemon_obtation_id` INTEGER UNSIGNED NOT NULL,
    `pokemon_form_id` INTEGER UNSIGNED NOT NULL,
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,

    INDEX `pokemon_rating_game_pokemon_form_id_fkey`(`pokemon_form_id`),
    INDEX `pokemon_rating_game_pokemon_obtation_id_fkey`(`pokemon_obtation_id`),
    INDEX `pokemon_rating_game_rate_id_fkey`(`rate_id`),
    INDEX `pokemon_rating_game_location_zone_id_fkey`(`location_zone_id`),
    UNIQUE INDEX `pokemon_game_location_game_id_rate_id_location_zone_id_pokem_key`(`game_id`, `rate_id`, `location_zone_id`, `pokemon_form_id`, `pokemon_obtation_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `skill_obtation` (
    `capacity_id` INTEGER UNSIGNED NOT NULL,
    `pokemon_id` INTEGER UNSIGNED NOT NULL,
    `group_game_id` INTEGER UNSIGNED NOT NULL,
    `skill_obtation_type_id` INTEGER UNSIGNED NOT NULL,
    `detail` VARCHAR(255) NOT NULL,

    INDEX `skill_obtation_capacity_id_fkey`(`capacity_id`),
    INDEX `skill_obtation_skill_obtation_type_id_fkey`(`skill_obtation_type_id`),
    INDEX `skill_obtation_group_game_id_fkey`(`group_game_id`),
    PRIMARY KEY (`pokemon_id`, `group_game_id`, `capacity_id`, `skill_obtation_type_id`, `detail`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` VARCHAR(191) NOT NULL,
    `pseudonym` VARCHAR(100) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `emailVerified` BOOLEAN NOT NULL,
    `createdAt` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `role` ENUM('PUBLIC', 'ADMIN', 'SUPER_ADMIN') NOT NULL DEFAULT 'PUBLIC',

    UNIQUE INDEX `user_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `session` (
    `id` VARCHAR(191) NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `ipAddress` TEXT NULL,
    `userAgent` TEXT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `session_token_key`(`token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `account` (
    `id` VARCHAR(191) NOT NULL,
    `accountId` TEXT NOT NULL,
    `providerId` TEXT NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `accessToken` TEXT NULL,
    `refreshToken` TEXT NULL,
    `idToken` TEXT NULL,
    `accessTokenExpiresAt` DATETIME(3) NULL,
    `refreshTokenExpiresAt` DATETIME(3) NULL,
    `scope` TEXT NULL,
    `password` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `verification` (
    `id` VARCHAR(191) NOT NULL,
    `identifier` TEXT NOT NULL,
    `value` TEXT NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NULL,
    `updatedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `translation` ADD CONSTRAINT `translation_langue_id_fkey` FOREIGN KEY (`langue_id`) REFERENCES `langue`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `game` ADD CONSTRAINT `game_generation_id_fkey` FOREIGN KEY (`generation_id`) REFERENCES `generation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `game_group_game` ADD CONSTRAINT `game_group_game_game_id_fkey` FOREIGN KEY (`game_id`) REFERENCES `game`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `game_group_game` ADD CONSTRAINT `game_group_game_group_game_id_fkey` FOREIGN KEY (`group_game_id`) REFERENCES `group_game`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `game_group_game` ADD CONSTRAINT `game_group_game_land_id_fkey` FOREIGN KEY (`land_id`) REFERENCES `land`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `capsule_game_capacity_info` ADD CONSTRAINT `capsule_game_capacity_info_capacity_info_id_fkey` FOREIGN KEY (`capacity_info_id`) REFERENCES `capacity_info`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `capsule_game_capacity_info` ADD CONSTRAINT `capsule_game_capacity_info_capsule_id_fkey` FOREIGN KEY (`capsule_id`) REFERENCES `capsule`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `capsule_game_capacity_info` ADD CONSTRAINT `capsule_game_capacity_info_groupe_game_id_fkey` FOREIGN KEY (`groupe_game_id`) REFERENCES `group_game`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pokemon` ADD CONSTRAINT `pokemon_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `pokemon_category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pokemon` ADD CONSTRAINT `pokemon_generation_id_fkey` FOREIGN KEY (`generation_id`) REFERENCES `generation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pokemon_form_gender` ADD CONSTRAINT `pokemon_form_gender_gender_id_fkey` FOREIGN KEY (`gender_id`) REFERENCES `gender`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pokemon_form_gender` ADD CONSTRAINT `pokemon_form_gender_pokemon_form_id_fkey` FOREIGN KEY (`pokemon_form_id`) REFERENCES `pokemon_form`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pokemon_form` ADD CONSTRAINT `pokemon_form_form_id_fkey` FOREIGN KEY (`form_id`) REFERENCES `form`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pokemon_form` ADD CONSTRAINT `pokemon_form_pokemon_id_fkey` FOREIGN KEY (`pokemon_id`) REFERENCES `pokemon`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `owned_pokemon` ADD CONSTRAINT `owned_pokemon_game_id_fkey` FOREIGN KEY (`game_id`) REFERENCES `game`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `owned_pokemon` ADD CONSTRAINT `owned_pokemon_method_id_fkey` FOREIGN KEY (`method_id`) REFERENCES `shiny_hunting_method`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `owned_pokemon` ADD CONSTRAINT `owned_pokemon_pokemon_form_id_fkey` FOREIGN KEY (`pokemon_form_id`) REFERENCES `pokemon_form`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `owned_pokemon` ADD CONSTRAINT `owned_pokemon_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `owned_pokemon_detail` ADD CONSTRAINT `owned_pokemon_detail_owned_pokemon_fkey` FOREIGN KEY (`owned_pokemon`) REFERENCES `owned_pokemon`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `owned_pokemon_detail` ADD CONSTRAINT `owned_pokemon_detail_pokeball_id_fkey` FOREIGN KEY (`pokeball_id`) REFERENCES `pokeball`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ability` ADD CONSTRAINT `ability_appearance_generation_id_fkey` FOREIGN KEY (`appearance_generation_id`) REFERENCES `generation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ability_info` ADD CONSTRAINT `ability_info_ability_id_fkey` FOREIGN KEY (`ability_id`) REFERENCES `ability`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ability_info` ADD CONSTRAINT `ability_info_effect_outside_fight_id_fkey` FOREIGN KEY (`effect_outside_fight_id`) REFERENCES `effect_outside_fight`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

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
ALTER TABLE `evolution` ADD CONSTRAINT `evolution_pokemon_end_id_fkey` FOREIGN KEY (`pokemon_end_id`) REFERENCES `pokemon_form`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `evolution` ADD CONSTRAINT `evolution_pokemon_start_id_fkey` FOREIGN KEY (`pokemon_start_id`) REFERENCES `pokemon_form`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `egg_group_order` ADD CONSTRAINT `egg_group_order_egg_group_id_fkey` FOREIGN KEY (`egg_group_id`) REFERENCES `egg_group`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `egg_group_order` ADD CONSTRAINT `egg_group_order_pokemon_info_id_fkey` FOREIGN KEY (`pokemon_info_id`) REFERENCES `pokemon_info`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `type_order` ADD CONSTRAINT `type_order_pokemon_info_id_fkey` FOREIGN KEY (`pokemon_info_id`) REFERENCES `pokemon_info`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `type_order` ADD CONSTRAINT `type_order_type_id_fkey` FOREIGN KEY (`type_id`) REFERENCES `type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `national_number` ADD CONSTRAINT `national_number_group_game_id_fkey` FOREIGN KEY (`group_game_id`) REFERENCES `group_game`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `national_number` ADD CONSTRAINT `national_number_pokemon_id_fkey` FOREIGN KEY (`pokemon_id`) REFERENCES `pokemon`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

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
ALTER TABLE `shiny_hunting_method_game` ADD CONSTRAINT `shiny_hunting_method_game_group_game_id_fkey` FOREIGN KEY (`group_game_id`) REFERENCES `group_game`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `shiny_hunting_method_game` ADD CONSTRAINT `shiny_hunting_method_game_shiny_hunting_method_id_fkey` FOREIGN KEY (`shiny_hunting_method_id`) REFERENCES `shiny_hunting_method`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `shiny_hunting_method_rate` ADD CONSTRAINT `shiny_hunting_method_rate_rate_id_fkey` FOREIGN KEY (`rate_id`) REFERENCES `rate`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `shiny_hunting_method_rate` ADD CONSTRAINT `shiny_hunting_method_rate_shiny_hunting_method_id_fkey` FOREIGN KEY (`shiny_hunting_method_id`) REFERENCES `shiny_hunting_method`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `statistic_group_game` ADD CONSTRAINT `statistic_group_game_group_game_id_fkey` FOREIGN KEY (`group_game_id`) REFERENCES `group_game`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `statistic_group_game` ADD CONSTRAINT `statistic_group_game_pokemon_id_fkey` FOREIGN KEY (`pokemon_id`) REFERENCES `pokemon`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `statistic_group_game` ADD CONSTRAINT `statistic_group_game_statistic_id_fkey` FOREIGN KEY (`statistic_id`) REFERENCES `statistic`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `capacity_info` ADD CONSTRAINT `capacity_info_capacity_category_id_fkey` FOREIGN KEY (`capacity_category_id`) REFERENCES `capacity_category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `capacity_info` ADD CONSTRAINT `capacity_info_capacity_effect_id_fkey` FOREIGN KEY (`capacity_effect_id`) REFERENCES `capacity_effect`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `capacity_info` ADD CONSTRAINT `capacity_info_capacity_effect_z_id_fkey` FOREIGN KEY (`capacity_effect_z_id`) REFERENCES `capacity_effect`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `capacity_info` ADD CONSTRAINT `capacity_info_capacity_id_fkey` FOREIGN KEY (`capacity_id`) REFERENCES `capacity`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `capacity_info` ADD CONSTRAINT `capacity_info_effect_outside_fight_id_fkey` FOREIGN KEY (`effect_outside_fight_id`) REFERENCES `effect_outside_fight`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `capacity_info` ADD CONSTRAINT `capacity_info_target_id_fkey` FOREIGN KEY (`target_id`) REFERENCES `target`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `capacity_info` ADD CONSTRAINT `capacity_info_type_id_fkey` FOREIGN KEY (`type_id`) REFERENCES `type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `capacity_info_influence` ADD CONSTRAINT `capacity_info_influence_capacity_info_fkey` FOREIGN KEY (`capacity_info`) REFERENCES `capacity_info`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `capacity_info_influence` ADD CONSTRAINT `capacity_info_influence_influenceId_fkey` FOREIGN KEY (`influenceId`) REFERENCES `influence`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pokemon_game_location` ADD CONSTRAINT `pokemon_game_location_game_id_fkey` FOREIGN KEY (`game_id`) REFERENCES `game`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pokemon_game_location` ADD CONSTRAINT `pokemon_game_location_location_zone_id_fkey` FOREIGN KEY (`location_zone_id`) REFERENCES `location_zone`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pokemon_game_location` ADD CONSTRAINT `pokemon_game_location_pokemon_form_id_fkey` FOREIGN KEY (`pokemon_form_id`) REFERENCES `pokemon_form`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pokemon_game_location` ADD CONSTRAINT `pokemon_game_location_pokemon_obtation_id_fkey` FOREIGN KEY (`pokemon_obtation_id`) REFERENCES `pokemon_obtation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pokemon_game_location` ADD CONSTRAINT `pokemon_game_location_rate_id_fkey` FOREIGN KEY (`rate_id`) REFERENCES `rate`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `skill_obtation` ADD CONSTRAINT `skill_obtation_capacity_id_fkey` FOREIGN KEY (`capacity_id`) REFERENCES `capacity`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `skill_obtation` ADD CONSTRAINT `skill_obtation_group_game_id_fkey` FOREIGN KEY (`group_game_id`) REFERENCES `group_game`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `skill_obtation` ADD CONSTRAINT `skill_obtation_pokemon_id_fkey` FOREIGN KEY (`pokemon_id`) REFERENCES `pokemon`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `skill_obtation` ADD CONSTRAINT `skill_obtation_skill_obtation_type_id_fkey` FOREIGN KEY (`skill_obtation_type_id`) REFERENCES `skill_obtation_type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `session` ADD CONSTRAINT `session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `account` ADD CONSTRAINT `account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
