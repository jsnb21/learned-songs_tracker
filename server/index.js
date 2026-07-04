const express = require('express');
const cors = require('cors');
const db = require("./db");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server running on localhost:${PORT}`);
});

app.get("/", (req, res) => {
    res.send("Song Tracker API")
})

app.get("/api/songs", (req, res) => {
    const songs = db
    .prepare("SELECT * FROM songs")
    .all();


    res.json(songs);

});

app.post("/api/songs", (req, res) => {
    const {
        title,
        artist,
        instrument,
        status,
        difficulty,
        date_learned,
        notes
    } = req.body;

    const stmt = db.prepare(`
        INSERT INTO songs
        (title, artist, instrument, status, difficulty, date_learned, notes)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        `);

    const result = stmt.run(
        title,
        artist,
        instrument,
        status,
        difficulty,
        date_learned,
        notes
    );

    res.json({
        message: "Song added", 
        id: result.lastInsertRowid
    })
})

app.get("/api/songs/:id", (req, res) => {
    
    const song = db
        .prepare("SELECT * FROM songs where id=?")
        .get (req.params.id);
    
    if (!song) {
        return res.status(404).json({
            message: "Song not found!"
        })
    }

    res.json(song);

})

app.put("/api/songs/:id", (req, res) => {
    const {
        title,
        artist,
        instrument,
        status,
        difficulty,
        date_learned,
        notes
    } = req.body;

    const result = db.prepare(`
        UPDATE songs
        SET    
            title=?,
            artist=?,
            instrument=?,
            status=?,
            difficulty=?,
            date_learned=?,
            notes=?
        WHERE id=?
        `).run(
            title,
            artist,
            instrument,
            status,
            difficulty,
            date_learned,
            notes,
            req.params.id
        );

        if (result.changes === 0) {
            return res.status(404).json({
                message: "Song not found"
            });
        }

        res.json({
            message: "Song updated"
        });

});

app.delete("/api/songs/:id", (req, res) => {
    
    const result = db.prepare(
        "DELETE FROM songs WHERE id=?"
    ).run(req.params.id);

    if (result.changes === 0) {
        return res.status(404).json({
            message: "Song not found!"
        });
    }

    res.json({
        message: "Song deleted"
    });

})