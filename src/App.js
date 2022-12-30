import './App.css';
import React, {useState} from 'react'
import Axios from 'axios'

import LoginForm from './components/LoginForm';
import FinalForm from './components/FinalForm';
import ForgotPassword from './components/ForgotPassword';

import { API_ENDPOINT } from './API';

function App() {
  const [verified, setVerified] = useState(false);
  const [user, setUser] = useState({name:"", token:"", level:""})
  const [error, setError] = useState("");
  const [signedIn, setSignIn] = useState("");
  const [totalTime, setTime] = useState("");
  const [currUser, setCurrUser] = useState(user.name)
  const [loading, setLoading] = useState("")
  const [status, setStatus] = useState("")
  const [forgot, setForgot] = useState("")

  const Login = details => {  
    setError("Loading...")

    Axios.get(API_ENDPOINT + "?type=signin&name=" + details.name + "&pw=" + details.password).then((response) => {

      console.log(response)
      if(response.data !== false){
        console.log(response.data)


        if(response.data["name"] === details.name){
          setUser({
            name: response.data["name"],
            token: response.data["token"],
            level: response.data["level"]
          })

          setVerified(true)
        }

        if(!verified){
          setError("Details do not Match")
        }
      } else {
        setError("Details do not Match")
      }
    })
  }

  const Logout = () => {
    Axios.get(API_ENDPOINT + "?token=" + user.token + "&type=signout&name=" + user.name).then((response) => {
      setSignIn("")
      setTime("")
      setError("")
      setStatus("")
      setForgot("")
      setUser({name: "", token : "", level: ""})
    })
    // console.log('helo')
    
  }

  const requestName = () => {
    setSignIn("Logging activity...")
    Axios.post(API_ENDPOINT + "?token=" + user.token + "&type=logname&name=" + user.name).then((response) =>{
      if (response.data["status"] === null) setSignIn("Error: " + response.data["error"])
      else setSignIn("You've logged " + response.data["status"] + "!")
    })
  }

  const getTotalTime = () => {
    var currName = user.name
    
    getTotalTimeAdmin(currName);
  }

  const adminRequestName = name => {
    if (name === "") name = user.name;

    setStatus("Loading...")
    Axios.post(API_ENDPOINT + "?token=" + user.token + "&type=logname&name=" + name).then((response) => {
      if (response.data["status"] === undefined) setStatus("Error: " + response.data["error"])
      else setStatus("You've logged " + name + " " + response.data["status"] + "!")
    })
  }

  const getTotalTimeAdmin = name => {
    if (name === "") name = user.name;
    
    setTime("Loading....")

    Axios.get(API_ENDPOINT + "?token=" + user.token + "&type=totalTime&name=" + name).then((response) =>{
      console.log(response.data["totalTime"])
      // completeTime = response.data

      setTime(Math.round(response.data["totalTime"]*100)/100 + " hours")
    })

  }

  



  const renderSwitch = pw =>{
    // if(pw != ""){
    //   return <FinalForm Logout = {Logout} requestName = {requestName} getTotalTime = {getTotalTime} signedIn = {signedIn} totalTime = {totalTime} user = {user} adminRequestName = {adminRequestName} status = {status} getTotalTimeAdmin = {getTotalTimeAdmin}/> 
    // }else if (pw == "forgot"){
      // return <ForgotPassword  error = {error} forgotPw = {forgotPw} Logout={Logout} />
    // }else{
    //   return <LoginForm Login = {Login} error = {error} loading = {loading} setError={setError} setUser ={setUser} user = {user} changeUserPw = {changeUserPw}/>
    // }

    // if(pw != "forgot"){
      // return <LoginForm Login = {Login} error = {error} loading = {loading} setError={setError} setUser ={setUser} user = {user} changeUserPw = {changeUserPw}/>
    // } else if(pw == "forgot"){
    //   return <ForgotPassword  error = {error} forgotPw = {forgotPw} Logout={Logout}/>
    // } else {
      // return <FinalForm Logout = {Logout} requestName = {requestName} getTotalTime = {getTotalTime} signedIn = {signedIn} totalTime = {totalTime} user = {user} adminRequestName = {adminRequestName} status = {status} getTotalTimeAdmin = {getTotalTimeAdmin}/> 
    // }
    if(forgot === "true"){
      return <ForgotPassword  error = {error} forgotPw = {forgotPw} Logout={Logout} />
    } else if(user.token !== ""){
      return <FinalForm Logout = {Logout} requestName = {requestName} getTotalTime = {getTotalTime} signedIn = {signedIn} totalTime = {totalTime} user = {user} adminRequestName = {adminRequestName} status = {status} getTotalTimeAdmin = {getTotalTimeAdmin} changeUserPw={changeUserPw}/> 
    } else {
      return <LoginForm Login = {Login} error = {error} loading = {loading} setError={setError} setUser ={setUser} user = {user} changeUserPw = {changeUserPw}/>
    }

  }

  const changeUserPw = () =>{
    // setUser({password:"forgot"})
    // console.log(user.password)

    setForgot("true")

    // if(user.password == "forgot"){
    //   console.log("equal deez nuts")
    // }
  }

  const forgotPw = details =>{
    Axios.get(API_ENDPOINT + "/exec?token=" + user.token + "&type=changepw&oldpw=" + details.oldpw + "&newpw=" + details.newpw).then((response) => {
      if(response.data["success"] === true){
        setError("Success! You reset your password")
      } else {
        setError("Details do not match")
      }
    })

    console.log("Submitted")

    // console.log(details.name)
    // console.log(details.oldpw)
    // console.log(details.newpw)
    
  }

  return (
    <div className="App">
      {/* {(user.password != "")  ?  (
          <FinalForm Logout = {Logout} requestName = {requestName} getTotalTime = {getTotalTime} signedIn = {signedIn} totalTime = {totalTime} user = {user} adminRequestName = {adminRequestName} status = {status} getTotalTimeAdmin = {getTotalTimeAdmin}/>
      ) :(
        <LoginForm Login = {Login} error = {error} loading = {loading} setError={setError} setUser ={setUser} user = {user}/>
      )} */}

      {renderSwitch(user.password)}

      {/* <ForgotPassword  error = {error} forgotPw = {forgotPw} Logout={Logout} /> */}

      
    </div>

  );
}

export default App;
