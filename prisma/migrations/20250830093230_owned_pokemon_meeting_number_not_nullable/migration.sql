/*
  Warnings:

  - You are about to alter the column `time` on the `owned_pokemon` table. The data in that column could be lost. The data in that column will be cast from `Int` to `UnsignedInt`.
  - Made the column `meeting_number` on table `owned_pokemon` required. This step will fail if there are existing NULL values in that column.

*/
-- Prepare AlterTable
UPDATE `owned_pokemon`
SET `meeting_number` = 0
WHERE `meeting_number` IS NULL;

-- AlterTable
ALTER TABLE `owned_pokemon` MODIFY `meeting_number` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    MODIFY `time` INTEGER UNSIGNED NOT NULL DEFAULT 0;
