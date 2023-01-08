import './App.css'
import React, {useState} from 'react'
import Axios from 'axios'
import {Buffer} from 'buffer'
import Cookies from 'universal-cookie'

import LoginForm from './components/LoginForm';
import FinalForm from './components/FinalForm';
import ForgotPassword from './components/ForgotPassword';

import { API_ENDPOINT } from './API';

function App() {
  const cookies = new Cookies();
  const [user, setUser] = useState({name:"", token:"", level:""})
  const [error, setError] = useState("");
  const [signedIn, setSignIn] = useState("");
  const [totalTime, setTime] = useState("");
  const [status, setStatus] = useState("")
  const [forgot, setForgot] = useState(false)
  const [resetPwState, setResetPwState] = useState({backAllowed:true, old:""});
  const [changePasswordSubmitLabel, setChangePasswordSubmitLabel] = useState("SUBMIT")
  const [showCPWSuccessLabel, setShowCPWSuccessLabel] = useState(false)
  const [signinLabel, setSigninLabel] = useState("Sign In")
  const [dateVal, setDateVal] = useState("")

  if (user.name === "") {
    let userCookie = cookies.get('user');
    console.log(userCookie)
    if (userCookie !== undefined) {
      let userBuffer = Buffer.from(userCookie, 'base64').toString('utf8');
      let userdata = JSON.parse(userBuffer);
      console.log(userdata);
      if (userdata.name !== "" && userdata.level !== "" && userdata.token !== "") {
        setUser(userdata);
      }
    }
  }

  const Login = details => {  
    setSigninLabel("Please Wait...");
    setError("");

    apiRequest(Axios.get, {type: "signin", name: details.name, pw: details.password}).then((response) => {
      setSigninLabel("Sign In")
      if(response.data !== false){
        console.log(response.data)

        if(response.data["name"] === details.name){
          setError("")
          let userdata = {
            name: response.data["name"],
            token: response.data["token"],
            level: response.data["level"]
          }
          setUser(userdata)

          cookies.set('user', Buffer.from(JSON.stringify(userdata), 'utf8').toString('base64'), {path: '/', sameSite: 'strict', secure:true});
          
          if (response.data["level"] === "change_password") {
            setResetPwState({backAllowed:false, old:details.password});
            setForgot(true);
            cookies.remove('user');
          }
        } else {
          setError(response.data["error"])
        }
      } else {
        setError("API Error")
      }
    })
  }

  const Logout = () => {
    apiRequest(Axios.get, {type: "signout", name: user.name}).then((response) => {
      signOut();
    })    
  }

  const signOut = () => {
    cookies.remove('user');
    setSignIn("")
    setTime("")
    setError("")
    setStatus("")
    setForgot(false)
    setUser({name: "", token : "", level: ""})
    
  }

  const requestName = () => {
    setSignIn("Logging activity...")
    apiRequest(Axios.post, {type: "logname", name: user.name}).then((response) =>{
      if (response.data["status"] === null) setSignIn("Error: " + response.data["error"])
      else setSignIn("You've logged " + response.data["status"] + "!")
    })
  }

  const getTotalTime = () => {
    getTotalTimeAdmin(user.name);
  }

  const adminRequestName = name => {
    if (name === "") name = user.name;

    setStatus("Loading...")
    apiRequest(Axios.post, {type: "logname", name: name}).then((response) => {
      if (response.data["status"] === undefined) setStatus("Error: " + response.data["error"])
      else setStatus("You've logged " + name + " " + response.data["status"] + "!")
    })
  }

  const getTotalTimeAdmin = (name, currDate) => {
    if (name === "") name = user.name;

    setTime("Loading....")

    apiRequest(Axios.get, {type: "totalTime", name: name, date:currDate}).then((response) =>{
      console.log(response.data["totalTime"])

      setTime(Math.round(response.data["totalTime"]*100)/100 + " hours")
    })

    setTimeout(function(){
      setDateVal("")
    }.bind(this),2500);  
  }

  
  const apiRequest = (http, params) => {
    let query = "?"

    if (params.type !== "signin") query += "token=" + user.token + "&"

    if (Object.keys(params).length >= 1) {
      for (const [key, value] of Object.entries(params)) {
        query += key + "=" + value + "&";
      }
      query = query.substring(0, query.length - 1);
    }

    return http(API_ENDPOINT + query).then((response) => {
      if (response.data["error"] == "Not Authorized") {
        signOut();
      }
      return response;
    })
  }

  const forgotPw = details =>{
    let old = (details.oldpw === "" ? resetPwState.old : details.oldpw)
    apiRequest(Axios.post, {type: "changepw", oldpw: old, newpw: details.newpw}).then((response) => {
      if(response.data["result"] === "success"){
        setError("")
        setShowCPWSuccessLabel(resetPwState.backAllowed)
        setForgot(false)
        setChangePasswordSubmitLabel("SUBMIT")
        setUser({...user, level: response.data["level"]})
        setResetPwState({backAllowed:true,old:""})
      } else {
        setChangePasswordSubmitLabel("SUBMIT")
        setError(response.data["error"])
      }
    })

    console.log("Submitted")
  }
  
  const renderSwitch = (token) =>{
    if(forgot){
      return <ForgotPassword 
          resetState={resetPwState}
          error={error} 
          setError={setError}
          forgotPw={forgotPw}
          back={() => setForgot(false)}
          submitLabel={changePasswordSubmitLabel}
          setSubmitLabel={setChangePasswordSubmitLabel}
        />
    } else if(token !== ""){
      return <FinalForm 
          Logout={Logout} 
          requestName={requestName} 
          getTotalTime={getTotalTime} 
          signedIn={signedIn} 
          totalTime={totalTime} 
          user={user} 
          label={showCPWSuccessLabel}
          adminRequestName={adminRequestName} 
          status={status} 
          getTotalTimeAdmin={getTotalTimeAdmin} 
          changeUserPw={() => {setForgot(true); setShowCPWSuccessLabel(false);}}
          dateVal = {dateVal}
          setDateVal = {setDateVal}
        /> 
    } else {
      return <LoginForm 
          Login={Login} 
          error={error}
          signinLabel={signinLabel}
        />
    }
  }

  console.log("hello world!")

  return (
    <div className="App">
      {renderSwitch(user.token)}      
    </div>
  );
}

export default App;
