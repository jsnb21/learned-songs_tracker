import "./FilterBar.css"

function FilterBar({ filters, setFilters }) {
    
    function handleChange(e){
        const { name, value } = e.target;

        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    }

    return (
    <div className="filter-bar">
        <div className="search-group">
            <input 
                type="text"
                name="search"
                placeholder="Search title or artist..."
                value={filters.search}
                onChange={handleChange} 
            />
        </div>

        <div className="filter-controls">
            
        <select
            name="instrument"
            value = {filters.instrument}
            onChange={handleChange}
        >
            <option value="">All Instruments</option>
            <option>Guitar</option>
            <option>Bass</option>
            <option>Piano</option>
            <option>Drums</option>
            <option>Vocals</option>
        </select>

        <button
            className="clear-btn"
            onClick={() =>
                setFilters({
                    search: "",
                    instrument: "",
                    status: ""
                })
            }
        >
            Clear Filters
        </button>
        </div>
    </div>
    );

}



export default FilterBar;