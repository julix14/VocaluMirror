exports.up = (pgm) => {
    pgm.createExtension("pgcrypto");

    pgm.createTable("users", {
        id: "id",
        name: { type: "varchar(1000)", notNull: true },
        password: { type: "varchar(1000)", notNull: true },
        email: { type: "varchar(1000)", notNull: true },
        created_at: {
            type: "timestamp",
            notNull: true,
            default: pgm.func("current_timestamp"),
        },
    });

    pgm.createIndex("users", "email");
};

exports.down = (pgm) => {
    pgm.dropTable("users");
    pgm.dropExtension("pgcrypto");
};
