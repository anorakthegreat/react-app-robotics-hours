import React, {useState} from 'react'


function UserForm( {Logout, requestName, getTotalTime, signedIn, totalTime, user, changeUserPw, label}) {

    const [signoutLabel, setSignoutLabel] = useState("Sign Out")

    return (
        <div className="gradient">
            <div className='welcome gradient-inner'>
                <h1>Welcome, <span>{user.name}</span></h1>
                <h2>{signedIn}</h2>
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
                    <button style={{flex:1}} onClick={() => {setSignoutLabel("Please Wait..."); Logout();}}>{signoutLabel}</button>
                </div>
            </div>
        </div>
    )
}

export default UserForm