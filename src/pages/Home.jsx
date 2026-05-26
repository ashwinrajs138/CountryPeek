import { useState } from 'react'
import SearchBar from '../components/SearchBar'
import FilterBar from '../components/FilterBar'
import CountryCard from '../components/CountryCard'
import useCountries from '../hooks/useCountries'

function Home() {
  const [query, setQuery] = useState('')
  const [region, setRegion] = useState('All')
  const [sortBy, setSortBy] = useState('')
  const { countries, loading, error } = useCountries(query)

  const displayed = [...countries]
    .filter((country) => region === 'All' || country.region === region)
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.common.localeCompare(b.name.common)
      }

      if (sortBy === 'population') {
        return b.population - a.population
      }

      return 0
    })

  function handleQueryChange(nextQuery) {
    setQuery(nextQuery)

    if (!nextQuery.trim()) {
      setRegion('All')
      setSortBy('')
    }
  }

  return (
    <div className="home">
      <SearchBar query={query} onQueryChange={handleQueryChange} />
      <FilterBar
        region={region}
        onRegionChange={setRegion}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {loading ? <p className="home__placeholder">Loading countries...</p> : null}
      {!loading && error ? <p className="home__placeholder">{error}</p> : null}

      {!query.trim() ? (
        <p className="home__placeholder">Start searching to explore countries.</p>
      ) : null}

      {query.trim() && !loading && !error && countries.length === 0 ? (
        <p className="home__placeholder">
          No countries found. Try another search term.
        </p>
      ) : null}

      {query.trim() && !loading && !error && countries.length > 0 ? (
        <section className="cards-grid">
          {displayed.map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </section>
      ) : null}
    </div>
  )
}

export default Home
