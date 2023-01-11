import React, {useState} from 'react'
import Axios from 'axios'


function UserForm( {apiRequest, onSignout, getTotalTime, totalTime, user, changeUserPw, label}) {

    const [signoutLabel, setSignoutLabel] = useState("Sign Out")
    const [status, setStatus] = useState("");

    const requestName = () => {
        setStatus("Logging activity...")
        apiRequest(Axios.post, {type: "logname", name: user.name}).then((response) =>{
            if (response.data["status"] === null) setStatus("Error: " + response.data["error"])
            else setStatus("You've logged " + response.data["status"] + "!")
        })
    }

    return (
        <div className="gradient">
            <div className='welcome gradient-inner'>
                <h1>Welcome, <span>{user.name}</span></h1>
                <h2>{status}</h2>
                <h2>{totalTime}</h2>
                <div style={{marginTop:'0.5em',display:'flex',flexDirection:'row'}}>
                    <button style={{flex: 1}} onClick={requestName}>Log Time In/Out</button>
                    <span>&nbsp;&nbsp;</span>
                    <button style={{flex: 1}} onClick={getTotalTime}>Get Total Time</button>
                </div>
                <h2 />
                <div>
                    <button type="button" onClick={changeUserPw}>Change Password</button>
                    <span style={{color:"gray"}}>&nbsp;&nbsp;&nbsp;{label ? "Success!" : ""}</span>
                </div>
                <h2 />
                <div style={{marginTop:'0.5em', display:'flex', flexDirection:'row'}}>
                    <button style={{flex:1}} onClick={() => {setSignoutLabel("Please Wait..."); onSignout();}}>{signoutLabel}</button>
                </div>
            </div>
        </div>
    )
}

export default UserForm