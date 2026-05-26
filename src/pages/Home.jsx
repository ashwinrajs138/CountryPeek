import { useEffect, useState } from 'react'
import SearchBar from '../components/SearchBar'
import CountryCard from '../components/CountryCard'

function Home() {
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleQueryChange = (nextQuery) => {
    setQuery(nextQuery)

    if (!nextQuery.trim()) {
      setCountries([])
      setError(null)
      setLoading(false)
    } else {
      setLoading(true)
    }
  }

  useEffect(() => {
    const trimmedQuery = query.trim()

    if (!trimmedQuery) {
      return
    }

    const controller = new AbortController()
    const timer = setTimeout(async () => {
      setCountries([])
      setError(null)

      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/name/${encodeURIComponent(trimmedQuery)}`,
          { signal: controller.signal }
        )

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('No countries found.')
          }

          if (response.status >= 500) {
            throw new Error('Server error. Please try again later.')
          }

          throw new Error('Failed to fetch countries.')
        }

        const data = await response.json()
        setCountries(data)
      } catch (fetchError) {
        if (fetchError.name === 'AbortError') {
          return
        }

        setCountries([])
        setError(
          fetchError instanceof Error
            ? fetchError.message
            : 'Something went wrong. Please try again.'
        )
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }, 400)

    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [query])

  return (
    <div className="home">
      <SearchBar query={query} onQueryChange={handleQueryChange} />
      {loading && <p className="home__status">Loading...</p>}

      {!loading && error && (
        <p className="home__status home__status--error">{error}</p>
      )}

      {!loading && !error && !query.trim() && (
        <p className="home__status">Start searching to explore countries.</p>
      )}

      {!loading && !error && countries.length > 0 && (
        <div className="cards-grid">
          {countries.map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Home
