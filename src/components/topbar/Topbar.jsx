import React from "react";
import "./topbar.css";
import logo from "../../images/logo.jpg";
import { useHistory } from "react-router-dom"
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

const Topbar = () => {

  const history = useHistory();

  const handleClick = () => {
    signOut(auth).then(() => alert("Logged out successfully!"))
  }

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <h2 className="logo" >Borgeran</h2>
        </div>
        <div className="topRight">
          <button style={{
                  border: "none",
                  borderRadius: '5px',
                  padding: 7,
                  marginRight: 10,
                  cursor: 'pointer',
                  background: 'rgb(144, 202, 249)'
              }} onClick={handleClick} >Log Out</button>
        </div>
      </div>
    </div>
  );
}

export default Topbar;