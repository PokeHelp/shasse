/*
  Warnings:

  - You are about to drop the column `finish_date` on the `owned_pokemon` table. All the data in the column will be lost.
  - Added the required column `finish_date` to the `owned_pokemon_detail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `owned_pokemon` DROP COLUMN `finish_date`;

-- AlterTable
ALTER TABLE `owned_pokemon_detail` ADD COLUMN `finish_date` DATETIME(3) NOT NULL;
