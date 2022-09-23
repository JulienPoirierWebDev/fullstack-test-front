import React from 'react'
import {Row, Col} from 'react-bootstrap'

import Header from "../components/Header";

import Login from "../components/Login";
import Signin from "../components/Signin";


const LoginScreen = () => {



  return (
    <>
        <div className="container-fluid main_container gx-0 w-100 m-0">
            <Row className={"m-0 p-0 vw-100"}>
                <Col className={"w-100 position-relative d-flex flex-column p-0"}>
                    <Header/>
                </Col>
            </Row>
            <Row className="m-5 justify-content-around">
                <Col className={"mt-5"} xl={5} md={6}>
                    <Login/>

                </Col>
                <Col className={"mt-5"} xl={5} md={6}>
                    <Signin/>

                </Col>
            </Row>
        </div>


    </>
  )
}

export default LoginScreen
