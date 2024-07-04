import React from "react";
import ViewLawyerCard from "../components/viewLawyerCard";
import lawyer from "../images/lawyer.jpg";
const ViewLawyersScreen: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // This makes the parent occupy the full viewport height
        marginTop: "6%",
      }}
    >
      <div
        style={{
          width: "80%",
        }}
      >
        <h1 style={{ textAlign: "center", justifyContent: "center" }}>
          View Lawyers
        </h1>
        <ViewLawyerCard
          label="Business Lawyer"
          labelStyle={{ fontSize: 20 }}
          imageSrc={lawyer}
          name="Ahmed Shah"
          rating={4}
          reviews={89}
          location="Dhoke Kala khan"
          practiceAreas="Consumate, Family, Health, Probation"
          descriptionTitle="Excellent Lawyer"
          descriptionText="This lawyer has received a 4.5-star rating based on 9 reviews. Clients have praised their professionalism, responsiveness, and expertise."
          buttonText="See more Consumate Lawyers"
        />
        <ViewLawyerCard
          label="Business Lawyer"
          labelStyle={{ fontSize: 20 }}
          imageSrc={lawyer}
          name="Ahmed Shah"
          rating={4}
          reviews={89}
          location="Dhoke Kala khan"
          practiceAreas="Consumate, Family, Health, Probation"
          descriptionTitle="Excellent Lawyer"
          descriptionText="This lawyer has received a 4.5-star rating based on 9 reviews. Clients have praised their professionalism, responsiveness, and expertise."
          buttonText="See more Consumate Lawyers"
        />
      </div>
    </div>
  );
};

export default ViewLawyersScreen;
