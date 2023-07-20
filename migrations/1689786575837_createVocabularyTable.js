exports.up = (pgm) => {
    pgm.createTable("vocabulary", {
        id: "id",
        word: { type: "varchar(1000)", notNull: true },
        meaning: { type: "varchar(1000)", notNull: true },
        language_id: {
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
