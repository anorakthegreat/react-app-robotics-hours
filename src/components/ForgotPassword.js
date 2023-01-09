import React, {useState} from 'react'


function ForgotPassword( {error, setError, forgotPw, back, submitLabel, setSubmitLabel, resetState}) {
    const [details, setDetails] = useState({oldpw: "", newpw: "", confpw: ""})

    const submitHandler = e =>{
        e.preventDefault();

        if (details.newpw !== details.confpw) {
            setError("Confirmation password does not match")
        } else {
            setSubmitLabel("Please Wait...")
            forgotPw(details)
        }
    }

  return (
    <form onSubmit = {submitHandler}>
        <div className = "form-inner cpw-form">
            {resetState.backAllowed ?
                <>
                    <button className="secondary-button" style={{padding:'0.6em 1em'}} type="reset" onClick={back}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-short" viewBox="3 2 10 10">
                            <path fill-rule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"/>
                        </svg>
                    </button>
                    <h2 />
                </>
            :<></>}
            <h2>{resetState.old === "" ? "Forgot Password" : "Create New Password"}</h2>

            { (error !== "") ? (<div className=' error'><h4>{error}</h4></div> ) : "" }
            <h2 />
            {resetState.old === "" ?
                <div className='form-group'>
                    {/* <label htmlFor='oldpw'> Old Password: </label> */}
                    <input type="password" name = "oldpw" id = "oldpw" placeholder="Old Password" onChange= {e => setDetails({...details, oldpw: e.target.value})} value={details.oldpw}/>
                </div>
            : <></>}

            <div className='form-group'>
                {/* <label htmlFor='newpw'> New Password: </label> */}
                <input type="password" name = "newpw" id = "newpw" placeholder="New Password" onChange= {e => setDetails({...details, newpw: e.target.value})} value={details.newpw}/>
            </div>
            
            <div className='form-group'>
                {/* <label htmlFor='confpw'> Confirm New Password: </label> */}
                <input type="password" name = "confpw" id = "confpw" placeholder="Confirm New Password" onChange= {e => setDetails({...details, confpw: e.target.value})} value={details.confpw}/>
            </div>
            <h2></h2>
            
            <div style={{marginTop:'0.5em',display:'flex',flexDirection:'row'}}>
                <input style={{flex:1}} type="submit" value ={submitLabel}/>
            </div>

        </div>
    </form>
  )
}

export default ForgotPassword