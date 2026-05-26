function FilterBar({ region, onRegionChange, sortBy, onSortChange }) {
  return (
    <div className="filter-bar">
      <select
        aria-label="Filter by region"
        value={region}
        onChange={(event) => onRegionChange(event.target.value)}
      >
        <option value="All">All</option>
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>

      <select
        aria-label="Sort countries"
        value={sortBy}
        onChange={(event) => onSortChange(event.target.value)}
      >
        <option value="">Default</option>
        <option value="name">Name (A–Z)</option>
        <option value="population">Population (High–Low)</option>
      </select>
    </div>
  )
}

export default FilterBar
