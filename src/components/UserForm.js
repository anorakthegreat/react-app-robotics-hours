import React, {useState} from 'react'


function UserForm( {Logout, requestName, getTotalTime, signedIn, totalTime, user}) {

    return (
        <div className='welcome'>
                <h2>Welcome, <span>{user.name}</span></h2>
                <h2>{signedIn}</h2>
                <h2>{totalTime}</h2>
                <button onClick={Logout}> Logout</button>
                <h2></h2>
                <button onClick={requestName}> Sign in/Out</button>
                <h2></h2>
                <button onClick={getTotalTime}> TotalTime</button>
                <h2></h2>
                {/* <button onClick={Loginv2}> Loginv2</button> */}
              </div>
    )
}

export default UserForm