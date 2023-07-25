exports.up = (pgm) => {
    pgm.sql(`
      CREATE OR REPLACE VIEW matching_game_view AS
      WITH correct_word AS (
        SELECT word, meaning, img_path
        FROM vocabulary
        WHERE img_path IS NOT NULL
        ORDER BY RANDOM()
        LIMIT 1
      ),
      wrong_words AS (
        SELECT word
        FROM vocabulary
        WHERE word <> (SELECT word FROM correct_word)
        ORDER BY RANDOM()
        LIMIT 3
      )
      SELECT correct_word.word AS correct_word, correct_word.meaning AS correct_meaning, correct_word.img_path AS img_url,
             STRING_AGG(wrong_words.word, ',') AS wrong_word
      FROM correct_word, wrong_words
      GROUP BY correct_word.word, correct_word.meaning, correct_word.img_path;
    `);
};

exports.down = (pgm) => {
    pgm.sql("DROP VIEW IF EXISTS matching_game_view;");
};
