exports.up = (pgm) => {
    pgm.createTable("flash_card", {
        id: "id",
        question: { type: "varchar(1000)", notNull: true },
        answer: { type: "varchar(1000)", notNull: true },
        created_at: {
            type: "timestamp",
            notNull: true,
            default: pgm.func("current_timestamp"),
        },
        language_id: {
            type: "integer",
            notNull: true,
            references: "language",
            onDelete: "cascade",
        },
    });
};

exports.down = (pgm) => {
    pgm.dropTable("flash_card");
};
