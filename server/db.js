const Database = require('better-sqlite3')
const db = new Database('songs.db');

db.exec(`
    CREATE TABLE IF NOT EXISTS songs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        artist TEXT NOT NULL,
        instrument TEXT NOT NULL,
        status TEXT NOT NULL,
        difficulty TEXT,
        date_learned TEXT,
        notes TEXT
    )
    `);

module.exports = db;