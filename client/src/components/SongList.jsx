import SongCard from "./SongCard";
import "./SongList.css"

function SongList({ songs, onEdit, onDelete }) {
    if (songs.length === 0) {
        return (
            <div className="empty-state">
                <h3>No songs yet.</h3>
                <p>Add your first song!</p>
            </div>
        )
    }

    return (

        <section className="song-list">

            <div className="song-list-header">
                <h2>Your Songs</h2>
                <span>{songs.length} song(s)</span>
            </div>

            <div className="song-grid">
            <ul>
                {songs.map((song) => (
                    <SongCard
                        key={song.id}
                        song={song}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))}
            </ul>
        </div>
        </section>
    )

}

export default SongList;