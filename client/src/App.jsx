import { useEffect, useState } from "react";
import { getSongs, createSongs, updateSong, deleteSong } from "./api";
import SongList from "./components/SongList";
import SongForm from "./components/SongForm";

function App () {

    // Store songs
    const [songs, setSongs] = useState([]);

    // Loading state
    const [loading, setLoading] = useState(true);

    // Error state
    const [error, setError] = useState("");

    // Editing state

    const [editingSong, setEditingSong] = useState(null);

    async function loadSongs() {
        try {
          const data = await getSongs();
          setSongs(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
      }
    }

    useEffect(() => {
      loadSongs();
    }, []);

    async function handleAddSong(songData) {
      try {
        await createSongs(songData);
        const data = await getSongs();
        setSongs(data);
      } catch (err) {
        alert(err.message);
      }
    }

    async function handleUpdateSong(songData) {
      try{
        await updateSong(
          editingSong.id,
          songData
        );
      } catch (err) {
          alert(err.message);
      }
    }
    
    async function handleDeleteSong(id) {
        const confirmed = window.confirm(
          "Are you sure you want to delete this song?"
        );

        if (!confirmed) return;

        try {
          await deleteSong(id);

          await loadSongs();

        } catch (err) {
          alert(err.message);
        }
    }

    if (loading) {
      return <h2>Loading Songs...</h2>;
    }

    if (error) {
      return <h2>Error: {error}</h2>;
    }

    return (
      <div>
        <h1>Song Tracker</h1>

        <SongForm 
          onAddSong={handleAddSong} 
          editingSong={editingSong}
          onUpdateSong={handleUpdateSong}
        />

        <p>
          <strong>Total songs:</strong> {songs.length}
        </p>

        <SongList 
          songs = {songs} 
          onEdit = {setEditingSong}
          onDelete={handleDeleteSong}
        />
      </div>
    );
}

export default App;