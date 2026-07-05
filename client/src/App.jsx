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

    // Filtering
    const [filters, setFilters] = useState({
      search: "",
      instrument: "",
      status: ""
    })

    const [modal, setModal] = useState({
        type: null,
        song: null
    })

    function openAddModal() {
      setModal({
        type: "form",
        song: null
      });
    }

    function openEditModal(song) {
      setModal({
        type: "form",
        song
      })
    }

    function openDetailsModal(song) {
      setModal({
        type: "details",
        song
      })
    }

    function closeModal() {
      setModal({
        type: null,
        song: null
      })
    }


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

    useEffect(() => {
      document.body.style.overflow =
        modal.type ? "hidden" : "";

      return () => {
        document.body.style.overflow = "";
      };
    }, [modal.type]);

    async function handleAddSong(songData) {
      try {

        const newSong = await createSongs(songData)

        setSongs(prev => [...prev, newSong]);

        closeModal();

      } catch (err) {
        alert(err.message);
      }
    }

    async function handleUpdateSong(songData) {
      try{
        const updatedSong = await updateSong(
          modal.song.id,
          songData
        );

        setSongs(prev =>
          prev.map(song =>
            song.id === updatedSong.id
              ? updatedSong
              : song
          )
        );
      
      closeModal();

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

          closeModal();

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
          <h1>TuneBuddy</h1>
        <p>
          Your Personal Music Practice Companion
        </p>
        </header>
        
        <FilterBar 
          filters={filters}
          setFilters={setFilters}
        />

        <div className="header-actions">
          <button 
            className="primary-btn"
            onClick={openAddModal}
          >
            + Add Song
          </button>
        </div>

        <SongList
          songs={songs}
          onSelect={openDetailsModal}
        />

        {modal.type && (
          <div className="modal-overlay">
            <div className="modal">
              {modal.type === "form" && (
                <SongForm
                  editingSong={modal.song}
                  onAddSong={handleAddSong}
                  onUpdateSong={handleUpdateSong}
                  onClose={closeModal}
                />
              )}

              {modal.type === "details" && (
                <SongDetails 
                  song={modal.song}
                  onEdit={openEditModal}
                  onDelete={handleDeleteSong}
                  onClose={closeModal}
                />
              )}
            </div>
          </div>
        )}
      </div>
    );
}

export default App;