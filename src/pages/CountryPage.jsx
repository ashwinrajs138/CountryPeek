import { useNavigate, useParams } from 'react-router-dom'
import useCountry from '../hooks/useCountry'
import '../styles/App.css'

function CountryPage() {
  const { code } = useParams()
  const navigate = useNavigate()
  const { country, loading, error } = useCountry(code)

  if (loading) {
    return <p className="page-status">Loading country details...</p>
  }

  if (error) {
    return <p className="page-status page-status--error">{error}</p>
  }

  if (!country) {
    return null
  }

  const { name, flags, population, region, subregion, capital, languages, currencies, borders } =
    country

  const languageNames = languages ? Object.values(languages) : []
  const currencyNames = currencies ? Object.values(currencies).map((currency) => currency.name) : []

  return (
    <div className="country-page">
      <button type="button" className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="country-page__layout">
        <img
          src={flags?.svg || flags?.png}
          alt={`Flag of ${name?.common ?? 'country'}`}
          className="country-page__flag"
        />

        <div className="country-page__info">
          <h2 className="country-page__name">{name?.common}</h2>
          <p className="country-page__official">{name?.official}</p>

          <div className="country-page__details">
            <div>
              <p>
                <strong>Population:</strong> {population?.toLocaleString()}
              </p>
              <p>
                <strong>Region:</strong> {region}
              </p>
              <p>
                <strong>Subregion:</strong> {subregion || 'N/A'}
              </p>
              <p>
                <strong>Capital:</strong> {capital?.[0] || 'N/A'}
              </p>
            </div>

            <div>
              <p>
                <strong>Languages:</strong> {languageNames.join(', ') || 'N/A'}
              </p>
              <p>
                <strong>Currencies:</strong> {currencyNames.join(', ') || 'N/A'}
              </p>
            </div>
          </div>

          {borders && borders.length > 0 && (
            <div className="country-page__borders">
              <strong>Borders:</strong>{' '}
              {borders.map((borderCode) => (
                <span key={borderCode} className="border-badge">
                  {borderCode}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CountryPage
