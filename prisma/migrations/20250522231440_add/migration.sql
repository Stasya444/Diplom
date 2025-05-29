/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Photographer` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Photographer_name_key" ON "Photographer"("name");
