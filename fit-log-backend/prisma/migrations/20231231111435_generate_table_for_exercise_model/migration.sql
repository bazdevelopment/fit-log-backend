-- CreateTable
CREATE TABLE "Exercise" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "bodyPart" TEXT NOT NULL,
    "target" TEXT NOT NULL,
    "equipment" TEXT NOT NULL,
    "gifUrl" TEXT NOT NULL,
    "image" TEXT,
    "secondaryMuscles" TEXT[],
    "instructions" TEXT[],

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);
