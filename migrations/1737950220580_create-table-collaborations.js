/**
 * Creates the collaborations table.
 * @param {import('node-pg-migrate').MigrationBuilder} pgm - The migration builder instance.
 */
exports.up = (pgm) => {
  pgm.createTable("collaborations", {
    id: { type: "VARCHAR(50)", primaryKey: true },
    playlist_id: {
      type: "VARCHAR(50)",
      notNull: true,
      references: "playlists(id)",
      onDelete: "CASCADE",
    },
    user_id: {
      type: "VARCHAR(50)",
      notNull: true,
      references: "users(id)",
      onDelete: "CASCADE",
    },
    created_at: { type: "TEXT", notNull: true },
    updated_at: { type: "TEXT", notNull: true },
  });

  pgm.addConstraint(
    "collaborations",
    "unique_playlist_id_and_user_id",
    "UNIQUE(playlist_id, user_id)",
  );
};

/**
 * Drops the collaborations table.
 * @param {import('node-pg-migrate').MigrationBuilder} pgm - The migration builder instance.
 */
exports.down = (pgm) => {
  pgm.dropTable("collaborations");
};
