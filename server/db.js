const Database = require('better-sqlite3')
const db = new Database('songs.db');

db.exec(`
    CREATE TABLE IF NOT EXISTS songs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL COLLATE NOCASE,
        artist TEXT NOT NULL COLLATE NOCASE,
        instrument TEXT NOT NULL COLLATE NOCASE,
        status TEXT NOT NULL COLLATE NOCASE,
        difficulty TEXT COLLATE NOCASE,
        date_learned TEXT COLLATE NOCASE,
        notes TEXT
    )
    `);

module.exports = db;