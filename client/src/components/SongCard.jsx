function SongCard({ song, onEdit, onDelete }) {
    return (
        <li style={{ marginBottom: "20px" }}>

            <strong>{song.title}</strong>

            <br />

            Artist: {song.artist}

            <br />

            Instrument: {song.instrument}

            <br />

            Status: {song.status}

            <br />

            Difficulty: {song.difficulty}/5

            <br />

            Date Learned: {song.data_learned || "N/A"}

            <br />

            Notes: {song.notes || "None"}

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

        </li>
    )
}

export default SongCard;