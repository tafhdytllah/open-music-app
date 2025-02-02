exports.up = (pgm) => {
  pgm.createTable("user_album_likes", {
    id: { type: "VARCHAR(50)", primaryKey: true },
    user_id: {
      type: "VARCHAR(50)",
      notNull: true,
      references: "users(id)",
      onDelete: "CASCADE",
    },
    album_id: {
      type: "VARCHAR(50)",
      notNull: true,
      references: "albums(id)",
      onDelete: "CASCADE",
    },
    created_at: { type: "TEXT", notNull: true },
    updated_at: { type: "TEXT", notNull: true },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("user_album_likes");
};
