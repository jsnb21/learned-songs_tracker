import { useEffect, useState } from "react";
import { getSongs } from "./api";

function App () {

    // Store songs
    const [songs, setSongs] = useState([]);

    // Loading state
    const [loading, setLoading] = useState(true);

    // Error state
    const [error, setError] = useState("");
    
    useEffect (() => {

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

      loadSongs();

    }, []);

    if (loading) {
      return <h2>Loading Songs...</h2>
    }

    if (error) {
      return <h2>Error: {error}</h2>;
    }

    return (
      <div>
        <h1>Song Tracker</h1>

        <p>Total songs: {songs.length}</p>

        {songs.length === 0 ? (
          <div>
            <h3>No Songs yet.</h3>
            <p>Add your first song to get started!</p>
          </div>
        ) : (
          <ul>
            {songs.map((song) => 
              <li key={song.id}>
                <strong>{song.title}</strong>

                <br />
                Artist: {song.artist}
                <br />
                Instrument: {song.instrument}
                <br />
                Status: {song.status}
                <br />
                Difficulty: {song.difficulty}
                <br />
                Date Learned: {song.date_learned || "N/A"}
                <br />
                Notes: {song.notes}
              </li>
            )}
          </ul>
        )}

      </div>
    )

}

export default App;