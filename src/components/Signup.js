import React from 'react';
import '../styles/Login.css';


function Signup (props){
    
        return(
            <div className = 'login-container'>
                <div className = 'close-form' onClick = {props.closeRegisterForm}>X</div>              
                <div className = 'form'>
                    <div className = 'form-group'>
                        <label>Username</label>
                        <input className = 'input' type = 'text' name = 'username' onChange = {props.handleUserName} ></input>
                    </div>
                    <div className = 'form-group'>
                        <label>Password</label>
                        <input className = 'input' type = 'text' name = 'password' onChange = {props.handleUserPassword}></input>
                    </div>

                </div>
                <div className = 'bottom'>
                    <button className = 'signup-btn' onClick = {props.submit}>Sign up</button>
                </div> 

            </div>
        )
    
}

export default Signup;