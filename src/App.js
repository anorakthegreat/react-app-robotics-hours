import './App.css'
import React, {useState} from 'react'
import Axios from 'axios'
import {Buffer} from 'buffer'
import Cookies from 'universal-cookie'

import SigninForm from './components/SigninForm';
import AdminForm from './components/AdminForm';
import UserForm from './components/UserForm';
import MuggleForm from './components/MuggleForm';
import ForgotPassword from './components/ForgotPassword';
import CollectionView from './components/CollectionView';

import { API_ENDPOINT } from './API';
import Top5 from './components/Top5'

function App() {
  const cookies = new Cookies();
  const [user, setUser] = useState({name:"", token:"", level:""})
  const [error, setError] = useState("");
  const [totalTime, setTime] = useState("");
  const [status, setStatus] = useState("")
  const [forgot, setForgot] = useState(false)
  const [resetPwState, setResetPwState] = useState({backAllowed:true, old:""});
  const [changePasswordSubmitLabel, setChangePasswordSubmitLabel] = useState("SUBMIT")
  const [showCPWSuccessLabel, setShowCPWSuccessLabel] = useState(false)
  const [dateVal, setDateVal] = useState("")
  const [collection, setCollection] = useState({show:false, data:{}, start:'all time', end:'present'})
  const[top5, setTop5] = useState([{name:"", hours:"", dates:""}]);
  const[leaderboard, setLeaderboard] = useState("")
  // const[top5, setTop5] = useState("");

  // const [data, setData] = useState([])

  if (user.name === "") {
    let userCookie = cookies.get('user');
    if (userCookie !== undefined) {
      let userBuffer = Buffer.from(userCookie, 'base64').toString('utf8');
      let userdata = JSON.parse(userBuffer);
      console.log(userdata);
      if (userdata.name !== "" && userdata.level !== "" && userdata.token !== "") {
        setUser(userdata);
      }
    }
  }

  const onSignin = (userdata, pw) => {
    setUser(userdata)
    
    cookies.set('user', Buffer.from(JSON.stringify(userdata), 'utf8').toString('base64'), {path: '/', sameSite: 'strict', secure:true});
    
    if (userdata.level === "change_password") {
      setResetPwState({backAllowed:false, old:pw});
      setForgot(true);
      cookies.remove('user');
    }
  }
  
  const onSignout = () => {
    apiRequest(Axios.get, {type: "signout", name: user.name}).then((response) => {
      cookies.remove('user');
      setTime("")
      setError("")
      setStatus("")
      setForgot(false)
      setUser({name: "", token : "", level: ""})
      setCollection({show:false, data:{}, start:'all time', end:'present'})
    })
  }

  

  const getTotalTime = () => {
    setTime("Loading....")
    
    apiRequest(Axios.get, {type: "totalTime", name:user.name}).then((response) =>{
      console.log(response.data["totalTime"])
  
      setTime(Math.round(response.data["totalTime"]*100)/100 + " hours")
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
      if (response.data["error"] === "Not Authorized") {
        apiRequest(Axios.get, {type: "signout", name: user.name}).then((response) => {
          onSignout();
        })
      }
      return response;
    })
  }
  
  const renderSwitch = (token) =>{

    if(leaderboard == "true"){
      return <Top5 top5 = {top5} setTop5 = {setTop5} apiRequest={apiRequest} setLeaderboard = {setLeaderboard}/>
    } else if(forgot){
      return <ForgotPassword 
          resetState={resetPwState}
          error={error} 
          setError={setError}
          forgotPw={forgotPw}
          back={() => setForgot(false)}
          submitLabel={changePasswordSubmitLabel}
          setSubmitLabel={setChangePasswordSubmitLabel}
        />
    } else if (collection.show) {
      return <CollectionView
          collection={collection}
          back={() => setCollection({...collection, show:false})}
        />
    } else if(token !== ""){
      if(user.level === "user"){
        return(          
            <UserForm
            apiRequest={apiRequest}
            onSignout={onSignout}
            setTime={setTime}
            collection={collection}
            setCollection={setCollection}
            totalTime={totalTime}
            user={user}
            changeUserPw={() => {setForgot(true); setShowCPWSuccessLabel(false);}}
            label={showCPWSuccessLabel}
            setLeaderboard = {setLeaderboard}
            />
        )
    } else if(user.level === "admin"){
        return(
            <AdminForm
            apiRequest={apiRequest}
            onSignout={onSignout}
            collection={collection}
            setCollection={setCollection}
            user={user}
            showCPWSuccessLabel={showCPWSuccessLabel}
            changeUserPw={() => {setForgot(true); setShowCPWSuccessLabel(false);}}
            setLeaderboard = {setLeaderboard}
            // status={status}
            // totalTime={totalTime}
            // changeUserPw={() => {setForgot(true); setShowCPWSuccessLabel(false);}}
            // label={showCPWSuccessLabel}
            // dateVal={dateVal}
            // setDateVal={setDateVal}
            // collectLabel={collectLabel}
            // setCollectLabel={setCollectLabel}
            />
        )
    } else if(user.level === "limited"){
        return(
            <MuggleForm
            apiRequest={apiRequest}
            onSignout={onSignout}
            totalTime={totalTime}
            setTime={setTime}
            user={user}
            changeUserPw={() => {setForgot(true); setShowCPWSuccessLabel(false);}}
            label={showCPWSuccessLabel}
            />
        )
    }
    } else {

      if(leaderboard === "true"){
        return <Top5 top5 = {top5} setTop5 = {setTop5} apiRequest={apiRequest} setLeaderboard = {setLeaderboard}/>
      } else {
        return (
          <SigninForm
            apiRequest={apiRequest}
            onSignin={onSignin}
            setLeaderboard = {setLeaderboard}
          />
        )
      }
      
    }
  }

  return (
    <div className="App">
      {renderSwitch(user.token)}      
      {/* <Top5 top5 = {top5} setTop5 = {setTop5} apiRequest={apiRequest}/> */}
    </div>
  );
}

export default App;
