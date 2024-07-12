import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import DropDownField from "../components/fields/DropDownField";
import Button from "../components/buttons/button";
import axios from 'axios';
import Slider from "react-slick";
import { Lawyer, IPracticeAreasData } from '../Screens/types';
import lawyerImage from "../images/images.png";
import LawyerDetailCard from "../components/lawyerDetailCard";
import ENV from '../env';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const SearchLawyers = () => {
  const cities = [
    "Karachi", "Lahore", "Faisalabad", "Rawalpindi", "Multan", "Hyderabad", "Gujranwala", "Peshawar", "Quetta", "Islamabad",
  ];

  const practiceAreasData: IPracticeAreasData = {
    // Define practice areas for each city
    Islamabad: ["Divorce Lawyers", "Accident Lawyer", "Tax Lawyer", "Criminal Lawyer", "Family Lawyer", "Immigration Lawyer", "Property Lawyer", "Civil Lawyer", "Marriage Lawyer", "Medical Lawyer", "Inheritance Lawyer", "Nab & Anti Corruption Lawyer", "Child Custody Lawyer"],
    Karachi: ["Divorce Lawyers", "Accident Lawyer", "Tax Lawyer", "Criminal Lawyer", "Family Lawyer", "Immigration Lawyer", "Property Lawyer", "Civil Lawyer", "Marriage Lawyer", "Medical Lawyer", "Inheritance Lawyer", "Nab & Anti Corruption Lawyer", "Child Custody Lawyer"],
    Lahore: ["Divorce Lawyers", "Accident Lawyer", "Tax Lawyer", "Criminal Lawyer", "Family Lawyer", "Immigration Lawyer", "Property Lawyer", "Civil Lawyer", "Marriage Lawyer", "Medical Lawyer", "Inheritance Lawyer", "Nab & Anti Corruption Lawyer", "Child Custody Lawyer"],
    Faisalabad: ["Divorce Lawyers", "Accident Lawyer", "Tax Lawyer", "Criminal Lawyer", "Family Lawyer", "Immigration Lawyer", "Property Lawyer", "Civil Lawyer", "Marriage Lawyer", "Medical Lawyer", "Inheritance Lawyer", "Nab & Anti Corruption Lawyer", "Child Custody Lawyer"],
    Multan: ["Divorce Lawyers", "Accident Lawyer", "Tax Lawyer", "Criminal Lawyer", "Family Lawyer", "Immigration Lawyer", "Property Lawyer", "Civil Lawyer", "Marriage Lawyer", "Medical Lawyer", "Inheritance Lawyer", "Nab & Anti Corruption Lawyer", "Child Custody Lawyer"],
    Hyderabad: ["Divorce Lawyers", "Accident Lawyer", "Tax Lawyer", "Criminal Lawyer", "Family Lawyer", "Immigration Lawyer", "Property Lawyer", "Civil Lawyer", "Marriage Lawyer", "Medical Lawyer", "Inheritance Lawyer", "Nab & Anti Corruption Lawyer", "Child Custody Lawyer"],
    Gujranwala: ["Divorce Lawyers", "Accident Lawyer", "Tax Lawyer", "Criminal Lawyer", "Family Lawyer", "Immigration Lawyer", "Property Lawyer", "Civil Lawyer", "Marriage Lawyer", "Medical Lawyer", "Inheritance Lawyer", "Nab & Anti Corruption Lawyer", "Child Custody Lawyer"],
    Peshawar: ["Divorce Lawyers", "Accident Lawyer", "Tax Lawyer", "Criminal Lawyer", "Family Lawyer", "Immigration Lawyer", "Property Lawyer", "Civil Lawyer", "Marriage Lawyer", "Medical Lawyer", "Inheritance Lawyer", "Nab & Anti Corruption Lawyer", "Child Custody Lawyer"],
    Quetta: ["Divorce Lawyers", "Accident Lawyer", "Tax Lawyer", "Criminal Lawyer", "Family Lawyer", "Immigration Lawyer", "Property Lawyer", "Civil Lawyer", "Marriage Lawyer", "Medical Lawyer", "Inheritance Lawyer", "Nab & Anti Corruption Lawyer", "Child Custody Lawyer"],
    Dera_Ismail_Khan: ["Divorce Lawyers", "Accident Lawyer", "Tax Lawyer", "Criminal Lawyer", "Family Lawyer", "Immigration Lawyer", "Property Lawyer", "Civil Lawyer", "Marriage Lawyer", "Medical Lawyer", "Inheritance Lawyer", "Nab & Anti Corruption Lawyer", "Child Custody Lawyer"],
    Bahawalpur: ["Divorce Lawyers", "Accident Lawyer", "Tax Lawyer", "Criminal Lawyer", "Family Lawyer", "Immigration Lawyer", "Property Lawyer", "Civil Lawyer", "Marriage Lawyer", "Medical Lawyer", "Inheritance Lawyer", "Nab & Anti Corruption Lawyer", "Child Custody Lawyer"],
    Abbottabad: ["Divorce Lawyers", "Accident Lawyer", "Tax Lawyer", "Criminal Lawyer", "Family Lawyer", "Immigration Lawyer", "Property Lawyer", "Civil Lawyer", "Marriage Lawyer", "Medical Lawyer", "Inheritance Lawyer", "Nab & Anti Corruption Lawyer", "Child Custody Lawyer"],
  };

  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedPracticeArea, setSelectedPracticeArea] = useState<string>("");
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);

  const navigate = useNavigate(); // Use useNavigate for navigation

  const practiceAreas = practiceAreasData[selectedCity] || [];

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    setSelectedPracticeArea(""); // Reset selected practice area when city changes
  };

  const handlePracticeAreaChange = (practiceArea: string) => {
    setSelectedPracticeArea(practiceArea);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${ENV.API_BASE_URL}/api/lawyers/search`, {
        params: {
          city: selectedCity,
          practiceArea: selectedPracticeArea,
        },
      });

      const uniqueLawyers = Array.from(new Set(response.data.map((lawyer: Lawyer) => lawyer._id)))
        .map((id: string | unknown) => {
          return response.data.find((lawyer: Lawyer) => lawyer._id === id);
        });

      setLawyers(uniqueLawyers as Lawyer[]);
    } catch (error) {
      console.error("Error fetching lawyers:", error);
    }
  };

  // Slider settings for horizontal display
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <div className="slick-next">Next</div>,
    prevArrow: <div className="slick-prev">Prev</div>,
    vertical: false, // Ensure this is set to false for horizontal slider
    adaptiveHeight: false,
  };

  const handleSeeMore = (lawyerId: string) => {
    navigate(`/lawyerDetailPage/${lawyerId}`);
  };

  return (
    <div className="searchTopRatedLawyers-Section">
      <h1 className="searchLawyer-title">Search for top-rated lawyers</h1>
      <div style={{ display: "flex", gap: "20px" }}>
        <DropDownField options={cities} onChange={handleCityChange} value={selectedCity} />
        <DropDownField options={practiceAreas} onChange={handlePracticeAreaChange} value={selectedPracticeArea} />
        <Button
          type="button"
          height="50px"
          width="80px"
          buttonColor="green"
          textColor="white"
          onClick={handleSearch}
        >
          Search
        </Button>
      </div>
      <div className="topRatedLawyersCard-Section">
        <div className="lawyerForYou-title">
          <text>Top Rated Lawyers for You</text>
        </div>
        <Slider {...settings}>
          {lawyers.map((lawyer) => (
            <div key={lawyer._id} style={{ padding: "0 10px" }}>
              <LawyerDetailCard
                imageSrc={lawyer.profileImage || lawyerImage}
                name={lawyer.name}
                rating={lawyer.rating || 0}
                reviews={lawyer.reviews || 0}
                location={lawyer.city}
                practiceAreas={lawyer.practiceArea}
                descriptionTitle="Excellent Lawyer"
                descriptionText={`This lawyer has received a ${lawyer.rating}-star rating based on ${lawyer.reviews} reviews. Clients have praised their professionalism, responsiveness, and expertise.`}
                buttonText={`See more ${lawyer.practiceArea}`}
                label={""}
                morePracticeAreas={[]}
                onSeeMore={() => handleSeeMore(lawyer._id)} // Pass the lawyerId to handleSeeMore
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default SearchLawyers;
