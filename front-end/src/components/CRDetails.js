import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CRDetails = () => {
  const { tdocnumber } = useParams();
  const [crData, setCrData] = useState(null);

  useEffect(() => {
    if (!tdocnumber) return;

    axios
      .get(`http://localhost:3011/cr_data/${tdocnumber}`)
      .then((response) => {
        setCrData(response.data[0]); // Assuming it returns an array with a single object
      })
      .catch((error) => {
        console.error("Error fetching CR data:", error);
      });
  }, [tdocnumber]);

  if (!crData) {
    return <div>Loading CR data...</div>;
  }

  return (
    <div>
      <h2>CR Details for {tdocnumber}</h2>
      <table>
        <tbody>
          {Object.entries(crData).map(([key, value]) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CRDetails;
