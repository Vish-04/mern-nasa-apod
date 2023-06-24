import bcrypt from "bcryptjs";
import axios from "axios";


export const authenticateLogin = async (username, password) => {
    
    let user;

    // validation checks
    if (!username.trim()) {
        return {value: true, message: "Username cannot be empty"};
    }
    if (!password.trim()) {
    return {value: true, message: "Confirm password cannot be empty"};
    }

    // see if username exists
    try{
        user = await axios.get('http://localhost:5000/users/'+username,{
            headers: {
              'Access-Control-Allow-Origin': 'http://127.0.0.1:5173'
            }
          });
    } catch (error) {
        return {value: true, message:"Server Error: Unable to crosscheck username, please try again later"};
    }

    if(user.data == null){
        return {value: true, message:"User does not exist"}
    }
    
    if (bcrypt.compareSync(password, user.data.password)){
        var now = new Date();
        var expires = new Date(now.getTime() + 30 * 60 * 1000); // 30 minutes from now
        var sessionObject = {
        expiresAt: expires,
        userInfo: {
            username: user.data.username,
            id: user.data._id,
            }
        }
        sessionStorage.setItem('sessionObject', JSON.stringify(sessionObject));
        return{value:false, message:""}
    }

    return {value: true, message: "Username and password do not match"}
 
}

export const createUser = async(username, password, confirmPassword) =>{
    let user;

    const post_url = 'http://localhost:5000/users/'+username
    // validation checks
    if (!username.trim()) {
        return {value: true, message: "Username must be at least 3 characters long"};
    }

    // see if username exists
    try{
        user = await axios.get(post_url, {username:username, 
            headers: {
              'Access-Control-Allow-Origin': 'http://127.0.0.1:5173'
            }
          })
    } catch (error) {
        console.log(error)
        return {value: true, message:"Unable to crosscheck username"};
    }

    if(user.data != null){
        return {value: true, message:"User already exists"}
    }

    if (password.length < 8) {
    return {value: true, message: "Password must be at least 8 characters long"};
    }
    if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/.test(password)) {
    return {value: true, message: "Password must contain at least one uppercase letter, one lowercase letter, and one number"};
    }
    if (!confirmPassword.trim()) {
    return {value: true, message: "Confirm password cannot be empty"};
    }
                    

    if (password === confirmPassword){
        
        const hashedPassword = bcrypt.hashSync(password, 10);
    
        const user = {
            username: username,
            password: hashedPassword,
            headers: {
                  'Access-Control-Allow-Origin': 'http://127.0.0.1:5173'
            }
        }
        
        // create user
        try{
            axios.post('http://localhost:5000/users/add', user)
            .then(res=> console.log(res.data));
        } catch (error) {
            return {value: true, message:"Server Error: Unable to create account, please try again later"};
        }
        return {value: false, message:""}
    } else{
        return {value: true, message:"Password and confirm password do not match"};
    }
}