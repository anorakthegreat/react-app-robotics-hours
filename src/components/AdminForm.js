import React, {useState} from 'react'

function AdminForm( {Logout, adminRequestName, status, totalTime, getTotalTimeAdmin, changeUserPw, label, user, collectData, showCollect, collectLabel, setCollectLabel, collection}) {
    const [signoutLabel, setSignoutLabel] = useState("Sign Out")

    const placeholderDate = "2023-01-07"

    const getTotalTime = (name, date) => {
        if (date === "") date = placeholderDate;
        getTotalTimeAdmin(name, date);
    }

    const collectButton = (start, end) => {
        setCollectLabel("Please Wait...")

        if (start === "") start = placeholderDate;
        collectData(start, end)
    }

    const addTag = (name, uid) => {
        if (name === "") {

        }
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
                        <input style={{flex:2}} type="text" name="Name" id="name" placeholder={user.name} className="textInput"/>
                        <span>&nbsp;&nbsp;</span>
                        <input style={{flex:1}} type="text" name="Time" id="date" placeholder="Time (Optional)" className="textInput"/>
                    </div>
                    <div style={{marginTop:'0.5em',display:'flex',flexDirection:'row'}}>
                        <button style={{flex:1}} onClick={() => adminRequestName(document.getElementById("name").value)}>Log Time In/Out</button>
                    </div>
                </div>
                <h2 />
                <p style={{color:'gray',fontWeight:'bold',marginBottom:'0.25em'}}>Student Attendance Info</p>
                <div style={{border: '2px solid lightgray', margin:'-0.5em',padding:'0.5em',marginTop:'0',borderRadius:'8px'}}>
                    <div style={{marginBottom:'0.5em',display:'flex',flexDirection:'row'}}>
                        <button className="secondary-button" style={{flex:1,backgroundColor:'#eeeeee',color:'gray',margin:'0 0.25em 0 0'}}>Kickoff</button>
                        <button className="secondary-button" style={{flex:1,backgroundColor:'#eeeeee',color:'gray',margin:'0 0.25em'}}>Today</button>
                        <button className="secondary-button" style={{flex:1,backgroundColor:'#eeeeee',color:'gray',margin:'0 0.25em'}}>Kickoff</button>
                        <button className="secondary-button" style={{flex:1,backgroundColor:'#eeeeee',color:'gray',margin:'0 0 0 0.25em'}}>Today</button>
                    </div>
                    <div style={{display:'flex',flexDirection:'row'}}>
                        <input style={{flex:1}} type="text" name="Start" id="start" placeholder="Start Date" className="textInput"/>
                        <span>&nbsp;&nbsp;</span>
                        <input style={{flex:1}} type="text" name="End" id="end" placeholder="End Date" className="textInput"/>
                    </div>
                    <hr style={{marginTop:'0.5em', border:'1px solid lightgray'}} />
                    <div style={{marginTop:'0.5em',display:'flex',flexDirection:'row'}}>
                        <input style={{flex:1}} type="text" name="NameTime" id="nametime" placeholder="Student Name (Optional)" className="textInput"/>
                        <span>&nbsp;&nbsp;</span>
                        <button style={{flex:1}} onClick={() => getTotalTime(document.getElementById("name").value, document.getElementById("date").value)}>Get Hours</button>
                    </div>
                    <div style={{marginTop:'0.5em',display:'flex',flexDirection:'row'}}>
                        <button style={{flex:1}} className={Object.keys(collection.data).length !== 0 ? "secondary-button" : ""} onClick={() => collectButton(document.getElementById("start").value, document.getElementById("end").value)}>{collectLabel}</button>
                        {Object.keys(collection.data).length !== 0 ? <>
                            <span>&nbsp;&nbsp;</span>
                            <button style={{flex:0.15, padding:0}} onClick={showCollect}>
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
                        <button style={{flex:1}} onClick={() => addTag(document.getElementById("nametag").value, document.getElementById("uid").value)}>Register NFC Tag</button>
                    </div>
                </div>
                <h2 />
                <div style={{marginTop:'0.5em',display:'flex',flexDirection:'row',alignItems:'center'}}>
                    <button style={{flex:1}} className="secondary-button" type="button" onClick={changeUserPw}>Change Password</button>
                    <span>&nbsp;&nbsp;</span>
                    <span style={{flex:1.25, height:'100%', color:"gray"}}>{label ? "Success!" : ""}</span>
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