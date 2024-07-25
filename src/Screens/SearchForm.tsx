import React, { useState } from 'react';
import axios from 'axios';
import { FaPhoneAlt, FaEnvelope, FaGlobe, FaCheckCircle, FaMoneyBillWave } from 'react-icons/fa';
import ENV from '../env';
import '../Css/SearchForm.css';

const cities = [
  "Islamabad",
  "Lahore",
  "Karachi",
  "Multan",
  "Faisalabad",
  "Hyderabad",
  "Peshawar",
  "Quetta",
  "Gujranwala",
  "Dera Ismail Khan",
  "Bahawalpur",
  "Abbottabad"
];

const practiceAreas = [
  "Divorce Lawyers",
  "Accident Lawyer",
  "Tax Lawyer",
  "Criminal Lawyer",
  "Family Lawyer",
  "Immigration Lawyer",
  "Property Lawyer",
  "Civil Lawyer",
  "Marriage Lawyer",
  "Medical Lawyer",
  "Inheritance Lawyer",
  "Nab & Anti Corruption Lawyer",
  "Child Custody Lawyer"
];

const SearchForm: React.FC = () => {
  const [city, setCity] = useState('');
  const [practiceArea, setPracticeArea] = useState('');
  const [lawyers, setLawyers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
  
    console.log("Searching for:", { city, practiceArea });
  
    try {
      const response = await axios.get(`${ENV.API_BASE_URL}/api/lawyers/search`, {
        params: { city, practiceArea }
      });
      console.log("API response:", response.data); // Log the API response
      setLawyers(response.data);
    } catch (error) {
      console.error('Error fetching lawyers:', error);
      setError('Error fetching lawyers.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="search-form">
      <div className="search-bar-container">
        <form onSubmit={handleSearch}>
          <select value={practiceArea} onChange={(e) => setPracticeArea(e.target.value)}>
            <option value="">Area of law</option>
            {practiceAreas.map((area) => (
              <option key={area} value={area}>{area}</option>
            ))}
          </select>
          <select value={city} onChange={(e) => setCity(e.target.value)}>
            <option value="">City</option>
            {cities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
          <button type="submit" disabled={loading}>
            {loading ? 'Searching...' : 'Find lawyers'}
          </button>
        </form>
      </div>
      {error && <p className="error">{error}</p>}
      <div className="results">
        {lawyers.length > 0 ? (
          lawyers.map((lawyer) => (
            <div key={lawyer._id} className="card">
              <div className="card-left">
                <img src={lawyer.profileImage} alt={`${lawyer.name}'s profile`} />
              </div>
              <div className="card-right">
                <h2>{lawyer.name}</h2>
                <p className="status">
                  <FaCheckCircle color="green" /> Open for Business
                </p>
                <p className="bio">{lawyer.bio}</p>
                <p className="contact-info">
                  <span><FaMoneyBillWave /> <strong>Fee:</strong> Rs{lawyer.fee}</span>
                </p>
                <div className="actions">
                  <a href={`tel:${lawyer.phoneNum}`} className="call-button"><FaPhoneAlt /> Call {lawyer.phoneNum}</a>
                  <button className="message-button"><FaEnvelope /> Message</button>
                  <button className="website-button"><FaGlobe /> Website</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No lawyers found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchForm;
