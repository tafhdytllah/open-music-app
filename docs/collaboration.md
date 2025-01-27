## Collaboration API Spec

Hak akses kolaborator
Ketika user ditambahkan sebagai kolaborator playlist oleh pemilik playlist. Maka hak akses user tersebut terhadap playlist adalah:

Playlist tampil pada permintaan GET /playlists.
Dapat menambahkan lagu ke dalam playlist.
Dapat menghapus lagu dari playlist.
Dapat melihat daftar lagu yang ada di playlist.
Dapat melihat aktifitas playlist (jika menerapkan kriteria opsional ke-2).

### Create Collaboration

Description: Add new Playlist Collaboration

- Endpoint : POST /collaborations

Request Header :

- Content-Type : "application/json"

Request Body :

```
{
  "playlistId": "id playlist", //string
  "userId": "id user", // string
}
```

Response Body (201 CREATED) :

```
{
  "status": "success",
  "data": {
    "collaborationId": "id collaboration"
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

### Delete Collaboration

Description: Delete Playlist Collaboration

- Endpoint : DELETE /collaborations

Request Header :

- Content-Type : "application/json"

Request Body :

```
{
  "playlistId": "id playlist", //string
  "userId": "id user", // string
}
```

Response Body (200 OK) :

```
{
  "status": "success",
  "data": "Pesan berhasil menghapus collaboration"
}
```

Response Body (404 NOT FOUND) :

```
{
  "status": "fail",
  "message": "error message resource not found"
}
```
