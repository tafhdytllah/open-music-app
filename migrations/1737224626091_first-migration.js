exports.up = (pgm) => {
  pgm.createTable('albums', {
    id: { type: 'VARCHAR(25)', primaryKey: true }, //"album-Mk8AnmCp210PwT6B", album-16digitrandom
    name: { type: 'TEXT', notNull: true },
    year: { type: 'integer', notNull: true },
    created_at: { type: 'TEXT', notNull: true },
    updated_at: { type: 'TEXT', notNull: true },
  });

  pgm.createTable('songs', {
    id: { type: 'VARCHAR(25)', primaryKey: true }, //"song-Qbax5Oy7L8WKf74l", song-16digitrandom
    album_id: {
      type: 'VARCHAR(25)',
      references: 'albums(id)',
      onDelete: 'CASCADE',
    }, //"album-Mk8AnmCp210PwT6B", album-16digitrandom
    title: { type: 'TEXT', notNull: true },
    year: { type: 'integer', notNull: true },
    genre: { type: 'TEXT', notNull: true },
    performer: { type: 'TEXT', notNull: true },
    duration: { type: 'integer' },
    created_at: { type: 'TEXT', notNull: true },
    updated_at: { type: 'TEXT', notNull: true },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('songs');
  pgm.dropTable('albums');
};
