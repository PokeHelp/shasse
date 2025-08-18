/*
  Warnings:

  - Made the column `time` on table `owned_pokemon` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `owned_pokemon` MODIFY `time` INTEGER NOT NULL DEFAULT 0;
