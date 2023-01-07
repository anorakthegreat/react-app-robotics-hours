import React, {useState} from 'react'
import Axios from 'axios'

function MuggleForm( {Logout, totalTime, getTotalTime, user, changeUserPw, label}) {

const [details, setDetails] = useState({name: ""})
const [signoutLabel, setSignoutLabel] = useState("Sign Out")

    return (
        <div className="gradient">
            <div className = "welcome gradient-inner"> 
                <h1>Welcome, <span>{user.name}</span></h1>
                <h2>{totalTime}</h2>
                <button style={{width:'100%'}} onClick={getTotalTime}>Get Total Time</button>
                <h2 />
                <div>
                    <button type="button" onClick={changeUserPw}>Change Password</button>
                    <span style={{color:"gray"}}>&nbsp;&nbsp;&nbsp;{label ? "Success!" : ""}</span>
                </div>
                <h2 />
                <div style={{marginTop:'0.5em', display:'flex', flexDirection:'row'}}>
                    <button style={{flex:1}} onClick={() => {setSignoutLabel("Please Wait..."); Logout();}}>{signoutLabel}</button>
                </div>
            </div>
        </div>
    )


}

export default MuggleForm