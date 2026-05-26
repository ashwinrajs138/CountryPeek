import { useEffect, useState } from 'react'

export default function useCountries(query) {
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const searchQuery = query.trim()

    if (!searchQuery) {
      return undefined
    }

    const controller = new AbortController()

    async function fetchCountries() {
      try {
        setLoading(true)
        setError('')

        const response = await fetch(
          `https://restcountries.com/v3.1/name/${encodeURIComponent(searchQuery)}?fields=cca3,name,population,region,capital,flags`,
          { signal: controller.signal },
        )

        if (response.status === 404) {
          setCountries([])
          return
        }

        if (!response.ok) {
          throw new Error('Failed to fetch countries.')
        }

        const data = await response.json()
        setCountries(Array.isArray(data) ? data : [])
      } catch (fetchError) {
        if (fetchError.name === 'AbortError') {
          return
        }

        setCountries([])
        setError(fetchError.message || 'Something went wrong while fetching countries.')
      } finally {
        setLoading(false)
      }
    }

    fetchCountries()

    return () => {
      controller.abort()
    }
  }, [query])

  const hasQuery = Boolean(query.trim())

  return {
    countries: hasQuery ? countries : [],
    loading: hasQuery ? loading : false,
    error: hasQuery ? error : '',
  }
}
