import React, { useState, useEffect } from "react";
import RegionApi from "../api/RegionApi";

export default function RegionCreate(props) {
  const [item, setItem] = useState("");

  useEffect(() => {
    setItem(props.items);
  }, [props.items]);

  const handleChange = (event) => {
    setItem(event.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const id = props.items.regionId;

    const payload = {
      name: item,
    };

    try {
      await RegionApi.edit(id, payload);
      window.alert("Data successfully Modified");
      props.setRefresh(true);
      props.setDisplay(false);
    } catch (error) {
      console.error("Error creating data", error);
    }
  };

  return (
    <div>
      <h2>Edit Regions</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>Region Name:</label>
          <input
            type="text"
            placeholder="Name"
            value={item.regionName}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">Save</button>
          <button onClick={() => props.setDisplay(false)}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
