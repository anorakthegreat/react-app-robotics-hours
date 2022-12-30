import userEvent from '@testing-library/user-event';
import React, {useState} from 'react'


function LoginForm( {Login, error, loading, setError, setUser, user, changeUserPw}) {
    const [details, setDetails] = useState({name: "", password: ""})

    const submitHandler = e =>{
        e.preventDefault();
        
        // console.log("YOOOOOOOOOOOOOOOOOOO")
        Login(details)
    }

  return (
    <form onSubmit = {submitHandler}>
        <div className = "form-inner">
            <h2>Login</h2>
            {/* <div className=' error'><h4>{error}</h4></div>  */}
            { (error !== "") ? (<div className=' error'><h4>{error}</h4></div> ) : "" }
            <div className='form-group'>
                <label htmlFor='name'> Name: </label>
                <input type="text" name = "Name" id = "name" onChange= {e => setDetails({...details, name: e.target.value})} value={details.name}/>
            </div>
            {/* <div className='form-group'>
                <label htmlFor='email'> Email: </label>
                <input type="text" name = "Email" id = "Email" onChange= {e => setDetails({...details, email: e.target.value})} value={details.email}/>
            </div> */}
            <div className='form-group'>
                <label htmlFor='password'> Password: </label>
                <input type="text" name = "Password" id = "Password" onChange= {e => setDetails({...details, password: e.target.value})} value={details.password}/>
            </div>
            
            {/* <button type="button" onClick={changeUserPw}> Forgot Password?</button> */}
            {/* <input type="button" onClick={() => setError("NAHHH")}value="Submit" /> */}

            <h2></h2>
            <input type="submit" value = "LOGIN" /> 

            <h2></h2>


        </div>

        {/* <div className = "forminnverv2">
            <h2> YOOOOOOOOOOOOOOOO </h2>
        </div> */}
       

    </form>
  )
}

export default LoginForm