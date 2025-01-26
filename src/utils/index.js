const mapAlbumDbtoAlbumModel = ({ id, name, year }) => ({
  id,
  name,
  year,
});

const mapSongDbtoSongModel = ({ id, title, performer }) => ({
  id,
  title: title,
  performer: performer,
});

module.exports = { mapAlbumDbtoAlbumModel, mapSongDbtoSongModel };
