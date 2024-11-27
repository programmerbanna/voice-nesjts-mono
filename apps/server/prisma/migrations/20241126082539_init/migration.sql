-- CreateEnum
CREATE TYPE "ProfessionalType" AS ENUM ('Organization', 'Practitioner');

-- CreateTable
CREATE TABLE "Professional" (
    "id" TEXT NOT NULL,
    "type" "ProfessionalType" NOT NULL,
    "orgOrPracId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ranking" INTEGER NOT NULL,
    "photo" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "subCategory" TEXT[],
    "rating" DOUBLE PRECISION NOT NULL,
    "totalAppointment" INTEGER NOT NULL,
    "zone" TEXT[],
    "branch" TEXT[],
    "areaOfPractice" TEXT NOT NULL,

    CONSTRAINT "Professional_pkey" PRIMARY KEY ("id")
);
