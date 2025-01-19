## Song API Spec

### Create Song

Description : Add new song

- Endpoint : POST /songs

Request Header :

- Content-Type : "application/json"

Request Body :

```
{
  "title": "Life in Technicolor", //string
  "year": 2008, //number
  "genre": "Indie", //string
  "performer": "Coldplay", //string
  "duration": 120, //number? (optional)
  "albumId": "album-Mk8AnmCp210PwT6B" //string? (optional)
}
```

Response Body (201 CREATED) :

```
{
  "status": "success",
  "data": {
    "songId": "song_id"
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

### List Song

Description : Get Song List

- Endpoint : GET /songs

Request Body :

- Content-Type : "application/json"

Response Body (200 OK) :

```
{
  "status": "success",
  "data": {
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

### GET Song

Description : Get Song by Id

- Endpoint : GET /songs/{songId}

Request Body :

- Content-Type : "application/json"

Response Body (200 OK) :

```
{
  "status": "success",
  "data": {
    "song": {
      "id": "song-Qalokam7L8WKf74l",
      "title": "Lost!",
      "performer": "Coldplay"
    }
  }
}
```

Response Body (404 NOT FOUND) :

```
{
  "status": "fail",
  "message": "error message resource not found"
}
```

### Search Song

Descrption : Searching song with title or performer

- Endpoint : GET /songs

Query Param :

- title : string, song title, using filter, optional
- performer : string, song performer, using filter, optional

Request Hedaer :

- Content-Type : "application/json"

Response Body (200 OK) :

```
{
  "status": "success",
  "data": {
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

### Update Song

Description : Update song by id song

- Endpoint : PUT /songs/{songId}

Request Header :

- Content-Type : "application/json"

Request Body :

```
{
  "title": "Life in Technicolor", //string
  "year": 2008, //number
  "genre": "Indie", //string
  "performer": "Coldplay", //string
  "duration": 120, //number? (optional)
  "albumId": "album-Mk8AnmCp210PwT6B" //string? (optional)
}
```

Response Body (200 OK) :

```
{
  "status": "success",
  "message": "message song updated"
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

### Remove Song

Description : Delete Song by Id

- Endpoint : DELETE /songs/{songId}

Request Body :

- Content-Type : "application/json"

Response Body (200 OK) :

```
{
  "status": "success",
  "message": "message song updated"
}
```

Response Body (404 NOT FOUND) :

```
{
  "status": "fail",
  "message": "error message resource not found"
}
```
