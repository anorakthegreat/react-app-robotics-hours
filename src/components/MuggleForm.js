import React, {useState} from 'react'
import Axios from 'axios'

function MuggleForm( {Logout, totalTime, getTotalTime, user}) {

const [details, setDetails] = useState({name: ""})

    return (
        <div className = "admin"> 
            <h2>Welcome, <span>{user.name}</span></h2>
            <h2></h2>
            <h2>{totalTime}</h2>
            <h2></h2>
            <button onClick={getTotalTime}> Total Time</button>
        </div>
    )


}

export default MuggleForm