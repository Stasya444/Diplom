/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Photo` table. All the data in the column will be lost.
  - Added the required column `url` to the `Photo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Photo" DROP COLUMN "imageUrl",
ADD COLUMN     "url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Photographer" ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "experience" INTEGER,
ADD COLUMN     "ordersCount" INTEGER;
