import React, {Component} from 'react';
import '../styles/Login.css';

class Signup extends Component{
    state = {
        username: '',
        password: '',
    }
    handleChange = (e) =>{
        this.setState({[e.target.id]: e.target.value});
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        console.log(this.state)
    }
    render(){
        return(
            <div className = 'login-container'>             
                <form className = 'form' onSubmit = {this.handleSubmit}>
                    <div className = 'form-group'>
                        <label>Username</label>
                        <input className = 'input' type = 'username' id = 'username' onChange={this.handleChange}></input>
                    </div>
                    <div className = 'form-group'>
                        <label>Password</label>
                        <input className = 'input' type = 'password' id = 'password' onChange={this.handleChange}></input>
                    </div>
                    <div className = 'bottom'>
                        <button className = 'signup-btn'>Sign up</button>
                    </div> 
                </form>
            </div>
        )
    }       
    
}

export default Signup;