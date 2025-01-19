const mapAlbumDbtoAlbumModel = ({
  id,
  name,
  year,
  created_at,
  updated_at,
}) => ({
  id,
  name,
  year,
});

const mapSongDbtoSongModel = ({
  id,
  album_id,
  title,
  year,
  genre,
  performer,
  duration,
  created_at,
  updated_at,
}) => ({
  id,
  title: title,
  performer: performer,
});

module.exports = { mapAlbumDbtoAlbumModel, mapSongDbtoSongModel };
