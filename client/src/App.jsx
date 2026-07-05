import { useEffect, useState } from "react";
import { getSongs, createSongs, updateSong, deleteSong } from "./api";
import useDebounce from "./hooks/useDebounce";
import SongList from "./components/SongList";
import SongForm from "./components/SongForm";
import FilterBar from "./components/FilterBar";
import SongDetails from "./components/SongDetails";

function App () {

    // Store songs
    const [songs, setSongs] = useState([]);

    // Loading state
    const [loading, setLoading] = useState(true);

    // Error state
    const [error, setError] = useState("");

    // Editing state

    const [editingSong, setEditingSong] = useState(null);

    // Filtering
    const [filters, setFilters] = useState({
      search: "",
      instrument: "",
      status: ""
    })

    // Add Button Modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    // View Modal
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    // Selected song for details
    const [selectedSong, setSelectedSong] = useState(null);

    // Debounce Search
    const debouncedSearch = useDebounce(filters.search, 500);

    async function loadSongs() {
        try {
          const currentFilters = {
            ...filters,
            search: debouncedSearch
          };

          const data = await getSongs(currentFilters);

          setSongs(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
      }
    }

    useEffect(() => {
      loadSongs();
    }, [
        filters.instrument,
        filters.status,
        debouncedSearch
    ]);

    if(isModalOpen){
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    function handleSelectSong(song){
      setSelectedSong(song);
      setIsDetailsOpen(true);
    }

    async function handleAddSong(songData) {
      try {

        const newSong = await createSongs(songData)

        setSongs(prev => [...prev, newSong])

      } catch (err) {
        alert(err.message);
      }
    }

    async function handleEditSong(song) {
      setIsDetailsOpen(false);
      setEditingSong(song);
      setIsModalOpen(true);
    }

    async function handleUpdateSong(songData) {
      try{
        const updatedSong = await updateSong(
          editingSong.id,
          songData
        );

        setSongs(prev =>
          prev.map(song =>
            song.id === updatedSong.id
              ? updatedSong
              : song
          )
        );
      
      setEditingSong(null);

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

          setSongs(prev =>
            prev.filter(song => song.id !== id)
          );

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
      <div className="container">
        <header className="header">
          <h1>Song Tracker</h1>
        <p>
          Track your learning progress.
        </p>
        </header>
        
        <FilterBar 
          filters={filters}
          setFilters={setFilters}
        />

        <div className="header-actions">
          <button 
            className="primary-btn"
            onClick={() => {
              setEditingSong(null);
              setIsModalOpen(true);
            }}
          >
            + Add Song
          </button>
        </div>
        { isModalOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <SongForm 
                onAddSong={handleAddSong} 
                editingSong={editingSong}
                onUpdateSong={handleUpdateSong}
                onClose={() => {
                  setIsModalOpen(false);
                  setEditingSong(null);
                }}
              />
            </div>
          </div>
        )}

        {isDetailsOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <SongDetails
                song={selectedSong}
                onEdit={handleEditSong}
                onDelete={handleDeleteSong}
                onClose={() => {
                  setIsDetailsOpen(false);
                  setSelectedSong(null);
                }}
              />
            </div>
          </div>
        )}
        
        <SongList 
          songs = {songs} 
          onEdit={handleEditSong}
          onDelete={handleDeleteSong}
          onSelect = {handleSelectSong}
        />
      </div>
    );
}

export default App;