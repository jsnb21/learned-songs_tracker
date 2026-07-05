function SongDetails({
    song,
    onEdit,
    onDelete,
    onClose,
}) {
    if (!song) return null 

    return (
        <>
            <h2>{song.title}</h2>
            <p>{song.artist}</p>

            <hr />

            <p>
                <strong>Instrument:</strong> {song.instrument}
            </p>

            <p>
                <strong>Status:</strong> {song.status}
            </p>

            <p>
                <strong>Difficulty:</strong> {song.difficulty}/5
            </p>

            <p>
                <strong>Date Learned:</strong>

                {song.date_learned || "not learned"}

            </p>

            <h3>Notes</h3>

            <p>
                    {song.notes || "No notes."}
            </p>

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

        </>
    );

}

export default SongDetails;