import './App.css';
import React, {useState} from 'react'
import LoginForm from './components/LoginForm';
import UserForm from './components/UserForm';

import Axios from 'axios'
import FinalForm from './components/FinalForm';
import ForgotPassword from './components/ForgotPassword';

function App() {
  const verified = false;
  const sheetId = "AKfycbyFtFKKr1HPIoii50lKM_uNQCkISTchTHGvpeHFQzY7-uWhhqGj51cefe9onIE1HgSG"
  const[user, setUser] = useState({name:"", password:"", level:""})
  const[error, setError] = useState("");
  const[signedIn, setSignIn] = useState("");
  const[totalTime, setTime] = useState("");
  const[currUser, setCurrUser] = useState(user.name)
  const[loading, setLoading] = useState("")
  const[status, setStatus] = useState("")
  const[forgot, setForgot] = useState("")

  const Login = details => {  
    setError("Loading...")

    Axios.get("https://script.google.com/macros/s/" + sheetId + "/exec?token=52fa80662e64c128f8389c9ea6c73d4c&type=namePresent&name=" + details.name).then((response) => {

      console.log(response)
      if(response.data != false){
        console.log(response.data)


        if(response.data["name"] == details.name && response.data["password"] == details.password){
          setUser({
            name: details.name,
            password: details.password,
            level: response.data["level"]
          })

          verified = true;
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
    setSignIn("")
    setTime("")
    setError("")
    setStatus("")
    setForgot("")
    setUser({name: "", password : ""})
    // console.log('helo')
    
  }

  const requestName = () => {
    
    // setsignIn( {user.name})

    setSignIn("You've signed in!")
    const currName = user.name
    Axios.get("https://script.google.com/macros/s/" + sheetId + "/exec?token=52fa80662e64c128f8389c9ea6c73d4c&type=logname&name=" + currName )
  }

  const getTotalTime = () => {
    var currName = user.name
    var completeTime = 0;

    setTime("Loading....")

    Axios.get("https://script.google.com/macros/s/" + sheetId + "/exec?token=52fa80662e64c128f8389c9ea6c73d4c&type=totalTime&name="+currName+"&date=2022-10-29").then((response) =>{
      
    
      console.log(response.data["total time"])
      // completeTime = response.data

      setTime(Math.round(response.data["total time"]) + " minutes")
      
      

    })
    
  }

  const adminRequestName = name => {
    setStatus("Loading")
    Axios.get("https://script.google.com/macros/s/" + sheetId + "/exec?token=52fa80662e64c128f8389c9ea6c73d4c&type=logname&name="+name)
    setStatus("You've signed " + name + " in!")
  }

  const getTotalTimeAdmin = name => {
    var completeTime = 0;

    setTime("Loading....")

    Axios.get("https://script.google.com/macros/s/" + sheetId + "/exec?token=52fa80662e64c128f8389c9ea6c73d4c&type=totalTime&name="+name+"&date=2022-10-29").then((response) =>{
      
    
      console.log(response.data["total time"])
      // completeTime = response.data

      setTime(Math.round(response.data["total time"]) + " minutes")
      
      

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
    if(forgot == "true"){
      return <ForgotPassword  error = {error} forgotPw = {forgotPw} Logout={Logout} />
    } else if(user.password != ""){
      return <FinalForm Logout = {Logout} requestName = {requestName} getTotalTime = {getTotalTime} signedIn = {signedIn} totalTime = {totalTime} user = {user} adminRequestName = {adminRequestName} status = {status} getTotalTimeAdmin = {getTotalTimeAdmin}/> 
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
    Axios.get("https://script.google.com/macros/s/" + sheetId + "/exec?token=52fa80662e64c128f8389c9ea6c73d4c&type=forgotPw&name="+details.name+"&oldPw="+details.oldpw+"&newPw="+details.newpw).then((response) => {
      if(response.data["success"] == true){
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
