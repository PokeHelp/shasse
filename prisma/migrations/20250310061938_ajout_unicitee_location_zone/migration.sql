/*
  Warnings:

  - A unique constraint covering the columns `[location_id,zone_id]` on the table `location_zone` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `location_zone_location_id_zone_id_key` ON `location_zone`(`location_id`, `zone_id`);
