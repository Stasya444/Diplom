/*
  Warnings:

  - You are about to drop the column `value` on the `Rating` table. All the data in the column will be lost.
  - Added the required column `author` to the `Rating` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `Rating` table without a default value. This is not possible if the table is not empty.
  - Made the column `comment` on table `Rating` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Rating" DROP COLUMN "value",
ADD COLUMN     "author" TEXT NOT NULL,
ADD COLUMN     "rating" INTEGER NOT NULL,
ALTER COLUMN "comment" SET NOT NULL;
