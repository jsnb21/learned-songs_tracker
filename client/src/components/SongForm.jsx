import { useState, useEffect } from "react"
import "./SongForm.css";

const emptyForm = {
    title: "",
    artist: "",
    instrument: "Guitar",
    status: "Learning",
    difficulty: 1,
    date_learned: "",
    notes: ""
};

function SongForm({
    editingSong,
    onAddSong,
    onUpdateSong,
    onClose
}) {

    const [formData, setFormData] = useState(emptyForm);

    // Fill form when editing

    useEffect(() =>{
        if (editingSong){
            setFormData(editingSong);
        } else {
            setFormData(emptyForm);
        }
    }, [editingSong]);

    function handleChange(e){
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: name === "difficulty" ? Number(value) : value
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if(editingSong){
            await onUpdateSong(formData);
        } else {
            await onAddSong(formData);
        }

        setFormData(emptyForm);
        onClose();
    }

    return (
        <form className="song-form" onSubmit={handleSubmit}>
            <h2>
                {editingSong
                ? "Edit Song"

                : "Add Song"
                }
            </h2>

            <div className="form-group">
                <label>Title</label>
                <br />
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label>Artist</label>
                <br />
                <input
                    type="text"
                    name="artist"
                    value={formData.artist}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label>Instrument</label>
                <br />
                <select
                    name="instrument"
                    value={formData.instrument}
                    onChange={handleChange}
                >
                    <option>Guitar</option>
                    <option>Bass</option>
                    <option>Piano</option>
                    <option>Drums</option>
                    <option>Vocals</option>
                </select>
            </div>

            <div className="form-group">
                <label>Status</label>
                <br />
                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                >
                    <option>Learning</option>
                    <option>Mastered</option>
                    <option>Rusty</option>
                </select>
            </div>

            <div className="form-group">
                <label>Difficulty (1-5)</label>
                <br />
                <input 
                    type="number"
                    name="difficulty"
                    min="1"
                    max="5"
                    value={formData.difficulty}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Date Learned</label>
                <br />
                <input
                    type="date"
                    name="date_learned"
                    value={formData.date_learned}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label>Notes</label>
                <br />
                <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                />
            </div>

            <br />
            
            <div className="form-buttons">
                <button
                    type="button"
                    className="cancel-btn"
                    onClick={onClose}
                >
                    Cancel
                </button>
            
            <button 
                type="submit"
                className="submit-btn" 
            >
                {editingSong
                ? "Update Song"
                
                : "Add Song"
                
                }
            </button>

            </div>
        </form>
    );
}

export default SongForm;