import React from "react";
import Button from "./buttons/button";
import Rating from "react-rating";

interface LawyerDetailCardProps {
  label: string;
  imageSrc: string;
  name: string;
  rating: number;
  reviews: number;
  location: string;
  practiceAreas: string;
  descriptionTitle: string;
  descriptionText: string;
  buttonText: string;
}
const MyRating = Rating as any;

const LawyerDetailCard: React.FC<LawyerDetailCardProps> = ({
  label,
  imageSrc,
  name,
  rating,
  reviews,
  location,
  practiceAreas,
  descriptionTitle,
  descriptionText,
  buttonText,
}) => (
  <div style={{ position: "relative", width: "100%", marginTop: 20 }}>
    <div style={{ fontWeight: "bold", textAlign: "left", marginLeft: 5 }}>
      {label}
    </div>
    <div className="lawyerDetailCard">
      <div style={{ display: "flex", flexDirection: "row" }}>
        <img
          src={imageSrc}
          alt="Lawyer Profile Picture"
          height={120}
          width={110}
        />
        <div>
          <h3
            style={{
              marginTop: 0,
              marginBottom: 0,
              marginLeft: 10,
              color: "#ffa500",
              fontWeight: "bold",
              textAlign: "left",
            }}
          >
            {name}
          </h3>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 0,
              marginBottom: 0,
              marginLeft: 5,
            }}
          >
            <MyRating
              emptySymbol={
                <span style={{ color: "gray", fontSize: "1.5em" }}>☆</span>
              }
              fullSymbol={
                <span style={{ color: "gold", fontSize: "1.5em" }}>★</span>
              }
              initialRating={rating}
              readonly
            />
            <p style={{ fontSize: 12, fontWeight: "bold", marginLeft: 2 }}>
              ({reviews}) reviews
            </p>
          </div>
          <div style={{ fontSize: 14, textAlign: "left", marginLeft: 10 }}>
            <text style={{ fontWeight: "bold" }}>Location</text>
          </div>
          <div
            style={{
              fontSize: 14,
              textAlign: "left",
              marginTop: 2,
              marginLeft: 10,
            }}
          >
            <text>{location}</text>
          </div>
        </div>
      </div>
      <div
        style={{
          fontSize: 14,
          fontWeight: "bold",
          textAlign: "left",
          marginTop: 15,
        }}
      >
        <text>Practice Areas</text>
      </div>
      <div
        style={{
          fontSize: 14,
          textAlign: "left",
          marginTop: 2,
          marginBottom: 20,
        }}
      >
        <text>{practiceAreas}</text>
      </div>
      <hr style={{ marginBottom: 10 }} />
      <div style={{ textAlign: "left", marginTop: 2 }}>
        <text style={{ fontWeight: "bold", fontSize: 14, textAlign: "left" }}>
          {descriptionTitle}
        </text>
        <p
          style={{
            fontSize: 14,
            fontWeight: "normal",
            textAlign: "left",
            marginTop: 4,
          }}
        >
          {descriptionText}
        </p>
      </div>
      <Button
        type="button"
        height="35px"
        width="100%"
        buttonColor="#1d73b4"
        textColor="white"
      >
        {buttonText}
      </Button>
    </div>
  </div>
);

export default LawyerDetailCard;
