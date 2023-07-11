import React, { useEffect, useState } from "react";
import RegionApi from "../api/RegionApi";
import RegionCreate from "./RegionCreate";
import RegionEdit from "./RegionEdit";

export default function RegionView() {
  const [region, setRegion] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [createDisplay, setCreateDisplay] = useState(false);
  const [editDisplay, setEditDisplay] = useState(false);
  const [items, setRegionItem] = useState([]);

  useEffect(() => {
    RegionApi.list().then((data) => {
      setRegion(data);
    });
    setRefresh(false);
  }, [refresh]);

  const onDelete = async (id) => {
    RegionApi.deleted(id).then(() => {
      window.alert("Data successfully deleted");
      setRefresh(true);
    });
  };

  const onEdit = async (id) => {
  setEditDisplay(true);
  try {
    const data = await RegionApi.getOne(id);
    setRegionItem(data);
    // console.log(data);
  } catch (error) {
    console.error("Error", error);
  }
};


  return (
    <div>
      {
      createDisplay ? (
        <RegionCreate
          setRefresh={setRefresh}
          setDisplay={setCreateDisplay}
        />
      ) : editDisplay ? 
      (
        <RegionEdit
          setRefresh={setRefresh}
          setDisplay={setEditDisplay}
          items = {items}
        />
      ) : 
      (
        <>
          <h2>List Regions</h2>
          <button onClick={() => {setCreateDisplay(true);}}>Add Regions</button>
          <table>
            <th>Region ID</th>
            <th>Region Name</th>
            <th>Action</th>
            <tbody>
              {region &&
                region.map((reg) => (
                  <tr key={reg.regionId}>
                    <td>{reg.regionId}</td>
                    <td>{reg.regionName}</td>
                    <td>
                      <button onClick={() => { 
                        // setEditDisplay(true);
                        // setRegionItem(reg.regionId); 
                        onEdit(reg.regionId);
                        }}>
                        Edit
                      </button>
                      <button onClick={() => onDelete(reg.regionId)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
