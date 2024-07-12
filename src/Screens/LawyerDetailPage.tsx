import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Button from "../components/buttons/button";
import { Lawyer } from './types';
import lawyerImage from "../images/images.png";
import ENV from '../env';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faIdBadge, faUserShield, faCalendar, faMapMarkerAlt, faBriefcase, faGraduationCap, faLanguage, faDollarSign, faGavel, faPhone } from '@fortawesome/free-solid-svg-icons';
import "../Css/LawyerDetailPage.css"; // Import the CSS file for styling

const LawyerDetailPage = () => {
  const { lawyerId } = useParams<{ lawyerId: string }>();
  const [lawyer, setLawyer] = useState<Lawyer | null>(null);

  useEffect(() => {
    const fetchLawyerDetails = async () => {
      try {
        const response = await axios.get(`${ENV.API_BASE_URL}/api/lawyers/${lawyerId}`);
        setLawyer(response.data);
      } catch (error) {
        console.error("Error fetching lawyer details:", error);
      }
    };

    fetchLawyerDetails();
  }, [lawyerId]);

  if (!lawyer) {
    return <div className="loading">Loading...</div>;
  }

  const parseYearsAdmitted = (yearsAdmitted: string): number | "N/A" => {
    const date = new Date(yearsAdmitted);
    return isNaN(date.getTime()) ? "N/A" : new Date().getFullYear() - date.getFullYear();
  };

  const yearsLicensed = parseYearsAdmitted(lawyer.yearsAdmitted);

  const handleCall = () => {
    window.location.href = `tel:${lawyer.phoneNum}`;
  };

  return (
    <div className="lawyer-detail-container">
      <div className="lawyer-header">
        <img className="lawyer-profile-image" src={lawyer.profileImage || lawyerImage} alt="Lawyer Profile" />
        <div className="lawyer-info">
          <h2>{lawyer.name}</h2>
          <p>{lawyer.practiceArea} at {lawyer.city}, Pakistan</p>
          <div className="contact-buttons">
            <Button
              type="button"
              height="40px"
              width="200px"
              buttonColor="#ff9800"
              textColor="white"
              onClick={handleCall}
            >
              <FontAwesomeIcon icon={faPhone} /> {lawyer.phoneNum}
            </Button>
            <Button
              type="button"
              height="40px"
              width="200px"
              buttonColor="#2196f3"
              textColor="white"
            >
              <FontAwesomeIcon icon={faEnvelope} /> Message
            </Button>
            <Button
              type="button"
              height="40px"
              width="200px"
              buttonColor="#9e9e9e"
              textColor="white"
            >
              <FontAwesomeIcon icon={faGavel} /> Website
            </Button>
          </div>
        </div>
        <div className="lawyer-details">
          <h3>Licensed for {yearsLicensed} years</h3>
          <p><FontAwesomeIcon icon={faMapMarkerAlt} /> State: Pakistan</p>
          <p><FontAwesomeIcon icon={faCalendar} /> Acquired: {new Date(lawyer.yearsAdmitted).getFullYear()}</p>
          <p><FontAwesomeIcon icon={faUserShield} /> Status: <span className="status"><span className="green-dot"></span> Active</span></p>
        </div>
      </div>
      <div className="lawyer-details-section">
        <h3><FontAwesomeIcon icon={faBriefcase} /> About</h3>
        <p>{lawyer.bio}</p>
        <h3><FontAwesomeIcon icon={faMapMarkerAlt} /> Address</h3>
        <p>{lawyer.address}, {lawyer.city}, {lawyer.zip}</p>
        <h3><FontAwesomeIcon icon={faBriefcase} /> More Practice Areas</h3>
        <ul className="highlight">
          {lawyer.morePracticeArea.map((area, index) => (
            <li key={index}>{area}</li>
          ))}
        </ul>
        <h3><FontAwesomeIcon icon={faGraduationCap} /> Education</h3>
        <ul>
          {lawyer.education.map((edu, index) => (
            <li key={index}>{edu}</li>
          ))}
        </ul>
        <h3><FontAwesomeIcon icon={faLanguage} /> Languages</h3>
        <ul>
          {lawyer.languages.map((lang, index) => (
            <li key={index}>{lang}</li>
          ))}
        </ul>
        <h3><FontAwesomeIcon icon={faDollarSign} /> Fee</h3>
        <p>PKR {lawyer.fee}</p>
        <h3><FontAwesomeIcon icon={faGavel} /> Courts</h3>
        <ul>
          {lawyer.court.map((court, index) => (
            <li key={index}>{court}</li>
          ))}
        </ul>
        <h3><FontAwesomeIcon icon={faGavel} /> Specializations</h3>
        <ul>
          {lawyer.specialization.map((spec, index) => (
            <li key={index}>{spec}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LawyerDetailPage;
