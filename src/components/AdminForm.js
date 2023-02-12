import React, {useState} from 'react'
import Axios from 'axios';
import ChangePasswordButtonComponent from './ChangePasswordButtonComponent';

function AdminForm( {apiRequest, onSignout, collection, setCollection, user, changeUserPw, showCPWSuccessLabel /*, label, collectLabel, setCollectLabel*/}) {
    const [signoutLabel, setSignoutLabel] = useState("Sign Out")
    const [status, setStatus] = useState("")
    const [totalTime, setTime] = useState("");
    const [collectLabel, setCollectLabel] = useState("Collect All Student Data");
    const [startDate, setStartDate] = useState("2023-01-07");
    const [name, setName] = useState(user.name);

    const placeholderDate = "2023-01-07"

    const collectButton = (startDate, endDate) => {
        setCollectLabel("Please Wait...")

        if (startDate === "") startDate = placeholderDate;
        
        let date = new Date(Date.now());
        let today = date.toISOString().substring(0, 10);
    
        let start = startDate ? startDate : today;
        let end = endDate ? endDate : today;
    
        apiRequest(Axios.get, {type: "collect", startDate: start, endDate: end}).then((response) =>{
          console.log(response.data);
          setCollectLabel("Collect All Student Data")
    
          if (response.data["data"]) {
            setCollection({...collection, show: true, data: response.data["data"], start: startDate ? startDate : 'all time', end: endDate ? endDate : 'present'})
          }
        })
    }

    const logName = name => {
        if (name === "") name = user.name;
    
        setStatus("Loading...")
        apiRequest(Axios.post, {type: "logname", name: name}).then((response) => {
            if (response.data["status"] === undefined) setStatus("Error: " + response.data["error"])
            else setStatus("You've logged " + name + " " + response.data["status"] + "!")
        })
    }

    const logoutAll = () => {
        if (window.confirm("Are you sure you want to log out all users?") === false) return;

        setStatus("Loading...")
        apiRequest(Axios.post, {type: "logoutall"}).then((response) => {
            if (response.data["status"] === undefined) setStatus("Error: " + response.data["error"])
            else setStatus("You've logged out all users!")
        })
    }

    const addTag = (name, uid, self) => {
        if (name !== "" && uid !== "") {
            self.innerText = "Please Wait...";
            apiRequest(Axios.post, {type: "adduid", name, uid}).then((response) =>{
                if (response.data["status"] === "success") {
                    self.innerText = "Register NFC Tag";
                } else {
                    self.innerText = "Please Try Again";
                }
            })
        }
    }

    const getTotalTime = (name, startDate, endDate) => {
        if (name === "") name = user.name;

        if (startDate === "") startDate = placeholderDate;
        
        let date = new Date(Date.now());
        let today = date.toISOString().substring(0, 10);
    
        let start = startDate ? startDate : today;
        let end = endDate ? endDate : today;
    
        setTime("Loading....")
    
        apiRequest(Axios.get, {type: "totalTime", name, date: start, endDate: end}).then((response) =>{
            console.log(response.data["totalTime"])
        
            setTime(Math.round(response.data["totalTime"]*100)/100 + " hours")
        })
    }

    return (
        <div className="gradient">
            <div className = "admin gradient-inner"> 
                <h1>Admin Panel</h1>
                <h2>{status}</h2>
                <h2>{totalTime}</h2>
                <p style={{color:'gray',fontWeight:'bold',marginBottom:'0.25em'}}>Log Activity</p>
                <div style={{border: '2px solid lightgray', margin:'-0.5em',padding:'0.5em',marginTop:'0',borderRadius:'8px'}}>
                    <div style={{display:'flex',flexDirection:'row'}}>
                        <input style={{flex:2}} type="text" name="Name" id="name" placeholder={"Student Name"} value={name} onChange={(e) => setName(e.target.value)} className="textInput"/>
                        {/* <span>&nbsp;&nbsp;</span> */}
                        {/* <input style={{flex:1}} type="text" name="Time" id="date" placeholder="Time (Optional)" className="textInput"/> */}
                    </div>
                    <div style={{marginTop:'0.5em',display:'flex',flexDirection:'row'}}>
                        <button style={{flex:1}} onClick={() => logName(name)}>Log Time In/Out</button>
                    </div>
                    <hr style={{marginTop:'0.5em', border:'1px solid lightgray'}} />
                    <div style={{marginTop:'0.5em',display:'flex',flexDirection:'row'}}>
                        <button style={{flex:1}} onClick={() => logoutAll()}>Log Out All</button>
                    </div>
                </div>
                <h2 />
                <p style={{color:'gray',fontWeight:'bold',marginBottom:'0.25em'}}>Student Attendance Info</p>
                <div style={{border: '2px solid lightgray', margin:'-0.5em',padding:'0.5em',marginTop:'0',borderRadius:'8px'}}>
                    {/* <div style={{marginBottom:'0.5em',display:'flex',flexDirection:'row'}}>
                        <button className="secondary-button" style={{flex:1,backgroundColor:'#eeeeee',color:'gray',margin:'0 0.25em 0 0'}}>Kickoff</button>
                        <button className="secondary-button" style={{flex:1,backgroundColor:'#eeeeee',color:'gray',margin:'0 0.25em'}}>Today</button>
                        <button className="secondary-button" style={{flex:1,backgroundColor:'#eeeeee',color:'gray',margin:'0 0.25em'}}>Kickoff</button>
                        <button className="secondary-button" style={{flex:1,backgroundColor:'#eeeeee',color:'gray',margin:'0 0 0 0.25em'}}>Today</button>
                    </div> */}
                    <div style={{display:'flex',flexDirection:'row'}}>
                        <input style={{flex:1}} type="text" name="Start" id="start" placeholder="Start Date" className="textInput" value={startDate} onChange={(e) => setStartDate(e.target.value)}/>
                        <span>&nbsp;&nbsp;</span>
                        <input style={{flex:1}} type="text" name="End" id="end" placeholder="End Date" className="textInput"/>
                    </div>
                    <hr style={{marginTop:'0.5em', border:'1px solid lightgray'}} />
                    <div style={{marginTop:'0.5em',display:'flex',flexDirection:'row'}}>
                        <input style={{flex:1}} type="text" name="NameTime" id="nametime" placeholder="Name (Optional)" className="textInput"/>
                        <span>&nbsp;&nbsp;</span>
                        <button style={{flex:1}} onClick={() => getTotalTime(document.getElementById("nametime").value, document.getElementById("start").value, document.getElementById("end").value)}>Get Hours</button>
                    </div>
                    <div style={{marginTop:'0.5em',display:'flex',flexDirection:'row'}}>
                        <button style={{flex:1}} className={Object.keys(collection.data).length !== 0 ? "secondary-button" : ""} onClick={() => collectButton(document.getElementById("start").value, document.getElementById("end").value)}>{collectLabel}</button>
                        {Object.keys(collection.data).length !== 0 ? <>
                            <span>&nbsp;&nbsp;</span>
                            <button style={{flex:0.15, padding:0}} onClick={() => setCollection({...collection, show:true})}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right-short" viewBox="3 2 10 10">
                                    <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
                                </svg>
                            </button>
                        </> : <></>}
                    </div>
                </div>
                <h2 />
                <p style={{color:'gray',fontWeight:'bold',marginBottom:'0.25em'}}>Register NFC Tag</p>
                <div style={{border: '2px solid lightgray', margin:'-0.5em',padding:'0.5em',marginTop:'0',borderRadius:'8px'}}>
                    <div style={{display:'flex',flexDirection:'row'}}>
                        <input style={{flex:1}} type="text" name="Nametag" id="nametag" placeholder="Student Name" className="textInput"/>
                        <span>&nbsp;&nbsp;</span>
                        <input style={{flex:1}} type="text" name="UID" id="uid" placeholder="NFC Tag UID" className="textInput"/>
                    </div>
                    <div style={{marginTop:'0.5em',display:'flex',flexDirection:'row'}}>
                        <button style={{flex:1}} onClick={(e) => addTag(document.getElementById("nametag").value, document.getElementById("uid").value, e.target)}>Register NFC Tag</button>
                    </div>
                </div>
                <h2 />
                <ChangePasswordButtonComponent onClick={changeUserPw} requestLabel={showCPWSuccessLabel}/>
                <h2 />
                <div style={{marginTop:'0.5em',display:'flex',flexDirection:'row'}}>
                    <button style={{flex:1}} onClick={() => {setSignoutLabel("Please Wait..."); onSignout();}}>{signoutLabel}</button>
                </div>
            </div>
        </div>
    )


}

export default AdminForm