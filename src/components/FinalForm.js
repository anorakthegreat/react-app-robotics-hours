import React, {useState} from 'react'
import AdminForm from './AdminForm'
import MuggleForm from './MuggleForm'
import UserForm from './UserForm'

function FinalForm( {Logout, requestName, getTotalTime, signedIn, totalTime, user, adminRequestName, status, getTotalTimeAdmin}) {

    if(user.level == "user"){
        return(          
            <UserForm Logout = {Logout} requestName = {requestName} getTotalTime = {getTotalTime} signedIn = {signedIn} totalTime = {totalTime} user = {user} adminRequestName = {adminRequestName}/>
        )
    }

    if(user.level == "admin"){
        return(
            <AdminForm Logout={Logout} adminRequestName={adminRequestName} status = {status} totalTime = {totalTime} getTotalTimeAdmin={getTotalTimeAdmin}/>
        )
    }

    if(user.level == "muggle"){
        return(
            <MuggleForm Logout={Logout} totalTime={totalTime} getTotalTime={getTotalTime} user = {user}/>
        )
    }



}

export default FinalForm