import React, { Component } from 'react';
import {Link,} from "react-router-dom";
import {Row, Col} from 'reactstrap';
import Axios from 'axios';
import '../styles/Home.css';
import '../styles/Jobs.css';

import Login from './Login';
import Signup from './Signup';
import JobItem from './Jobs';
import Navbar from './Navbar'


Axios.defaults.withCredentials = true;

class Home extends Component {
    
    constructor(){
        super();
        this.state = {
            keywords:'',
            jobs:[],
            isSearched: false,
            isLoginActive: false,
            isRegisterActive: false,
            userNameReg:'',
            userPasswordReg: '',
            userNameLog:'',
            userPasswordLog: '',
            isLogged: false,
        };    
    }

    componentDidMount(){
        Axios.get("http://localhost:5000/api/login", {withCredentials: true})
        .then((response)=>{
            if(response.data.user){
                this.setState({isLogged: true})
            }
            else{this.setState({isLogged: false})}
           })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        
    }
    
    searchSubmit = () =>{
        Axios.post("http://localhost:5000/api/search", {keywords: this.state.keywords})
        .then((res) =>{
            if(res.data.length){
                this.setState({
                    jobs: res.data,
                    isSearched: true,
                });
            }
        })
    }

    setSearch = (e) =>{
        this.setState({keywords:e.target.value});
    }

    handleUserNameRegChange = (e) =>{
        
        this.setState({userNameReg:e.target.value});
    }
    handleUserPasswordRegChange = (e) =>{
        this.setState({userPasswordReg:e.target.value});
    }

    handleUserNameLogChange = (e) =>{
        
        this.setState({userNameLog:e.target.value});
    }
    handleUserPasswordLogChange = (e) =>{
        this.setState({userPasswordLog:e.target.value});
    }
    
    submitSignupForm = () =>{
        Axios.post("http://localhost:5000/api/signup",
                    {userName: this.state.userNameReg,
                    userPassword:this.state.userPasswordReg})
        this.setState({
            isLoginActive:false,
            isRegisterActive:false,
        });
    }

    submitLoginForm = () =>{
        Axios.post("http://localhost:5000/api/login",
                    {userName: this.state.userNameLog,
                    userPassword:this.state.userPasswordLog})
            .then((respon) =>{
                if(respon.data){    
                    this.setState({
                        isLoginActive:false,
                        isRegisterActive:false,
                        isLogged: true
                    });
                } 
            })
       
    }

    switchLogin = () =>{
        this.setState({
            isLoginActive:true,
            isRegisterActive:false,
        });
    }

    switchRegister = () =>{
        this.setState({
            isRegisterActive:true,
            isLoginActive:false,
        });
    }

    closeForm = () =>{
        this.setState({isLoginActive:false,
                    isRegisterActive:false,
        });
    }
    
    logOut = () =>{
        Axios.get("http://localhost:5000/api/logout",{withCredentials: true})
        .then((resp)=>{
            if(!resp.data.loggedIn){
                this.setState({
                    keywords:'',
                    isLoginActive: false,
                    isRegisterActive: false,
                    userNameReg:'',
                    userPasswordReg: '',
                    userNameLog:'',
                    userPasswordLog: '',
                    isLogged: false,        
                });
            }
        })
        
    }

    render(){
        const {isLoginActive, isRegisterActive,isLogged, jobs, isSearched} = this.state;
        return(
            <div className = 'home'>
                <Navbar />
                <div className = 'search'>
                    <div id = 'title'>Find your next dream job</div>
                    <input id = 'input' onChange = {this.setSearch} placeholder = "  check jobs in your city..."></input>
                    <img alt='' id="search-symbol" src={require('../assets/images/search-icon-white.png')} onClick = {this.searchSubmit}/>
                    <div >
                        <Link className = "all-links" to = '/jobs'>Check all jobs</Link>
                    </div>
                    <div className = 'search-jobs'>
                        {(jobs.length>0) && jobs.map((job)=>(
                            <JobItem key = {job.id} position = {job} />
                        ))}
                    </div>
                </div>
                <div>
                    {isLoginActive && (<Login   closeLoginForm = {this.closeForm} 
                                                submit = {this.submitLoginForm} 
                                                handleUserName = {this.handleUserNameLogChange} 
                                                handleUserPassword = {this.handleUserPasswordLogChange}/>)}
                    {isRegisterActive && (<Signup   closeRegisterForm = {this.closeForm} 
                                                    submit = {this.submitSignupForm} 
                                                    handleUserName = {this.handleUserNameRegChange} 
                                                    handleUserPassword = {this.handleUserPasswordRegChange}/>)}
                </div>
            </div>
        );
    }
}

export default Home;