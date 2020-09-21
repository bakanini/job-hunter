import React, {useState} from 'react';
import {Col, Row, Button, Collapse} from 'reactstrap';

import Axios from 'axios';

Axios.defaults.withCredentials = true;

const parse = require('html-react-parser');

const JobItem = (props) =>{
    const [isOpen, setIsOpen, isSaved] = useState(false);
    
    const openToggle = () => setIsOpen(!isOpen);


    const saveJob = () => {
        
        if(props.userName !== ''){
            if(!isSaved){
                Axios.post("http://localhost:5000/api/add", {userName: props.userName, position:props.position})
                    .then((res) => {
                        console.log(res.data.err)
                        alert(res.data.err)
                        isSaved = true;
                    })
            }else{
                Axios.post("http://localhost:5000/api/delete", {userName: props.userName, position:props.position})
                    .then((res) => {
                        console.log('sucess delete');
                        isSaved = false;
                    })
            }
        }
        else{
            alert('please log in to save jobs')
        }
    }

    return(
        <div>
            <Row className = 'job-item'>
                <Col  sm = {{ size: '2', offset: 1 }}>
                    <img alt = "company_logo" src = {props.position.company_logo}/>                                      
                </Col> 
                <Col sm = {{ size: '4' }} className = 'job-text'> 
                    <div >{props.position.company}</div>
                    <div >{props.position.title}</div>
                </Col>
                <Col sm = {{ size: '2' }} className = 'btn'>
                    <Button  outline onClick = {saveJob}>{(isSaved)?'Unsave':'Save'}</Button>
                    <Button outline onClick = {openToggle}>{(isOpen)?'Collapse':'Detail'}</Button>
                </Col>
                <Collapse className = "detail" isOpen={isOpen}>
                        {parse(props.position.description)}
                </Collapse>
            </Row>
        </div>
    )
    
}

export default JobItem;