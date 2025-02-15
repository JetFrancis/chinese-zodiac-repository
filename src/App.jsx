import React, { useState } from "react";
import Form from "./components/inputYear.jsx";
import Result from "./components/dislayZodiac.jsx";
import zodiacData from "./components/dummyData/zodiacData.json";
import "./app.css";

const App = () => {
  const [zodiac, setZodiac] = useState("");
  const [luckyColor, setLuckyColor] = useState("");
  const [luckyNumber, setLuckyNumber] = useState("");
  const [compatibility, setCompatibility] = useState("");
  const [horoscopeMessage, setHoroscopeMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const [error, setError] = useState("");

  const handleClearForm = () => {
    setZodiac("");
    setLuckyColor("");
    setLuckyNumber("");
    setCompatibility("");
    setHoroscopeMessage("");
    setIsModalOpen(false);
    setError("");
    setFormKey((prevKey) => prevKey + 1);
  };

  const getZodiacSign = (year) => {
    const baseYear = 1924;
    const zodiacIndex = (year - baseYear) % 12;
    return (
      zodiacData.chineseZodiac[
        zodiacIndex >= 0 ? zodiacIndex : zodiacIndex + 12
      ] || "Unknown"
    );
  };

  const validateYear = (year) => {
    const numYear = parseInt(year);
    if (isNaN(numYear)) {
      return "Please enter a valid number";
    }
    if (numYear < 1900 || numYear > 2100) {
      return "Please enter a year between 1900 and 2100";
    }
    return "";
  };

  const handleFormSubmit = (year, partnerSign) => {
    setError("");

    const validationError = validateYear(year);
    if (validationError) {
      setError(validationError);
      return;
    }

    const sign = getZodiacSign(parseInt(year));
    const details = zodiacData.luckyDetails[sign] || {};
    const compatibleSigns = zodiacData.compatibilityChart[sign] || [];
    const message =
      zodiacData.horoscopeMessage[sign] || "No horoscope available";

    setZodiac(sign);
    setLuckyColor(details.color || "Unknown");
    setLuckyNumber(details.number || "Unknown");
    setCompatibility(` ${compatibleSigns.join(", ") || "None"}`);
    setHoroscopeMessage(message);
    setIsModalOpen(true);
  };

  return (
    <div>
      <Form
        key={formKey}
        onSubmit={handleFormSubmit}
        onClear={handleClearForm}
        error={error}
      />
      {isModalOpen && (
        <Result
          zodiac={zodiac}
          luckyColor={luckyColor}
          luckyNumber={luckyNumber}
          compatibility={compatibility}
          horoscopeMessage={horoscopeMessage}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default App;
