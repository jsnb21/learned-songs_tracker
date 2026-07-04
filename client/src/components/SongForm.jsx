import { useState, useEffect } from "react"

function SongForm({ onAddSong, editingSong, onUpdateSong }) {

    const [title, setTitle] = useState("");
    const [artist, setArtist] = useState("");
    const [instrument, setInstrument] = useState("Guitar");
    const [status, setStatus] = useState("Learning");
    const [difficulty, setDifficulty] = useState(1);
    const [dateLearned, setDateLearned] = useState("");
    const [notes, setNotes] = useState("");

    useEffect(() => {
        if (editingSong){
            setTitle(editingSong.title);
            setArtist(editingSong.artist);
            setInstrument(editingSong.instrument);
            setStatus(editingSong.status);
            setDifficulty(editingSong.difficulty);
            setDateLearned(editingSong.date_learned);
            setNotes(editingSong.notes);
        }
    }, [editingSong]);

    async function handleSubmit(event){

        event.preventDefault();

        const newSong = {
            title,
            artist,
            instrument,
            status,
            difficulty,
            date_learned: dateLearned,
            notes
        };

        if(editingSong){
            await onUpdateSong(newSong);
        } else {
            await onAddSong(newSong);
        }

        // Clear Form
        setTitle("");
        setArtist("");
        setInstrument("");
        setStatus("");
        setDifficulty(1);
        setDateLearned("");
        setNotes("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>
                {editingSong
                ? "Edit Song"

                : "Add Song"
                }
            </h2>

            <div>
                <label>Title</label>
                <br />
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>

            <div>
                <label>Artist</label>
                <br />
                <input
                    type="text"
                    value={artist}
                    onChange={(e) => setArtist(e.target.value)}
                    required
                />
            </div>

            <div>
                <label>Instrument</label>
                <br />
                <select
                    value={instrument}
                    onChange={(e) => setInstrument(e.target.value)}
                >
                    <option>Guitar</option>
                    <option>Bass</option>
                    <option>Piano</option>
                    <option>Drums</option>
                    <option>Vocals</option>
                </select>
            </div>

            <div>
                <label>Status</label>
                <br />
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option>Learning</option>
                    <option>Mastered</option>
                    <option>Rusty</option>
                </select>
            </div>

            <div>
                <label>Difficulty (1-5)</label>
                <br />
                <input 
                    type="number"
                    min="1"
                    max="5"
                    value={difficulty}
                    onChange={(e) => setDifficulty(Number(e.target.value))}
                />
            </div>

            <div>
                <label>Date Learned</label>
                <br />
                <input
                    type="date"
                    value={dateLearned}
                    onChange={(e) => setDateLearned(e.target.value)}
                />
            </div>

            <div>
                <label>Notes</label>
                <br />
                <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                />
            </div>

            <br />

            <button type="submit">
                {editingSong
                ? "Update Song"
                
                : "Add Song"
                
                }
            </button>
        </form>
    );
}

export default SongForm;