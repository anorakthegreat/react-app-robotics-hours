import React from "react";

function ChangePasswordButtonComponent({ requestLabel, onClick }) {
  return (
    <div style={{marginTop:'0.5em',display:'flex',flexDirection:'row',alignItems:'center'}}>
        <button style={{flex:1}} className="secondary-button" type="button" onClick={onClick}>Change Password</button>
        <span>&nbsp;&nbsp;</span>
        <span style={{flex:1.2, height:'100%', color:"gray"}}>{requestLabel ? "Success!" : ""}</span>
    </div>
  );
}

export default ChangePasswordButtonComponent;