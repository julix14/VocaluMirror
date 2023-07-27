exports.up = (pgm) => {
    pgm.createTable("vocabulary", {
        id: "id",
        word: { type: "text", notNull: true },
        meaning: { type: "text", notNull: true },
        word_language_id: {
            type: "integer",
            notNull: true,
            references: "language",
            onDelete: "cascade",
        },
        meaning_language_id: {
            type: "integer",
            notNull: true,
            references: "language",
            onDelete: "cascade",
        },
        img_path: { type: "varchar(1000)" },
        created_at: {
            type: "timestamp",
            notNull: true,
            default: pgm.func("current_timestamp"),
        },
    });

    pgm.createIndex("vocabulary", "word");
};

exports.down = (pgm) => {
    pgm.dropTable("vocabulary");
};
