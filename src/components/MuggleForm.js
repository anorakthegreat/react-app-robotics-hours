import React, {useState} from 'react'
import Axios from 'axios'

function MuggleForm( {Logout, totalTime, getTotalTime, user, changeUserPw}) {

const [details, setDetails] = useState({name: ""})

    return (
        <div className = "admin"> 
            <h2>Welcome, <span>{user.name}</span></h2>
            <h2></h2>
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