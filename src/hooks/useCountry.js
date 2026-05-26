import { useEffect, useState } from 'react'

export default function useCountry(code) {
  const [country, setCountry] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!code) {
      setCountry(null)
      setError('')
      setLoading(false)
      return undefined
    }

    const controller = new AbortController()

    async function fetchCountry() {
      try {
        setLoading(true)
        setError('')

        const response = await fetch(
          `https://restcountries.com/v3.1/alpha/${encodeURIComponent(code)}?fields=cca3,name,flags,region,subregion,population,capital,languages,currencies,borders`,
          { signal: controller.signal },
        )

        if (!response.ok) {
          throw new Error('Failed to fetch country details.')
        }

        const data = await response.json()
        setCountry(Array.isArray(data) ? data[0] : data)
      } catch (fetchError) {
        if (fetchError.name === 'AbortError') {
          return
        }

        setCountry(null)
        setError(fetchError.message || 'Something went wrong while fetching country details.')
      } finally {
        setLoading(false)
      }
    }

    fetchCountry()

    return () => {
      controller.abort()
    }
  }, [code])

  return { country, loading, error }
}
