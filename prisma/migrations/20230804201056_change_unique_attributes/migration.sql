/*
  Warnings:

  - A unique constraint covering the columns `[question]` on the table `Flashcard` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Language` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Flashcard_question_key" ON "Flashcard"("question");

-- CreateIndex
CREATE UNIQUE INDEX "Language_name_key" ON "Language"("name");
