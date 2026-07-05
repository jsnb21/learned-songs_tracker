import "./SongCard.css"

function SongCard({ song, onSelect }) {
    return (
        <div 
            className={`song-card ${song.status.toLowerCase()}`}
            onClick={() => onSelect(song)}
        >
        
            <div className="song-card-header">
                <h3>{song.title}</h3>

                <span className={`status-badge ${song.status.toLowerCase()}`}>
                    {song.status}
                </span>
            </div>

            <p className="song-artist">
                {song.artist}
            </p>

            <div className="song-info">
                <div>
                    <strong>Instrument</strong>
                    <span>{song.instrument}</span>
                </div>

                <div>
                    <strong>Difficulty</strong>
                    <span>{song.difficulty}/5</span>
                </div>
            </div>

        </div>
    )
}

export default SongCard;