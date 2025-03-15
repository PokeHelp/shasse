/*
  Warnings:

  - Added the required column `is_alpha` to the `rate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `rate` ADD COLUMN `is_alpha` BOOLEAN NOT NULL;
