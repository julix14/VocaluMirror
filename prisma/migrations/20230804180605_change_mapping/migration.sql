/*
  Warnings:

  - You are about to drop the column `user_id` on the `Vocabulary` table. All the data in the column will be lost.
  - You are about to drop the `FlashCard` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FlashCard" DROP CONSTRAINT "FlashCard_language_id_fkey";

-- DropForeignKey
ALTER TABLE "FlashCard" DROP CONSTRAINT "FlashCard_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Vocabulary" DROP CONSTRAINT "Vocabulary_user_id_fkey";

-- AlterTable
ALTER TABLE "Vocabulary" DROP COLUMN "user_id";

-- DropTable
DROP TABLE "FlashCard";

-- CreateTable
CREATE TABLE "VocabularyOnUser" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "vocabulary_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VocabularyOnUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Flashcard" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "language_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Flashcard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FlashcardOnUser" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "flashcard_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FlashcardOnUser_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "VocabularyOnUser" ADD CONSTRAINT "VocabularyOnUser_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VocabularyOnUser" ADD CONSTRAINT "VocabularyOnUser_vocabulary_id_fkey" FOREIGN KEY ("vocabulary_id") REFERENCES "Vocabulary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flashcard" ADD CONSTRAINT "Flashcard_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "Language"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlashcardOnUser" ADD CONSTRAINT "FlashcardOnUser_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlashcardOnUser" ADD CONSTRAINT "FlashcardOnUser_flashcard_id_fkey" FOREIGN KEY ("flashcard_id") REFERENCES "Flashcard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
