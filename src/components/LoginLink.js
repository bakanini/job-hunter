import React from 'react';
import {Link,} from "react-router-dom";
import {Row, Col } from 'reactstrap';

const LoginLink = () =>{
    return(
        <Row className = 'header'>
            <Col sm = {{size:"1",offset:9}}>Log out</Col>
            <Col sm = {{size:"2"}}><Link className = "all-links" to = '/savedjobs'>Saved jobs</Link></Col>
        </Row>
    )
}

export default LoginLink;