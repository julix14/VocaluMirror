exports.up = (pgm) => {
    pgm.sql(`
    INSERT INTO language (name)
    VALUES
    ('English'),
    ('German');
    `);

    pgm.sql(`
    INSERT INTO vocabulary (word, meaning, word_language_id, meaning_language_id, img_path, created_at)
    VALUES
      ('Dog', 'Hund', 1, 2, 'https://loremflickr.com/640/640/Dog', NOW()),
      ('Cat', 'Katze', 1, 2, 'https://loremflickr.com/640/640/Cat', NOW()),
      ('Elephant', 'Elefant', 1, 2, 'https://loremflickr.com/640/640/Elephant', NOW()),
      ('Lion', 'Löwe', 1, 2, 'https://loremflickr.com/640/640/Lion', NOW()),
      ('Tiger', 'Tiger', 1, 2, 'https://loremflickr.com/640/640/Tiger', NOW()),
      ('Giraffe', 'Giraffe', 1, 2, 'https://loremflickr.com/640/640/Giraffe', NOW()),
      ('Monkey', 'Affe', 1, 2, 'https://loremflickr.com/640/640/Monkey', NOW()),
      ('Kangaroo', 'Känguru', 1, 2, 'https://loremflickr.com/640/640/Kangaroo', NOW()),
      ('Penguin', 'Pinguin', 1, 2, 'https://loremflickr.com/640/640/Penguin', NOW()),
      ('Zebra', 'Zebra', 1, 2, 'https://loremflickr.com/640/640/Zebra', NOW()),
      ('Dolphin', 'Delfin', 1, 2, 'https://loremflickr.com/640/640/Dolphin', NOW()),
      ('Shark', 'Hai', 1, 2, 'https://loremflickr.com/640/640/Shark', NOW()),
      ('Koala', 'Koala', 1, 2, 'https://loremflickr.com/640/640/Koala', NOW()),
      ('Panda', 'Panda', 1, 2, 'https://loremflickr.com/640/640/Panda', NOW()),
      ('Polar Bear', 'Eisbär', 1, 2, 'https://loremflickr.com/640/640/PolarBear', NOW()),
      ('Rabbit', 'Kaninchen', 1, 2, 'https://loremflickr.com/640/640/Rabbit', NOW()),
      ('Turtle', 'Schildkröte', 1, 2, 'https://loremflickr.com/640/640/Turtle', NOW()),
      ('Koala', 'Koala', 1, 2, 'https://loremflickr.com/640/640/Koala', NOW()),
      ('Lizard', 'Eidechse', 1, 2, 'https://loremflickr.com/640/640/Lizard', NOW()),
      ('Crocodile', 'Krokodil', 1, 2, 'https://loremflickr.com/640/640/Crocodile', NOW());
    `);

    pgm.sql(`
    INSERT INTO users (name ,email, password)
    VALUES
      ('testuser', 'user@example.com', '$2b$10$Pi/jgbwVaOOqfkPs/vmtp.M7oo/E0X8KwkgbTa.x0OfwCZ/s8Tc.y');
    `);
};

exports.down = (pgm) => {
    pgm.sql(`
    TRUNCATE TABLE vocabulary CASCADE;
    `);

    pgm.sql(`
    TRUNCATE TABLE language CASCADE;
    `);

    pgm.sql(`
    TRUNCATE TABLE users CASCADE;
    `);
};
