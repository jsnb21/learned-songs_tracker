import { useEffect, useState } from "react";
import { getSongs } from "./api";
import SongList from "./components/SongList";

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

        <p>
          <strong>Total songs:</strong> {songs.length}
        </p>

        <SongList songs={songs}/>

      </div>
    )  
}

export default App;