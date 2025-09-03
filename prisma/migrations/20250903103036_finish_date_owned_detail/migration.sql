/*
  Warnings:

  - You are about to alter the column `finish_date` on the `owned_pokemon_detail` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.

*/
-- AlterTable
ALTER TABLE `owned_pokemon_detail` MODIFY `finish_date` DATETIME(0) NOT NULL;
