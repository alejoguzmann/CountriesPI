import React, { useState } from "react";

const CountrySelect = ({ allCountries }) => {
  const [selectedCountries, setSelectedCountries] = useState([]);

  const handleSelectChange = (e) => {
    const options = e.target.options;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setSelectedCountries(selected);
  };

  return (
    <select
      multiple
      value={selectedCountries}
      onChange={handleSelectChange}
    >
      {allCountries.map((country) => (
        <option key={country.ID} value={country.ID}>
          {country.name}
        </option>
      ))}
    </select>
  );
};

export default CountrySelect;
