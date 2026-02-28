-- CreateTable
CREATE TABLE "GameOfLifeStats" (
    "id" BIGINT NOT NULL,
    "deaths" BIGINT NOT NULL,
    "rebirths" BIGINT NOT NULL,

    CONSTRAINT "GameOfLifeStats_pkey" PRIMARY KEY ("id")
);
