import React from 'react';
import {Link,} from "react-router-dom";
import {Row, Col } from 'reactstrap';
import LoginLink from './LoginLink';
import LogoutLink from './LogoutLink';

const Navbar = () =>{
    return(
        <Row className = "header">
            <Col sm = {{size: '2'}}><Link className = "all-links" to = '/'>Job Hunter</Link></Col>
            <LoginLink />
            <LogoutLink />
        </Row>
    )
}

export default Navbar;