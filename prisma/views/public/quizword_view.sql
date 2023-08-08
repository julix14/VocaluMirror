WITH correct_word AS (
  SELECT
    "Vocabulary".id,
    "Vocabulary".word,
    "Vocabulary".meaning,
    "Vocabulary".image_url,
    "Vocabulary".word_language_id
  FROM
    "Vocabulary"
  WHERE
    ("Vocabulary".image_url IS NOT NULL)
  ORDER BY
    (random())
  LIMIT
    1
), wrong_words AS (
  SELECT
    "Vocabulary".word
  FROM
    "Vocabulary"
  WHERE
    (
      "Vocabulary".word <> (
        SELECT
          correct_word_1.word
        FROM
          correct_word correct_word_1
      )
    )
  ORDER BY
    (random())
  LIMIT
    3
)
SELECT
  correct_word.id,
  correct_word.word AS correct_word,
  correct_word.meaning AS correct_meaning,
  correct_word.image_url AS img_url,
  correct_word.word_language_id,
  string_agg(wrong_words.word, ',' :: text) AS wrong_word
FROM
  correct_word,
  wrong_words
GROUP BY
  correct_word.id,
  correct_word.word,
  correct_word.meaning,
  correct_word.image_url,
  correct_word.word_language_id;