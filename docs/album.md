## Album API Spec

### Create Album

Description: Add new album

- Endpoint : POST /albums

Request Header :

- Content-Type : "application/json"

Request Body :

```
{
  "name": "Viva la Vida", //string
  "year": 2008 //number
}
```

Response Body (201 CREATED) :

```
{
  "status": "success",
  "data": {
    "album": {
      "id": "album-Mk8AnmCp210PwT6B",
      "name": "Viva la Vida",
      "year": 2008
    }
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

### Get Album

Description: Find album by id

- Endpoint : GET /albums/{albumId}

Request Header :

- Content-Type : "application/json"

Response Body (200 OK) :

```
{
  "status": "success",
  "data": {
    "album": {
      "id": "album-Mk8AnmCp210PwT6B",
      "name": "Viva la Vida",
      "year": 2008,
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

Response Body (404 NOT FOUND) :

```
{
  "status": "fail",
  "message": "error message resource not found"
}
```

### Update Album

Description: Update album by id

- Endpoint : PUT /albums/{albumId}

Request Header :

- Content-Type : "application/json"

Request Body :

```
{
  "name": "Viva la Vida",
  "year": 2008
}
```

Response Body (200 OK) :

```
{
  "status": "success",
  "message": "message data album updated"
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

### Remove Album

Description: Delete album by id

- Endpoint : DELETE /albums/{albumId}

Request Header :

- Content-Type : "application/json"

Response Body (200 OK) :

```
{
  "status": "success",
  "message": "message album deleted"
}
```

Response Body (404 NOT FOUND) :

```
{
  "status": "fail",
  "message": "error message resource not found"
}
```
