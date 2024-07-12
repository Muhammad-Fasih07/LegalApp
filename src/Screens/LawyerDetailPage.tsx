import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Button from "../components/buttons/button";
import { Lawyer } from './types';
import lawyerImage from "../images/images.png";
import ENV from '../env';
import StarRatings from "react-star-ratings";

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
    return <div>Loading...</div>;
  }

  return (
    <div className="lawyerDetailPage">
      <div className="lawyerProfile">
        <img src={lawyer.profileImage || lawyerImage} alt="Lawyer Profile" />
        <div className="lawyerInfo">
          <h2>{lawyer.name}</h2>
          <p>{lawyer.email}</p>
          {lawyer.rating && (
            <StarRatings
              rating={lawyer.rating}
              starRatedColor="orange"
              numberOfStars={5}
              name='rating'
            />
          )}
          {lawyer.reviews && <p>{lawyer.reviews} reviews</p>}
          <p>License Number: {lawyer.licenseNumber}</p>
          <p>Licensed for {new Date().getFullYear() - new Date(lawyer.yearsAdmitted).getFullYear()} years</p>
          {lawyer.status && <p>Status: <span className="status">{lawyer.status}</span></p>}
        </div>
      </div>
      <div className="lawyerContact">
        <Button
          type="button"
          height="50px"
          width="100%"
          buttonColor="orange"
          textColor="white"
        >
          Call
        </Button>
        <Button
          type="button"
          height="50px"
          width="100%"
          buttonColor="blue"
          textColor="white"
        >
          Message
        </Button>
        <Button
          type="button"
          height="50px"
          width="100%"
          buttonColor="gray"
          textColor="white"
        >
          Visit Website
        </Button>
      </div>
      <div className="lawyerDetails">
        <h3>About</h3>
        <p>{lawyer.bio}</p>
        <h3>Address</h3>
        <p>{lawyer.address}, {lawyer.city}, {lawyer.zip}</p>
        <h3>Practice Areas</h3>
        <p>{lawyer.practiceArea}</p>
        {lawyer.morePracticeArea && lawyer.morePracticeArea.length > 0 && (
          <div>
            <p>More Practice Areas:</p>
            <ul>
              {lawyer.morePracticeArea.map((area, index) => (
                <li key={index}>{area}</li>
              ))}
            </ul>
          </div>
        )}
        <h3>Education</h3>
        <ul>
          {lawyer.education.map((edu, index) => (
            <li key={index}>{edu}</li>
          ))}
        </ul>
        <h3>Languages</h3>
        <ul>
          {lawyer.languages.map((lang, index) => (
            <li key={index}>{lang}</li>
          ))}
        </ul>
        <h3>Fee</h3>
        <p>${lawyer.fee}</p>
        <h3>Courts</h3>
        <ul>
          {lawyer.court.map((court, index) => (
            <li key={index}>{court}</li>
          ))}
        </ul>
        <h3>Specializations</h3>
        <ul>
          {lawyer.specialization.map((spec, index) => (
            <li key={index}>{spec}</li>
          ))}
        </ul>
        <h3>Disciplinary History</h3>
        <ul>
          {lawyer.disciplinaryHistory.map((history, index) => (
            <li key={index}>{history}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LawyerDetailPage;
