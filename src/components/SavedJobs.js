import React, { Component } from 'react';
import axios from 'axios';
import JobItem from './JobItem';
import '../styles/Jobs.css';

class SavedJobs extends Component {

    constructor(props) {
        super();
        this.state = {
            userName:'',
            positions: [],
            error:null,
        };
    }

    componentDidMount() {
        axios.get("http://localhost:5000/api/login", {withCredentials: true})
            .then((result) => {
                if(result.data.user){
                    axios.post("http://localhost:5000/api/saved", {userName: result.data.user.userName})
                    .then((savedJobs)=>{
                        console.log(savedJobs.data)
                        this.setState({
                            positions: savedJobs.data,
                            userName: result.data.user.userName
                        })
                    })
                }
                    
            },
            (error) => {
              this.setState({
                error,
              });
            }
          )
    }

    render(){
        const { error, positions, userName } = this.state;
        if(error){
            return <div>Error: {error.message}</div>;
        }
        else{
            return(
                <div className = 'page'>
                    <div className = 'title'>Saved jobs</div>
                    <div className = 'jobs'>
                        {positions.map((position)=>(
                            <JobItem key = {position.job_id} position = {position} userName = {userName}/>
                        ))}
                    </div>
                </div>
            );
        }
    }

}

export default SavedJobs;