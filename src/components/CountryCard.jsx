import { Link } from 'react-router-dom'

function CountryCard({ country }) {
  return (
    <Link to={`/country/${country.cca3}`} className="card">
      <img
        className="card__flag"
        src={country.flags?.svg || country.flags?.png}
        alt={`${country.name?.common || 'Country'} flag`}
      />
      <div className="card__body">
        <h3>{country.name?.common}</h3>
        <p>
          <strong>Region:</strong> {country.region || 'N/A'}
        </p>
        <p>
          <strong>Population:</strong> {country.population?.toLocaleString() || 'N/A'}
        </p>
      </div>
    </Link>
  )
}

export default CountryCard
