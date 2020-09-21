import React, { Component } from 'react';
import {Row, Col } from 'reactstrap';
import {Link,} from "react-router-dom";
import axios from 'axios';
import JobItem from './JobItem';
import '../styles/Jobs.css';

class Jobs extends Component {

    constructor(props) {
        super();
        this.state = {
            userName:'',
            positions: [],
            error:null,
            isLogged: false,
        };
    }

    componentDidMount() {
        axios.get("http://localhost:5000/jobs")
            .then(    
                (result) => {
                    this.setState({
                    positions: result.data
                    });
            },
            (error) => {
              this.setState({
                error,
              });
            }
          )
          .then(axios.get("http://localhost:5000/api/login", {withCredentials: true})
            .then((result) => {
                if(result.data.user){
                    this.setState({userName: result.data.user,
                    isLogged: true})
                }
            }))
    }

    render(){
        const { error, positions, userName, isLogged } = this.state;
        
        return(
            <div className = 'page'>
                <Row>
                    <Col sm = {{size:"1",offset:11}}><Link className = 'back' to = '/'>Back</Link></Col>
                </Row>
                <div className = 'title'>All the jobs you dreamed of are here...</div>
                <div className = 'jobs'>
                    {positions.map((position)=>(
                        <JobItem key = {position.id} position = {position} userName = {userName}/>
                    ))}
                </div>
            </div>
        );
    }

}

export default Jobs;