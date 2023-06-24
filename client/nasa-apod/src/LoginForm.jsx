import React, { useState } from "react";
import { authenticateLogin } from "./login";
import "./LoginForm.css";


const LoginForm = ({popup}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({value: false, message:""});
  const [success, setSuccess] = useState(false);



  const handleLogIn = async() =>{
    const result = await authenticateLogin(username, password)
    setError(result)
    if (!result.value){
        sessionStorage.setItem("logIn", "true");
        setSuccess(true)
        setTimeout(()=>{popup('none')}, 1000)
        window.location.href = "/"
    }
}

    return (
      <div style={styles.container}>
        <div className="page">
          <div className="cover">
            <h1>Login</h1>
              <input 
                type="text" 
                placeholder="Username" 
                className="login-input"
                value = {username}
                onChange={(event)=>{
                  setUsername(event.target.value);
                }}
              />
              <input 
                type="password"
                placeholder="Password"
                className="login-input"
                value = {password}
                onChange={(event) =>{
                  setPassword(event.target.value);
                }}
              />

              {error.value ? <p style={{color:"red", fontSize: 16, textAlign: "center" }}>{error.message}</p> : null}
              {success ? <p style={{color:"green", fontSize: 16, textAlign: "center" }}>Login Sucessful!</p> : null}

              
              <div 
                className="login-btn"
                onClick={handleLogIn}
                >Login</div>
            <p className="text">
              Don't Have An Account?{" "}
              <a 
                href="" 
                onClick={(e)=>{
                e.preventDefault();
                popup('signup')
              }}>
                Create Account</a>
            </p>

            <button 
                style={styles.back} 
                to= "/"
                onClick={()=>{popup('none');}}
            >BACK</button>
          </div>
        </div>
      </div>
    );
            
}
export default LoginForm;

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
