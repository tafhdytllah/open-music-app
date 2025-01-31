/**
 * Creates the playlists table.
 * @param {import('node-pg-migrate').MigrationBuilder} pgm - The migration builder instance.
 */
exports.up = (pgm) => {
  pgm.createTable("playlists", {
    id: { type: "VARCHAR(50)", primaryKey: true },
    name: { type: "VARCHAR(50)", notNull: true },
    owner: {
      type: "VARCHAR(50)",
      notNull: true,
      references: "users(id)",
      onDelete: "CASCADE",
    },
    created_at: { type: "TEXT", notNull: true },
    updated_at: { type: "TEXT", notNull: true },
  });
};

/**
 * Drops the playlists table.
 * @param {import('node-pg-migrate').MigrationBuilder} pgm - The migration builder instance.
 */
exports.down = (pgm) => {
  pgm.dropTable("playlists");
};
