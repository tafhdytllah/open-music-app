truncate albums,
songs,
users,
authentications,
playlists,
playlist_songs,
playlist_song_activities,
collaborations CASCADE;

--1. Tabel albums
-- Create
INSERT INTO
    albums (
        id,
        name,
        year,
        created_at,
        updated_at
    )
VALUES (
        'album-1',
        'Album 1',
        2021,
        '2021-01-01T00:00:00Z',
        '2021-01-01T00:00:00Z'
    );

-- Read
SELECT * FROM albums WHERE id = 'album-1';

-- Update
UPDATE albums SET name = 'Updated Album 1' WHERE id = 'album-1';

--2. Tabel songs
-- Create
INSERT INTO
    songs (
        id,
        title,
        year,
        genre,
        performer,
        duration,
        album_id,
        created_at,
        updated_at
    )
VALUES (
        'song-1',
        'Song 1',
        2021,
        'Pop',
        'Performer 1',
        300,
        'album-1',
        '2021-01-01T00:00:00Z',
        '2021-01-01T00:00:00Z'
    );

-- Read
SELECT * FROM songs WHERE id = 'song-1';

-- Update
UPDATE songs SET title = 'Updated Song 1' WHERE id = 'song-1';

--3. Tabel users
-- Create
INSERT INTO
    users (
        id,
        username,
        password,
        fullname,
        created_at,
        updated_at
    )
VALUES (
        'user-1',
        'user1',
        'password1',
        'User One',
        '2021-01-01T00:00:00Z',
        '2021-01-01T00:00:00Z'
    );

-- Read
SELECT * FROM users WHERE id = 'user-1';

-- Update
UPDATE users SET fullname = 'Updated User One' WHERE id = 'user-1';

--4. Tabel authentications
-- Create
INSERT INTO authentications (token) VALUES ('token-1');

-- Read
SELECT * FROM authentications WHERE token = 'token-1';

--5. Tabel playlists
-- Create
INSERT INTO
    playlists (
        id,
        name,
        owner,
        created_at,
        updated_at
    )
VALUES (
        'playlist-1',
        'Playlist 1',
        'user-1',
        '2021-01-01T00:00:00Z',
        '2021-01-01T00:00:00Z'
    );

-- Read
SELECT * FROM playlists WHERE id = 'playlist-1';

-- Update
UPDATE playlists
SET
    name = 'Updated Playlist 1'
WHERE
    id = 'playlist-1';

--6. Tabel playlist_songs
-- Create
INSERT INTO
    playlist_songs (id, playlist_id, song_id)
VALUES (
        'playlist_song-1',
        'playlist-1',
        'song-1'
    );

-- Read
SELECT * FROM playlist_songs WHERE id = 'playlist_song-1';

--7. Tabel collaborations
-- Create
INSERT INTO
    collaborations (id, playlist_id, user_id, created_at, updated_at)
VALUES (
        'collaboration-1',
        'playlist-1',
        'user-1',
        '2021-01-01T00:00:00Z',
        '2021-01-01T00:00:00Z'
    );

-- Read
SELECT * FROM collaborations WHERE id = 'collaboration-1';

--8. Tabel playlist_song_activities
-- Create
INSERT INTO
    playlist_song_activities (
        id,
        playlist_id,
        song_id,
        user_id,
        action,
        time,
        created_at
    )
VALUES (
        'activity-1',
        'playlist-1',
        'song-1',
        'user-1',
        'add',
        '2021-01-01T00:00:00Z',
        '2021-01-01T00:00:00Z'
    );

-- Read
SELECT * FROM playlist_song_activities WHERE id = 'activity-1';

-- Delete
DELETE FROM playlist_song_activities WHERE id = 'activity-1';

DELETE FROM collaborations WHERE id = 'collaboration-1';

DELETE FROM playlist_songs WHERE id = 'playlist_song-1';

DELETE FROM playlists WHERE id = 'playlist-1';

DELETE FROM authentications WHERE token = 'token-1';

DELETE FROM users WHERE id = 'user-1';

DELETE FROM songs WHERE id = 'song-1';

DELETE FROM albums WHERE id = 'album-1';