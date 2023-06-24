import React, { useState } from "react";
import { createUser } from "./login";
import "./LoginForm.css";


const SignupForm = ({popup}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState({value: false, message:""});
    const [success, setSuccess] = useState(false);

    const handleCreateAccount = async() =>{
        const result = await createUser(username, password, confirmPassword)
        setError(result)
        if (!result.value){
            setSuccess(true)
            setTimeout(()=>{popup('login');},1000)
        }
    }

  return (
    <div style={styles.container}>
      <div className="page">
        <div className="cover">
          <h1>Register</h1>
          <input 
                type="text" 
                placeholder="username" 
                className="login-input"
                value = {username}
                onChange={(event)=>{
                  setUsername(event.target.value);
                }}
              />
          <input 
              type="password"
              placeholder="password"
                className="login-input"
                value = {password}
              onChange={(event) =>{
              setPassword(event.target.value);
              }}
          />
          <input 
              type="password"
              placeholder="confirm password"
              className="login-input"
              value = {confirmPassword}
              onChange={(event) =>{
              setConfirmPassword(event.target.value);
              }}
          />

          {error.value ? <p style={{color:"red", fontSize: 16, textAlign: "center" }}>{error.message}</p> : null}
          {success ? <p style={{color:"green", fontSize: 16, textAlign: "center" }}>Account Creation Sucessful!</p> : null}
          <div 
              className="login-btn"
              onClick={handleCreateAccount}
          >Register</div>
          <p className="text">
            Already have an account?{" "}
            <a 
                href="/"
                onClick={(e)=>{
                    e.preventDefault();
                    popup('login');
                }}
            >Log in</a>
          </p>
          <button 
            style={styles.back} 
            onClick={()=>{popup('none')}}    
          >BACK</button>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;


const styles = {
  container:{
    width:'100vw', 
    height:"100vh", 
  },
  back:{
    position: 'absolute',
    top: 20,
    left: 20,
    color: 'black',
  },
}