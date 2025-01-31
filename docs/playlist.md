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

### GET Playlist Activities

Description : mencatat riwayat menambah atau menghapus lagu dari playlist oleh pengguna atau kolaborator

- Endpoint : GET /playlists/{id}/activities

Request Body :

- Content-Type : "application/json"

Response Body (200 OK) :

```
{
  "status": "success",
  "data": {
    "playlistId": "playlist-Mk8AnmCp210PwT6B",
    "activities": [
      {
        "username": "dicoding",
        "title": "Life in Technicolor",
        "action": "add",
        "time": "2021-09-13T08:06:20.600Z"
      },
      {
        "username": "dicoding",
        "title": "Centimeteries of London",
        "action": "add",
        "time": "2021-09-13T08:06:39.852Z"
      },
      {
        "username": "dimasmds",
        "title": "Life in Technicolor",
        "action": "delete",
        "time": "2021-09-13T08:07:01.483Z"
      }
    ]
  }
}
```

### POST export music playlist

Description: Export Songs from Playlist Feature

- Endpoint : POST /export/playlists/{playlistId}

Request Header :

- Content-Type : "application/json"

Request Body :

```
{
  "targetEmail": string
}
```

Response Body (201 CREATED) :

```
{
  "status": "success",
  "message": "Permintaan Anda sedang kami proses",
}
```

Ketentuan:

- Wajib menggunakan message broker dengan menggunakan RabbitMQ.
  - Nilai host server RabbitMQ wajib menggunakan environment variable RABBITMQ_SERVER
- Hanya pemilik Playlist yang boleh mengekspor lagu.
- Wajib mengirimkan program consumer.
- Hasil ekspor berupa data json.
- Dikirimkan melalui email menggunakan nodemailer.
  - Kredensial user dan password email pengirim wajib menggunakan environment variable SMTP_USER dan SMTP_PASSWORD.
  - Serta, nilai host dan port dari server SMTP juga wajib menggunakan environment variable SMTP_HOST dan SMTP_PORT.

Struktur data JSON yang diekspor adalah seperti ini:

```
{
  "playlist": {
    "id": "playlist-Mk8AnmCp210PwT6B",
    "name": "My Favorite Coldplay Song",
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
```
