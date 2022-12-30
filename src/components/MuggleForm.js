import React, {useState} from 'react'
import Axios from 'axios'

function MuggleForm( {Logout, totalTime, getTotalTime, user, changeUserPw}) {

const [details, setDetails] = useState({name: ""})

    return (
        <div className = "welcome"> 
            <h1>Welcome, <span>{user.name}</span></h1>
            <h2>{totalTime}</h2>
            <button onClick={getTotalTime}>Get Total Time</button>
            <h2 />
            <button type="button" onClick={changeUserPw}>Change Password</button>
            <h2></h2>
            <button onClick={Logout}>Sign out</button>
        </div>
    )


}

export default MuggleForm