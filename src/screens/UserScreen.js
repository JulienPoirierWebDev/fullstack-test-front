import React, {useEffect, useState} from 'react'
import {Row, Col} from 'react-bootstrap'

import Header from "../components/Header";
import axios from "axios";
import {api_url} from "../assets/params";
import {useNavigate} from "react-router-dom";
import Histoires from "../components/Histoires";
import MesHistoires from "../components/MesHistoires";
import Authenticated from "../components/Authenticated";
import MesImages from "../components/MesImages";



const UserScreen = () => {


  return (
    <>
        <div className="container-fluid main_container gx-0 w-100 m-0">
            <Authenticated/>
            <Row className={"m-0 p-0 vw-100"}>
                <Col className={"w-100 position-relative d-flex flex-column p-0"}>
                    <Header/>
                </Col>
            </Row>
            <Row className="m-5 justify-content-around">
              <h1 className={"text-center"}>Profil utilisateur</h1>
            </Row>
            <Row>
                <MesHistoires/>
                <MesImages/>
            </Row>
        </div>


    </>
  )
}

export default UserScreen
