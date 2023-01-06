import React, {useState} from 'react'
import Axios from 'axios'
import { userAgent } from 'next/server'

function AdminForm( {Logout, adminRequestName, status, totalTime, getTotalTimeAdmin, changeUserPw, label, user}) {

const [details, setDetails] = useState({name: ""})
const [signoutLabel, setSignoutLabel] = useState("Sign Out")

    // const adminRequestName = name => {
    //     // setStatus("Loading...")
    //     // Axios.get("https://script.google.com/macros/s/AKfycbzrZrUGdpTtUfUF2XYvUuSMQk6-LUB839QOnkUfuZcv07LbudNkJjSq6Vg22luMY7SL6w/exec?token=52fa80662e64c128f8389c9ea6c73d4c&type=logname&name="+name)
    //     // setStatus("You've Signed in!")

    //     console.log("YOUVE SIGNED IN    ")
    // }


    return (
        <div className="gradient">
            <div className = "admin gradient-inner"> 
                <h1>Admin Panel</h1>
                <h2 />
                <h2>{status}</h2>
                <h2 />
                <h2>{totalTime}</h2>
                <h2 />
                <input type="text" name="Name" id="name" placeholder={user.name} className="textInput"/>
                <div style={{marginTop:'0.5em',display:'flex',flexDirection:'row'}}>
                    <button style={{flex:1}} onClick={() => adminRequestName(document.getElementById("name").value)}>Log Time In/Out</button>
                    <span>&nbsp;&nbsp;</span>
                    <button style={{flex:1}} onClick={() => getTotalTimeAdmin(document.getElementById("name").value)}>Get Total Time</button>
                </div>
                <h2 />
                <div>
                    <button type="button" onClick={changeUserPw}>Change Password</button>
                    <span style={{color:"gray"}}>&nbsp;&nbsp;&nbsp;{label ? "Success!" : ""}</span>
                </div>
                <h2 />
                <div style={{marginTop:'0.5em',display:'flex',flexDirection:'row'}}>
                    <button style={{flex:1}} onClick={() => {setSignoutLabel("Please Wait..."); Logout();}}>{signoutLabel}</button>
                </div>
            </div>
        </div>
    )


}

export default AdminForm