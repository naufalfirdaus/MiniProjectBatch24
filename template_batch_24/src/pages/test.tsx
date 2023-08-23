import React, { useState } from "react";
import Select from "react-select";

export default function App() {
  const [selectedOptions, setSelectedOptions] = useState();

  const optionList = [
    { value: "red", label: "Red" },
    { value: "green", label: "Green" },
    { value: "yellow", label: "Yellow" },
    { value: "blue", label: "Blue" },
    { value: "white", label: "White" },
  ];

  function handleSelect(data: any) {
    setSelectedOptions(data);
  }

  const appStyles: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };

  const dropdownContainerStyles: React.CSSProperties = {
    width: "300px",
  };

  return (
    <div style={appStyles}>
      <h2>Choose your color</h2>
      <div style={dropdownContainerStyles}>
        <Select
          options={optionList}
          placeholder="Select color"
          value={selectedOptions}
          onChange={handleSelect}
          isSearchable={true}
          isMulti
        />
      </div>
    </div>
  );
}
