/**
 * Creates the playlist_songs table.
 * @param {import('node-pg-migrate').MigrationBuilder} pgm - The migration builder instance.
 */
exports.up = (pgm) => {
  pgm.createTable("playlist_songs", {
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
  });

  pgm.addConstraint(
    "playlist_songs",
    "unique_playlist_id_and_song_id",
    "UNIQUE(playlist_id, song_id)",
  );
};

/**
 * Drops the playlist_songs table.
 * @param {import('node-pg-migrate').MigrationBuilder} pgm - The migration builder instance.
 */
exports.down = (pgm) => {
  pgm.dropTable("playlist_songs");
};
