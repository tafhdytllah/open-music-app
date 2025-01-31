/**
 * Creates the albums table.
 * @param {import('node-pg-migrate').MigrationBuilder} pgm - The migration builder instance.
 */
exports.up = (pgm) => {
  pgm.createTable("albums", {
    id: { type: "VARCHAR(50)", primaryKey: true }, //"album-Mk8AnmCp210PwT6B", album-16digitrandom
    name: { type: "TEXT", notNull: true },
    year: { type: "integer", notNull: true },
    created_at: { type: "TEXT", notNull: true },
    updated_at: { type: "TEXT", notNull: true },
  });
};

/**
 * Drops the albums table.
 * @param {import('node-pg-migrate').MigrationBuilder} pgm - The migration builder instance.
 */
exports.down = (pgm) => {
  pgm.dropTable("albums");
};
