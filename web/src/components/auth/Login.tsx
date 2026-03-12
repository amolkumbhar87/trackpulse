import { useState } from "react";
import {useNavigate} from "react-router-dom";   
import "../../styles/Login.css";

function Login() {

  const [mobile,setMobile] = useState("");
  const [password,setPassword] = useState("");
const navigate = useNavigate();
    

    
  const handleSubmit = (e) => {
    e.preventDefault();

    if(mobile === "1" && password === "1234")
    {
        navigate("/AdminDashboard");
    }
    else
    {
        navigate("/");
        alert("Invalid credentials");
    }
    
    
  }

  return (
    <div className="login-container">

      <form className="login-card" onSubmit={handleSubmit}>

        <h2 className="login-title">Login</h2>

        <div className="input-group">
          <label>Mobile Number</label>
          <input
          type="text"
          placeholder="Enter Mobile Number"
          value={mobile}
          onChange={(e)=>setMobile(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          />
        </div>

        <button className="login-btn">Login</button>

        <p className="login-footer">
          Don't have account? <a href="#">Register</a>
        </p>

      </form>

    </div>
  );
}

export default Login;