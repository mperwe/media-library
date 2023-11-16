/*
  Warnings:

  - You are about to drop the column `name` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Profile` table. All the data in the column will be lost.
  - Added the required column `username` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "name",
DROP COLUMN "phone",
ADD COLUMN     "username" VARCHAR(50) NOT NULL;
