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
    song_id: { type: "VARCHAR(50)", notNull: true },
    user_id: { type: "VARCHAR(50)", notNull: true },
    action: { type: "TEXT", notNull: true },
    time: { type: "TEXT", notNull: true },
  });
};

/**
 * Drops the playlist_song_activities table.
 * @param {import('node-pg-migrate').MigrationBuilder} pgm - The migration builder instance.
 */
exports.down = (pgm) => {
  pgm.dropTable("playlist_song_activities");
};
