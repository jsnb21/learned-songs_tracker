function FilterBar({ filters, setFilters }) {
    
    function handleChange(e){
        const { name, value } = e.target;

        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    }

    return (
    <div>
        <h2>Filter Songs</h2>

        <input 
            type="text"
            name="search"
            placeholder="Search title or artist..."
            value={filters.search}
            onChange={handleChange} 
        />

        { " " }

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
    );

}



export default FilterBar;