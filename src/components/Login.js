import React from 'react';
import '../styles/Login.css';

function Login (props){
    
        return(
            <div className = 'login-container'>
                <div className = 'close-form' onClick = {props.closeLoginForm}>X</div>                
                <div className = 'form'>
                    <div className = 'form-group'>
                        <label>Username</label>
                        <input className = 'input' type = 'text' name = 'username' onChange = {props.handleUserName}></input>
                    </div>
                    <div className = 'form-group'>
                        <label>Password</label>
                        <input className = 'input' type = 'text' name = 'password' onChange = {props.handleUserPassword}></input>
                    </div>

                </div>
                <div className = 'bottom'>
                    <button className = 'login-btn' onClick = {props.submit}>Log in</button>
                </div> 

            </div>
        )
    
}

export default Login;