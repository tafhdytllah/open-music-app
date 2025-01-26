/**
 * Maps album database object to album model.
 * @param {Object} param - The album database object.
 * @param {string} param.id - The ID of the album.
 * @param {string} param.name - The name of the album.
 * @param {number} param.year - The year of the album.
 * @returns {Object} The album model.
 */
const mapAlbumDbtoAlbumModel = ({ id, name, year }) => ({
  id,
  name,
  year,
});

/**
 * Maps song database object to song model.
 * @param {Object} param - The song database object.
 * @param {string} param.id - The ID of the song.
 * @param {string} param.title - The title of the song.
 * @param {string} param.performer - The performer of the song.
 * @returns {Object} The song model.
 */
const mapSongDbtoSongModel = ({ id, title, performer }) => ({
  id,
  title: title,
  performer: performer,
});

module.exports = { mapAlbumDbtoAlbumModel, mapSongDbtoSongModel };
