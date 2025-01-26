/**
 * Creates the users table.
 * @param {import('node-pg-migrate').MigrationBuilder} pgm - The migration builder instance.
 */
exports.up = (pgm) => {
  pgm.createTable("users", {
    id: { type: "VARCHAR(50)", primaryKey: true },
    username: { type: "VARCHAR(50)", unique: true, notNull: true },
    password: { type: "TEXT", notNull: true },
    fullname: { type: "TEXT", notNull: true },
    created_at: { type: "TEXT", notNull: true },
    updated_at: { type: "TEXT", notNull: true },
  });
};

/**
 * Drops the users table.
 * @param {import('node-pg-migrate').MigrationBuilder} pgm - The migration builder instance.
 */
exports.down = (pgm) => {
  pgm.dropTable("users");
};
