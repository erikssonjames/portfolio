/*
  Warnings:

  - You are about to alter the column `deaths` on the `GameOfLifeStats` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `rebirths` on the `GameOfLifeStats` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "GameOfLifeStats" ALTER COLUMN "deaths" SET DATA TYPE INTEGER,
ALTER COLUMN "rebirths" SET DATA TYPE INTEGER;
