import "./SongDetails.css"

function SongDetails({
    song,
    onEdit,
    onDelete,
    onClose,
}) {
    if (!song) return null 

    return (
        <>
        <div className="song-details">
            
            <h2>{song.title}</h2>
            
            <p className="artist">{song.artist}</p>

            <hr />

            <div className="detail-row">
                <strong>Instrument</strong>
                <span>{song.instrument}</span>
            </div>

            <div className="detail-row">
                <strong>Status</strong>
                <span>{song.status}</span>
            </div>

            <div className="detail-row">
                <strong>Difficulty</strong>
                <span>{song.difficulty}</span>
            </div>

            <div className="detail-row">
                <strong>Date Learned</strong>
                <span>{song.learned}</span>
            </div>

            <div className="detail-row">
                <strong>Status</strong>
                <span>{song.status}</span>
            </div>

            <div className="notes-section">
                <h3>Notes</h3>

                <div className="notes-box">
                    {song.notes || "No notes."} 
                </div>

            </div>

            <div className="details-buttons">
                <button
                    onClick={() => onEdit(song)}
                >
                    Edit
                </button>

                <button
                    onClick={() => onDelete(song.id)}
                >
                    Delete
                </button>

                <button
                    onClick={onClose}
                >
                    Close
                </button>

            </div>
        </div>
        </>
    );

}

export default SongDetails;