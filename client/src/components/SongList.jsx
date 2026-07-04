import SongCard from "./SongCard";

function SongList({ songs, onEdit }) {
    if (songs.length === 0) {
        return (
            <div>
                <h3>No songs yet.</h3>
                <p>Add your first song!</p>
            </div>
        )
    }

    return (
        <ul>
            {songs.map((song) => (
                <SongCard
                    key={song.id}
                    song={song}
                    onEdit={onEdit}
                />
            ))}
        </ul>
    )

}

export default SongList;