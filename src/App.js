import './App.css';
import React, {useState} from 'react'
import LoginForm from './components/LoginForm';
import UserForm from './components/UserForm';

import Axios from 'axios'
import FinalForm from './components/FinalForm';

function App() {
  const verified = false;

  const[user, setUser] = useState({name:"", password:"", level:""})
  const[error, setError] = useState("");
  const[signedIn, setSignIn] = useState("");
  const[totalTime, setTime] = useState("");
  const[currUser, setCurrUser] = useState(user.name)
  const[loading, setLoading] = useState("")
  const [status, setStatus] = useState("")

  const Login = details => {  
    setError("Loading...")

    Axios.get("https://script.google.com/macros/s/AKfycbzrZrUGdpTtUfUF2XYvUuSMQk6-LUB839QOnkUfuZcv07LbudNkJjSq6Vg22luMY7SL6w/exec?token=52fa80662e64c128f8389c9ea6c73d4c&type=namePresent&name=" + details.name).then((response) => {

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
    setUser({name: "", password : ""})
    
  }

  const requestName = () => {
    
    // setsignIn( {user.name})

    setSignIn("You've signed in!")
    const currName = user.name
    Axios.get("https://script.google.com/macros/s/AKfycbzrZrUGdpTtUfUF2XYvUuSMQk6-LUB839QOnkUfuZcv07LbudNkJjSq6Vg22luMY7SL6w/exec?token=52fa80662e64c128f8389c9ea6c73d4c&type=logname&name=" + currName )
  }

  const getTotalTime = () => {
    var currName = user.name
    var completeTime = 0;

    setTime("Loading....")

    Axios.get("https://script.google.com/macros/s/AKfycbzrZrUGdpTtUfUF2XYvUuSMQk6-LUB839QOnkUfuZcv07LbudNkJjSq6Vg22luMY7SL6w/exec?token=52fa80662e64c128f8389c9ea6c73d4c&type=totalTime&name="+currName+"&date=2022-10-29").then((response) =>{
      
    
      console.log(response.data["total time"])
      // completeTime = response.data

      setTime(Math.round(response.data["total time"]) + " minutes")
      
      

    })
    
  }

  const adminRequestName = name => {
    setStatus("Loading")
    Axios.get("https://script.google.com/macros/s/AKfycbzrZrUGdpTtUfUF2XYvUuSMQk6-LUB839QOnkUfuZcv07LbudNkJjSq6Vg22luMY7SL6w/exec?token=52fa80662e64c128f8389c9ea6c73d4c&type=logname&name="+name)
    setStatus("You've signed " + name + " in!")
  }

  const getTotalTimeAdmin = name => {
    var completeTime = 0;

    setTime("Loading....")

    Axios.get("https://script.google.com/macros/s/AKfycbzrZrUGdpTtUfUF2XYvUuSMQk6-LUB839QOnkUfuZcv07LbudNkJjSq6Vg22luMY7SL6w/exec?token=52fa80662e64c128f8389c9ea6c73d4c&type=totalTime&name="+name+"&date=2022-10-29").then((response) =>{
      
    
      console.log(response.data["total time"])
      // completeTime = response.data

      setTime(Math.round(response.data["total time"]) + " minutes")
      
      

    })

  }

  




  return (
    <div className="App">
      {(user.password != "")  ?  (
          <FinalForm Logout = {Logout} requestName = {requestName} getTotalTime = {getTotalTime} signedIn = {signedIn} totalTime = {totalTime} user = {user} adminRequestName = {adminRequestName} status = {status} getTotalTimeAdmin = {getTotalTimeAdmin}/>
      ) :(
        <LoginForm Login = {Login} error = {error} loading = {loading}/>
      )}
    </div>

  );
}

export default App;
