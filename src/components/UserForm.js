import React, {useState} from 'react'


function UserForm( {Logout, requestName, getTotalTime, signedIn, totalTime, user, changeUserPw}) {

    return (
        <div className='welcome'>
                <h1>Welcome, <span>{user.name}</span></h1>
                <h2>{signedIn}</h2>
                <h2>{totalTime}</h2>
                <button onClick={requestName}> Log In/Out</button>
                <h2></h2>
                <button onClick={getTotalTime}>Get Total Time</button>
                <h2 />
                <button type="button" onClick={changeUserPw}> Change Password</button>
                <h2></h2>
                <button onClick={Logout}> Sign out</button>
                <h2></h2>
                {/* <button onClick={Loginv2}> Loginv2</button> */}
              </div>
    )
}

export default UserForm