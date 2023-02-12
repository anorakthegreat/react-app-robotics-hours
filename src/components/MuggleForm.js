import React, {useState} from 'react'
import Axios from 'axios'
import ChangePasswordButtonComponent from './ChangePasswordButtonComponent'

function MuggleForm( {apiRequest, onSignout, totalTime, setTime, user, changeUserPw, label}) {
    const placeholderDate = "2023-01-07"

    const [details, setDetails] = useState({name: ""})
    const [signoutLabel, setSignoutLabel] = useState("Sign Out")
    const [startDate, setStartDate] = useState("2023-01-07")

    const getTotalTime = (startDate, endDate) => {
        if (startDate === "") startDate = placeholderDate;
        
        let date = new Date(Date.now());
        let today = date.toISOString().substring(0, 10);
    
        let start = startDate ? startDate : today;
        let end = endDate ? endDate : today;
    
        setTime("Loading....")
    
        apiRequest(Axios.get, {type: "totalTime", name: user.name, date: start, endDate: end}).then((response) =>{
            console.log(response.data["totalTime"])
        
            setTime(Math.round(response.data["totalTime"]*100)/100 + " hours")
        })
    }

    return (
        <div className="gradient">
            <div className = "welcome gradient-inner"> 
                <h1>Welcome, <span>{user.name}</span></h1>
                <h2>{totalTime}</h2>
                {/* <button style={{width:'100%'}} onClick={getTotalTime}>Get Total Time</button> */}
                <p style={{color:'gray',fontWeight:'bold',marginBottom:'0.25em'}}>View Hours</p>
                <div style={{border: '2px solid lightgray', margin:'-0.5em',padding:'0.5em',marginTop:'0',borderRadius:'8px'}}>
                    <div style={{display:'flex',flexDirection:'row'}}>
                        <input style={{flex:1}} type="text" name="Start" id="start" placeholder="Start Date" className="textInput" value={startDate} onChange={(e) => setStartDate(e.target.value)}/>
                        <span>&nbsp;&nbsp;</span>
                        <input style={{flex:1}} type="text" name="End" id="end" placeholder="End Date (Optional)" className="textInput"/>
                    </div>
                    {/* <hr style={{marginTop:'0.5em', border:'1px solid lightgray'}} /> */}
                    <div style={{marginTop:'0.5em',display:'flex',flexDirection:'row'}}>
                        <button style={{flex:1}} onClick={() => getTotalTime(document.getElementById("start").value, document.getElementById("end").value)}>Get Hours</button>
                    </div>
                </div>
                <h2 />
                {/* <div>
                    <button type="button" onClick={changeUserPw}>Change Password</button>
                    <span style={{color:"gray"}}>&nbsp;&nbsp;&nbsp;{label ? "Success!" : ""}</span>
                </div> */}
                <ChangePasswordButtonComponent onClick={changeUserPw} requestLabel={label}/>
                <h2 />
                <div style={{marginTop:'0.5em', display:'flex', flexDirection:'row'}}>
                    <button style={{flex:1}} onClick={() => {setSignoutLabel("Please Wait..."); onSignout();}}>{signoutLabel}</button>
                </div>
            </div>
        </div>
    )
}

export default MuggleForm