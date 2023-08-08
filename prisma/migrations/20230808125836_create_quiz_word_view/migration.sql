-- This is an empty migration.

CREATE
OR REPLACE VIEW quizword_view AS
WITH correct_word AS (
        SELECT
            id,
            word,
            meaning,
            image_url,
            word_language_id
        FROM "Vocabulary"
        WHERE
            image_url IS NOT NULL
        ORDER BY RANDOM()
        LIMIT
            1
    ), wrong_words AS (
        SELECT word
        FROM "Vocabulary"
        WHERE word <> (
                SELECT word
                FROM
                    correct_word
            )
        ORDER BY RANDOM()
        LIMIT 3
    )
SELECT
    correct_word.id AS id,
    correct_word.word AS correct_word,
    correct_word.meaning AS correct_meaning,
    correct_word.image_url AS img_url,
    correct_word.word_language_id AS word_language_id,
    STRING_AGG(wrong_words.word, ',') AS wrong_word
FROM
    correct_word,
    wrong_words
GROUP BY
    id,
    correct_word.word,
    correct_word.meaning,
    correct_word.image_url,
    correct_word.wORD_LANGUAGE_ID;