import { useState } from "react";
import "./register.css";
import axios from "axios";
import { Link } from "react-router-dom";
export default function Register() {
  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState();
  async function handelSubmit(e){
    e.preventDefault();
    setError(false);
    try{
      const res = await axios.post('https://tblogapp.onrender.com/api/auth/register/',{
        username,
        password,
        email
      });
      res.data && window.location.replace("/login");
    }
    catch(err){
      setError(true);
      console.log(err);
    }
    
  }
  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handelSubmit}>
        <label>Username</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your username..."
          onChange={(e)=>setUsername(e.target.value)}
        />
        <label>Email</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your email..."
          onChange={(e)=>setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          className="registerInput"
          type="password"
          placeholder="Enter your password..."
          onChange={(e)=>setPassword(e.target.value)}
        />
        <button type="submit" className="registerButton">Register</button>
      </form>
      <button className="registerLoginButton">
        <Link className="link" to="/login">
          Login
        </Link>
      </button>
      {error && <span style={{color:"red",marginTop: "10px"}}>Something went wrong !</span>}
    </div>
  );
}
