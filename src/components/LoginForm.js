import userEvent from '@testing-library/user-event';
import React, {useState} from 'react'


function LoginForm( {Login, error, signinLabel}) {
    const [details, setDetails] = useState({name: "", password: ""})

    const submitHandler = e =>{
        e.preventDefault();
        
        // console.log("YOOOOOOOOOOOOOOOOOOO")
        Login(details)
    }

  return (
    <form onSubmit = {submitHandler}>
        <div className = "form-inner">
            <h2>Team 100 Hours</h2>
            { (error !== "") ? (<div className=' error'><h4>{error}</h4></div> ) : "" }
            <h2 />
            <div className='form-group'>
                {/* <label htmlFor='name'> Name: </label> */}
                <input type="text" name = "Name" id = "name" onChange= {e => setDetails({...details, name: e.target.value})} value={details.name} placeholder="Name"/>
            </div>
            <div className='form-group'>
                {/* <label htmlFor='password'> Password: </label> */}
                <input type="password" name = "Password" id = "Password" onChange= {e => setDetails({...details, password: e.target.value})} value={details.password} placeholder="Password"/>
            </div>
            <h2></h2>
            {/* <input type="submit" value = "SIGN IN" />  */}
            <div style={{marginTop:'0.5em',display:'flex',flexDirection:'row'}}>
                <button style={{flex:1}}>{signinLabel}</button>
            </div>
        </div>
    </form>
  )
}

export default LoginForm