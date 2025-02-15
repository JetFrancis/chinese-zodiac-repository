import React, { useState } from "react";
import "./inputYear.css";

const Form = ({ onSubmit, onClear }) => {
  const [year, setYear] = useState("");
  const [partnerSign, setPartnerSign] = useState("");
  const [error, setError] = useState("");

  const validateYear = (value) => {
    const numYear = parseInt(value);
    if (!value) {
      return "Please enter a year";
    }
    if (isNaN(numYear)) {
      return "Please enter a valid number";
    }
    if (numYear < 1900 || numYear > 2100) {
      return "Please enter a year between 1900 and 2100";
    }
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateYear(year);

    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    onSubmit(year, partnerSign);
  };

  const handleClear = () => {
    setYear("");
    setPartnerSign("");
    setError("");
    onClear();
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1 className="maintitle">Chinese Horoscope</h1>
      <input
        className={`year-input ${error ? "error" : ""}`}
        type="number"
        placeholder="Year"
        value={year}
        onChange={(e) => {
          setYear(e.target.value);
          setError("");
        }}
      />
      {error && <div className="error-message">{error}</div>}
      <div className="button-group">
        <button type="submit">Reveal my sign</button>
        <button type="button" onClick={handleClear}>
          Clear
        </button>
      </div>
    </form>
  );
};

export default Form;
