import React, {useState} from 'react'
import Axios from 'axios';

function SigninForm( {apiRequest, onSignin, setLeaderboard}) {
    const [details, setDetails] = useState({name: "", password: ""})
    const [signinLabel, setSigninLabel] = useState("Sign In")
    const [error, setError] = useState("")

    const submitHandler = e =>{
        e.preventDefault();
        login(details)
    }

    const goToLeaderboard = () => {
      setLeaderboard("true")
    }

    const login = details => {  
        setSigninLabel("Please Wait...");
        setError("");
    
        apiRequest(Axios.get, {type: "signin", name: details.name, pw: details.password}).then((response) => {
          setSigninLabel("Sign In")
          if(response.data !== false){
            console.log(response.data)
    
            if(response.data["name"] === details.name){
              setError("")
              let userdata = {
                name: response.data["name"],
                token: response.data["token"],
                level: response.data["level"]
              }
              onSignin(userdata, details.password);
            } else {
              setError(response.data["error"])
            }
          } else {
            setError("API Error")
          }
        })
      }

  return (
    <form onSubmit = {submitHandler}>
        <div className = "form-inner">
            <h2>Team 100 Hours</h2>
            { (error !== "") ? (<div className=' error'><h4>{error}</h4></div> ) : "" }

              <button className="secondary-button" style={{padding:'0.6em 1em'}} type="reset" onClick={goToLeaderboard} >
                Weekly Leaderboard
              </button>
              
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

export default SigninForm