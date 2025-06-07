/*
  Warnings:

  - Added the required column `userId` to the `Photographer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Photographer" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Photographer" ADD CONSTRAINT "Photographer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
