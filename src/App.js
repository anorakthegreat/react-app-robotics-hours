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
  const [collectLabel, setCollectLabel] = useState("Collect All Student Data");
  const [collection, setCollection] = useState({show:false, data:{}, start:'all time', end:'present'})

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

  const collectData = (startDate, endDate) => {
    let date = new Date(Date.now());
    let today = date.toISOString().substring(0, 10);

    let start = startDate ? startDate : today;
    let end = endDate ? endDate : today;

    apiRequest(Axios.get, {type: "collect", startDate: start, endDate: end}).then((response) =>{
      console.log(response.data);
      setCollectLabel("Collect All Student Data")

      if (response.data["data"]) {
        setCollection({...collection, show: true, data: response.data["data"], start: startDate ? startDate : 'all time', end: endDate ? endDate : 'present'})
      }
    })
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
            getTotalTime={getTotalTime}
            totalTime={totalTime}
            user={user}
            changeUserPw={() => {setForgot(true); setShowCPWSuccessLabel(false);}}
            label={showCPWSuccessLabel}
            />
        )
    } else if(user.level === "admin"){
        return(
            <AdminForm
            apiRequest={apiRequest}
            onSignout={onSignout}
            status={status}
            totalTime={totalTime}
            changeUserPw={() => {setForgot(true); setShowCPWSuccessLabel(false);}}
            label={showCPWSuccessLabel}
            user={user}
            dateVal={dateVal}
            setDateVal={setDateVal}
            collectData={collectData}
            collectLabel={collectLabel}
            setCollectLabel={setCollectLabel}
            showCollect={() => setCollection({...collection, show:true})}
            collection={collection}
            />
        )
    } else if(user.level === "limited"){
        return(
            <MuggleForm
            apiRequest={apiRequest}
            onSignout={onSignout}
            totalTime={totalTime}
            getTotalTime={getTotalTime}
            user={user}
            changeUserPw={() => {setForgot(true); setShowCPWSuccessLabel(false);}}
            label={showCPWSuccessLabel}
            />
        )
    }
    } else {
      return (
        <SigninForm
          apiRequest={apiRequest}
          onSignin={onSignin}
        />
      )
    }
  }

  return (
    <div className="App">
      {renderSwitch(user.token)}      
    </div>
  );
}

export default App;
