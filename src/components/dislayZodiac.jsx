import React from "react";
import "./displayZodiac.css";

const Result = ({
  zodiac,
  luckyColor,
  luckyNumber,
  compatibility,
  horoscopeMessage,
  onClose,
}) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Your Zodiac Sign: {zodiac}</h2>
        <p className="horoscope-message">{horoscopeMessage}</p>
        <div className="sign-details">
          <p>
            Lucky Color:{" "}
            <strong>
              <span style={{ color: luckyColor }}>{luckyColor}</span>
            </strong>
          </p>
          <p>
            Lucky Number: <strong>{luckyNumber}</strong>
          </p>
          <p>
            Compatible with: <br></br>
            <strong>{compatibility}</strong>
          </p>
        </div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Result;
