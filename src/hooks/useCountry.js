import { useEffect, useState } from 'react'

function useCountry(code) {
  const [country, setCountry] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!code) {
      return
    }

    const controller = new AbortController()

    async function fetchCountry() {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(`https://restcountries.com/v3.1/alpha/${code}`, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error('Failed to fetch country details')
        }

        const data = await response.json()
        setCountry(data[0] ?? null)
      } catch (fetchError) {
        if (fetchError.name !== 'AbortError') {
          setError(fetchError.message)
          setCountry(null)
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchCountry()

    return () => controller.abort()
  }, [code])

  return { country, loading, error }
}

export default useCountry
