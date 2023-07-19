/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable("language", {
        id: "id",
        name: { type: "varchar(1000)", notNull: true },
        created_at: {
            type: "timestamp",
            notNull: true,
            default: pgm.func("current_timestamp"),
        },
    });

    pgm.createIndex("language", "name");
};

exports.down = (pgm) => {
    pgm.dropTable("language");
};
