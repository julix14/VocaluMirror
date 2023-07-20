exports.up = (pgm) => {
    pgm.createTable("flash_card_user_mapping", {
        id: "id",
        flash_card_id: {
            type: "integer",
            notNull: true,
            references: "flash_card",
            onDelete: "cascade",
        },
        user_id: {
            type: "integer",
            notNull: true,
            references: "users",
            onDelete: "cascade",
        },
        created_at: {
            type: "timestamp",
            notNull: true,
            default: pgm.func("current_timestamp"),
        },
    });
};

exports.down = (pgm) => {
    pgm.dropTable("flash_card_user_mapping");
};
