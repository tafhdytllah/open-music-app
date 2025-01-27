/**
 * Creates the playlist_song_activities table.
 * @param {import('node-pg-migrate').MigrationBuilder} pgm - The migration builder instance.
 */
exports.up = (pgm) => {
  pgm.createTable("playlist_song_activities", {
    id: { type: "VARCHAR(50)", primaryKey: true },
    playlist_id: {
      type: "VARCHAR(50)",
      notNull: true,
      references: "playlists(id)",
      onDelete: "CASCADE",
    },
    song_id: {
      type: "VARCHAR(50)",
      notNull: true,
      references: "songs(id)",
      onDelete: "CASCADE",
    },
    user_id: {
      type: "VARCHAR(50)",
      notNull: true,
      references: "users(id)",
      onDelete: "CASCADE",
    },
    action: { type: "TEXT", notNull: true },
    time: { type: "TEXT", notNull: true },
    created_at: { type: "TEXT", notNull: true },
  });

  pgm.addConstraint(
    "playlist_song_activities",
    "unique_playlist_id_and_song_id_and_user_id",
    "UNIQUE(playlist_id, song_id, user_id)",
  );
};

/**
 * Drops the playlist_song_activities table.
 * @param {import('node-pg-migrate').MigrationBuilder} pgm - The migration builder instance.
 */
exports.down = (pgm) => {
  pgm.dropTable("playlist_song_activities");
};
