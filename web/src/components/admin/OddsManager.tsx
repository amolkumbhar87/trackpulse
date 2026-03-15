// src/components/admin/AdminRaceManagement.jsx
import { useState } from "react";
import '../../styles/OddsManager.css';
import { Badge, Button, Form, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import RaceList from "../shared/RaceList";
import DatePicker from "react-datepicker";
import { RaceDatePicker } from "../custom/RaceDatePicker";


const formatDate = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`; // always local date, no UTC shift
};

export default function OddsManager() {
  
  
  
  const [selectedCity, setSelectedCity] = useState("Mumbai");
  const [selectedDate, setSelectedDate] = useState(new Date());

  

  
  const cities = ["Mumbai", "Pune", "Bangalore", "Mysore", "Hyderabad", "Kolkata", "Chennai", "Delhi"]; 
    return (
    <>
      <div className="arm-root">

<div>
  <RaceDatePicker value={selectedDate} onChange={(date) => setSelectedDate(date)} /> 
    
  
</div>


      <div>

      <ul className="d-flex gap-3 list-unstyled border-bottom pb-2">
        {cities.map((city) => (
          <li
            key={city}
            onClick={() => setSelectedCity(city)}
            style={{
              cursor: "pointer",
              fontWeight: selectedCity === city ? "bold" : "normal",
              borderBottom: selectedCity === city ? "3px solid red" : "none",
              paddingBottom: "5px"
            }}
          >
            {city}
          </li>
        ))}
      </ul>

      {/* RaceList component placeholder */}
      <div style={{ color: "#ef4444", fontSize: 13, margin: "12px 0" }}>        
        <RaceList city={selectedCity} date={formatDate(selectedDate)} />
      </div>

    </div>


        
      </div>
    </>
  );
}