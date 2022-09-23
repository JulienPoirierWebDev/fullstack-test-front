import React, { useEffect} from 'react'
import {Row, Col} from 'react-bootstrap'
import Loader from "../components/Loader.js";
import Message from "../components/Message.js";
import ThreeJSHero from "../components/ThreeJSHero";
import Header from "../components/Header";
import HeroContent from "../components/HeroContent";
import HomeSection from "../components/HomeSection";
import Categories from "../components/Categories";
import Histoires from "../components/Histoires";
import Login from "../components/Login";
import Signin from "../components/Signin";


const UserScreen = () => {



  return (
    <>
        <div className="container-fluid main_container gx-0 w-100 m-0">
            <Row className={"m-0 p-0 vw-100"}>
                <Col className={"w-100 position-relative d-flex flex-column p-0"}>
                    <Header/>
                </Col>
            </Row>
            <Row className="m-5 justify-content-around">
                <div><p>Not found</p></div>

            </Row>
        </div>


    </>
  )
}

export default UserScreen
