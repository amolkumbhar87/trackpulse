import { useEffect, useState } from "react";
import RaceCard from "./RaceCard";

interface RaceListProps {
  city: string;
  date: string;
}



function RaceList({ city, date }: RaceListProps) {
  const [races, setRaces] = useState([]);

  useEffect(() => {
    
    fetch(`https://localhost:7156/api/race/races?cityName=${city}&raceDate=${date}`)
      .then(res => res.json())
      .then(data => setRaces(data));
  }, [city, date]);

  return (
    <>
      {
        races.length === 0 ? ('No races available for this city.') :


          <div className="accordion" id="raceAccordion">

            {races.map((race) => (
              <div className="accordion-item mb-3" key={race.race_id}>

                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#race${race.race_id}`}
                  >
                    Race {race.race_number} - {race.race_name}
                  </button>
                </h2>

                <div
                  id={`race${race.race_id}`}
                  className="accordion-collapse collapse"
                  data-bs-parent="#raceAccordion"
                >
                  <div className="accordion-body">
                    <RaceCard />
                  </div>
                </div>

              </div>
            ))}

          </div>
      }
    </>
  );
}

export default RaceList;