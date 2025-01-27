/**
 * Creates the authentications table.
 * @param {import('node-pg-migrate').MigrationBuilder} pgm - The migration builder instance.
 */
exports.up = (pgm) => {
  pgm.createTable("authentications", {
    token: { type: "TEXT", primaryKey: true },
  });
};

/**
 * Drops the authentications table.
 * @param {import('node-pg-migrate').MigrationBuilder} pgm - The migration builder instance.
 */
exports.down = (pgm) => {
  pgm.dropTable("authentications");
};
