import userEvent from '@testing-library/user-event';
import React, {useState} from 'react'


function ForgotPassword( {error, forgotPw, Logout}) {
    const [details, setDetails] = useState({name: "", oldpw: "", newpw: ""})

    const submitHandler = e =>{
        e.preventDefault();
        
        // console.log("YOOOOOOOOOOOOOOOOOOO")
        forgotPw(details)
    }

  return (
    <form onSubmit = {submitHandler}>
        <div className = "form-inner">
            <h2>Forgot Password</h2>
            { (error != "") ? (<div className=' error'><h4>{error}</h4></div> ) : "" }
            <div className='form-group'>
                <label htmlFor='name'> Name: </label>
                <input type="text" name = "Name" id = "name" onChange= {e => setDetails({...details, name: e.target.value})} value={details.name}/>
            </div>
            
            <div className='form-group'>
                <label htmlFor='oldpw'> Old Password: </label>
                <input type="text" name = "oldpw" id = "oldpw" onChange= {e => setDetails({...details, oldpw: e.target.value})} value={details.password}/>
            </div>

            <div className='form-group'>
                <label htmlFor='oldpw'> New Password: </label>
                <input type="text" name = "oldpw" id = "oldpw" onChange= {e => setDetails({...details, newpw: e.target.value})} value={details.password}/>
            </div>
            <h2></h2>
            <button type="button" onClick={Logout}>Logout</button>
            <h2></h2>
            <input type="submit" value = "SUBMIT" /> 

        </div>

        {/* <div className = "forminnverv2">
            <h2> YOOOOOOOOOOOOOOOO </h2>
        </div> */}
       

    </form>
  )
}

export default ForgotPassword