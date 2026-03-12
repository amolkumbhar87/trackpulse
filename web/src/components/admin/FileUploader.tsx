import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import UploadModal from "../common/UploadModal";
import { useState } from "react";
import axios from "axios";



// ── Styles ────────────────────────────────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

  
`;

// ── Component ─────────────────────────────────────────────────────────────────
export default function FileUploader() {
  
const [races, setRaces] = useState([]);
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleParse = async () => {
    const formData = new FormData();
    formData.append("file", file);

    // Send HTML file to your backend parser endpoint
    const res = await axios.post("/api/races/parse-html", formData);
    setRaces(res.data); // preview before importing
  };

  const handleImport = async () => {
    await axios.post("/api/races/import", races);
    alert("Races imported successfully!");
  };
  
  return (
    <>
      <style>{styles}</style>
      <div className="">

        {/* Page title */}
        <div className="d-flex align-items-center justify-content-between mb-3">
          
          <div className="d-flex gap-2">
            {/* <button  className="btn btn-flex btn-primary" data-bs-toggle="modal" data-bs-target="#uploadModal">
        <i className="ki-duotone ki-folder-up fs-2"><span className="path1"></span><span className="path2"></span></i>        Upload Files
    </button> */}

    <input type="file" accept=".html" onChange={handleFileChange} />
      <button onClick={handleParse}>Parse File</button>

      <button onClick={handleImport}>Import to DB</button>
          </div>
        </div>

        
      </div>
      <UploadModal />
    </>
  );
}