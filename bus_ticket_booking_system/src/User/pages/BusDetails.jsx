import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
//import { getBusDetailsById } from '../services/BusService'; // ✅ Make sure path is correct

const BusDetails = () => {
  const { busId } = useParams(); // ✅ Extract busId from URL
  const [bus, setBus] = useState(null);

  useEffect(() => {
    const fetchBus = async () => {
      try {
        const response = await getBusDetailsById(busId);
        console.log("Fetched Bus:", response.data);
        setBus(response.data);
      } catch (error) {
        console.error("Error fetching bus details:", error);
      }
    };
    fetchBus();
  }, [busId]);

  if (!bus) return <p>Loading bus details...</p>;

  return (
    <div>
      <h2>Bus Details</h2>
      <p><strong>Name:</strong> {bus.busName}</p>
      <p><strong>Number:</strong> {bus.busNo}</p>
      <p><strong>Type:</strong> {bus.busType}</p>
      <p><strong>SeatType:</strong> {bus.seatType}</p>
      <p><strong>Operator:</strong> {bus.operatorName}</p>
      {/* Add more fields as needed */}
    </div>
  );
};

export default BusDetails;
