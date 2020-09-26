import React from 'react';
import {Link,} from "react-router-dom";
import {Row, Col } from 'reactstrap';

const LogoutLink = () =>{
    return(
        <Row className = 'header'>
            <Col sm = {{size:"1",offset:10}}><Link className = "all-links" to = '/login'>Log in</Link></Col>
            <Col sm = "1" ><Link className = "all-links" to = '/signup'>Sign up</Link></Col>
        </Row>
    )
}

export default LogoutLink;