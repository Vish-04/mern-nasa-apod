import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios'
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

function App() {

  const [imgURL, setImgURL] = useState("https://i.pinimg.com/564x/55/0f/b6/550fb6e2f4b248f3eaec00cd956a3d91.jpg");
  const[popup, setPopup] = useState('none');
  const [logged, setLogged] = useState(false);
  var sessionObject = JSON.parse(sessionStorage.getItem("sessionObject"));
  
  useEffect(()=>{
    var sessionObject = JSON.parse(sessionStorage.getItem("sessionObject"));
    
    if (sessionObject != null){
      setLogged(true);
      
      const currentDate = new Date();
  
      if( Date.parse(currentDate) < Date.parse(sessionObject.expiresAt)){
        sessionObject.expiresAt = new Date(currentDate.getTime() + 30 * 60 * 1000);
        sessionStorage.setItem('sessionObject', JSON.stringify(sessionObject));
      } else{
        sessionStorage.removeItem('sessionObject');
        setLogged(false);
        setPopup('login');
      }
    } else{
      setLogged(false);
    }

    const fetchImage = async () => {
      try{
        const response = await axios.get('https://api.nasa.gov/planetary/apod?api_key=DTPovGU4DQqv3qsDW3sWRyPa30IHhGIS0zYux9lK', {})
        setImgURL(response.data.url);
      }
      catch(error){
        console.warn(error);  
      }
    }

    fetchImage();
  },[]);


  const loginPopup = () => {
    (popup != 'login') ? setPopup('login') : setPopup('none')
  }

  const signupPopup = () => {
    (popup != 'signup') ? setPopup('signup') : setPopup('none')
  }

  const logout = () =>{
    setLogged(false);
    sessionStorage.setItem("sessionObject", null);
  }

  const deleteAccount = async () =>{
    if (sessionObject.userInfo.username == "GoogleSignIn2023"){
      logout();
    } else{
      try{
        const response = await axios.get('http://localhost:5000/users/delete/' + sessionObject.userInfo.id); 
        logout();
      } catch(error){
        console.warn(error);
      }
    }
  }

  return (
    <div className="app">

      {/* TOP UTIL */}
      <div className='nav'>
        {logged ? 
        <>
        <div 
          className='login'
          onClick={()=>{logout();}}
        > Log Out </div>
        <div 
          className='signup'
          onClick ={()=>{deleteAccount();}}
        > Delete Account </div> </>: 
        <>
        <div 
          className='login'
          onClick={()=>{loginPopup();}}
        > Login </div>
        <div 
          className='signup'
          onClick ={()=>{signupPopup();}}
        > Signup </div> </>}
      </div>

      {/* BODY CONTENT */}
      <div className='content'>
          <h1 className='title'>NASA PICTURE OF THE DAY!</h1>
          
          {/* NASA APOD */}
          {logged?
          <div className='image'>
            <img src={imgURL} />
          </div> : 
          <div className='not-logged'>
            <h1> USER IS NOT SIGNED IN</h1>
            <p> Please <a href='' onClick={(e)=>{
              e.preventDefault()
              setPopup('login')
            }}>sign in</a>  or <a href='' onClick={(e)=>{
              e.preventDefault();
              setPopup('signup')
            }}>create an account</a> to see the image </p>
          </div>
          }

      </div>
      
      {/* LOGIN/SIGNUP PAGES */}
      {popup == 'login' ? <LoginForm popup={setPopup}/> : null}
      {popup == 'signup'? <SignupForm popup={setPopup} /> : null}
      
    </div>
  );
}

export default App;
