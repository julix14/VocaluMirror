exports.up = (pgm) => {
    pgm.createTable("vocabulary_user_mapping", {
        id: "id",
        user_id: {
            type: "integer",
            notNull: true,
            references: "users",
            onDelete: "cascade",
        },
        vocabulary_id: {
            type: "integer",
            notNull: true,
            references: "vocabulary",
            onDelete: "cascade",
        },
        stage: {
            type: "integer",
            notNull: true,
            default: 1,
        },
        created_at: {
            type: "timestamp",
            notNull: true,
            default: pgm.func("current_timestamp"),
        },
        updated_at: {
            type: "timestamp",
            notNull: true,
            default: pgm.func("current_timestamp"),
        },
    });
};

exports.down = (pgm) => {
    pgm.dropTable("vocabulary_user_mapping");
};
