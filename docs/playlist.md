## Playlist API Spec

Ketentuan:

Playlist merupakan resource yang dibatasi (restrict). Untuk mengaksesnya membutuhkan access token.
Playlist yang muncul pada GET /playlists hanya yang ia miliki saja.
Hanya owner playlist (atau kolabolator) yang dapat menambahkan, melihat, dan menghapus lagu ke/dari playlist.
songId dimasukkan/dihapus ke/dari playlist wajib bernilai id lagu yang valid.

Objek Playlist :

```
{
    "id": "playlist-Qbax5Oy7L8WKf74l",
    "name": "Lagu Indie Hits Indonesia",
    "owner": "user-Qbax5Oy7L8WKf74l",
}
```

Keterangan:

Properti owner merupakan user id dari pembuat playlist. Anda bisa mendapatkan nilainya melalui artifacts payload JWT.

### Create Playlist

Description: Add new Playlist

- Endpoint : POST /playlists

Request Header :

- Content-Type : "application/json"
- Authorization : "Bearer (token)"

Request Body :

```
{
  "name": "nama playlist", //string
}
```

Response Body (201 CREATED) :

```
{
  "status": "success",
  "data": {
    "playlistId": "playlist_id"
  }
}
```

Response Body (400 BAD REQUEST) :

```
{
  "status": "fail",
  "message": "error message payload validation"
}
```

Response Body (500 INTERNAL SERVER ERROR) :

```
{
  "status": "fail",
  "message": "error message internal error server"
}
```

### List Playlists

Description: Show list of playlist

- Endpoint : GET /playlists

Request Header :

- Content-Type : "application/json"

Response Body (200 OK) :

```
{
  "status": "success",
  "data": {
    "playlists": [
        {
            "id": "playlist-Qbax5Oy7L8WKf74l",
            "name": "Lagu Indie Hits Indonesia",
            "username": "dicoding"
        },
        {
             "id": "playlist-lmA4PkM3LseKlkmn",
             "name": "Lagu Untuk Membaca",
             "username": "dicoding"
        }
    ]
  }
}
```

### Delete playlist

Description: Refresh Access Token

- Endpoint : DELETE /playlists/{playlistId}

Request Header :

- Content-Type : "application/json"

Response Body (200 OK) :

```
{
  "status": "success",
  "message": "message delete success"
}
```

Response Body (404 NOT FOUND) :

```
{
  "status": "fail",
  "message": "error message resource not found"
}
```

### Insert Song to Playlist

Description: Add song to playlist

- Endpoint : POST /playlists/{playlistId}/songs

Request Header :

- Content-Type : "application/json"

Request Body :

```
{
  "songId": "id song", //string
}
```

Response Body (201 CREATED) :

```
{
  "status": "success",
  "message": "sucess message"
}
```

Response Body (400 BAD REQUEST) :

```
{
  "status": "fail",
  "message": "error message payload validation"
}
```

Response Body (404 NOT FOUND) :

```
{
  "status": "fail",
  "message": "error message resource not found"
}
```

### List songs in playlist

Description: Show song in playlist

- Endpoint : GET /playlists/{playlistId}/songs

Request Header :

- Content-Type : "application/json"

Request Body :

```
{
  "status": "success",
  "data": {
    "playlist": {
      "id": "playlist-Mk8AnmCp210PwT6B",
      "name": "My Favorite Coldplay",
      "username": "dicoding",
      "songs": [
        {
          "id": "song-Qbax5Oy7L8WKf74l",
          "title": "Life in Technicolor",
          "performer": "Coldplay"
        },
        {
          "id": "song-poax5Oy7L8WKllqw",
          "title": "Centimeteries of London",
          "performer": "Coldplay"
        },
        {
          "id": "song-Qalokam7L8WKf74l",
          "title": "Lost!",
          "performer": "Coldplay"
        }
      ]
    }
  }
}

```

### Delete Song From Playlist

Description: Remove song from playlist

- Endpoint : DELETE /playlists/{playlistId}/songs

Request Header :

- Content-Type : "application/json"

Request Body :

```
{
  "songId": "id-song", //string
}
```

Response Body (200 OK) :

```
{
  "status": "success",
  "message": "sucess message"
}
```

Response Body (404 NOT FOUND) :

```
{
  "status": "fail",
  "message": "error message payload validation"
}
```
