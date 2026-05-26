import { Link, useNavigate, useParams } from 'react-router-dom'
import useCountry from '../hooks/useCountry'

function CountryPage() {
  const { code } = useParams()
  const navigate = useNavigate()
  const { country, loading, error } = useCountry(code)

  if (loading) {
    return <div className="country-page">Loading country details...</div>
  }

  if (error) {
    return <div className="country-page">{error}</div>
  }

  if (!country) {
    return <div className="country-page">Country not found.</div>
  }

  const languages = country.languages ? Object.values(country.languages).join(', ') : 'N/A'
  const currencies = country.currencies
    ? Object.values(country.currencies)
        .map((currency) => currency.name)
        .join(', ')
    : 'N/A'

  return (
    <div className="country-page">
      <button type="button" className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <article className="country-detail-card">
        <img
          className="country-detail-card__flag"
          src={country.flags?.svg || country.flags?.png}
          alt={`${country.name?.common || 'Country'} flag`}
        />

        <div className="country-detail-card__content">
          <h1>{country.name?.common}</h1>
          <p>
            <strong>Region:</strong> {country.region || 'N/A'}
          </p>
          <p>
            <strong>Sub Region:</strong> {country.subregion || 'N/A'}
          </p>
          <p>
            <strong>Capital:</strong> {country.capital?.join(', ') || 'N/A'}
          </p>
          <p>
            <strong>Population:</strong> {country.population?.toLocaleString() || 'N/A'}
          </p>
          <p>
            <strong>Languages:</strong> {languages}
          </p>
          <p>
            <strong>Currencies:</strong> {currencies}
          </p>

          <div className="country-borders">
            <strong>Borders:</strong>{' '}
            {country.borders?.length ? (
              country.borders.map((borderCode) => (
                <Link key={borderCode} to={`/country/${borderCode}`} className="border-badge">
                  {borderCode}
                </Link>
              ))
            ) : (
              <span>None</span>
            )}
          </div>
        </div>
      </article>
    </div>
  )
}

export default CountryPage
