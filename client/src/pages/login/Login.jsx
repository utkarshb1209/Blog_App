import { useContext, useRef } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { Context } from "../../Context/Context";
export default function Login() {

  const userRef = useRef();
  const passwordRef = useRef();
  const {dispatch,isFetching} = useContext(Context);
  
  async function handelSubmit(e){
    e.preventDefault();
    dispatch({type:"LOGIN_START"});
    try{
      const res = await axios.post('https://tblogapp.onrender.com/api/auth/login',{
        username : userRef.current.value,
        password : passwordRef.current.value,
      })
      dispatch({type:"LOGIN_SUCCESS", payload: res.data});
    }
    catch(err){
      dispatch({type:"LOGIN_FAILURE"});
      
    }
  }

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handelSubmit}>
        <label>Username</label>
        <input
          className="loginInput"
          type="text"
          placeholder="Enter your Username..."
          ref = {userRef}
        />
        <label>Password</label>
        <input
          className="loginInput"
          type="password"
          placeholder="Enter your password..."
          ref = {passwordRef}
        />
        <button className="loginButton" disabled={isFetching}>Login</button>
      </form>
      <button className="loginRegisterButton">
        <Link className="link" to="/register">
          Register
        </Link>
      </button>
    </div>
  );
}
