function SearchBar({ query, onQueryChange }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-bar__input"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder="Search for a country..."
        aria-label="Search for a country"
      />
    </div>
  )
}

export default SearchBar
