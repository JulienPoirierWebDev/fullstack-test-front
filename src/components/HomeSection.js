import React from 'react'

import "../assets/styles/ThreeJSHero.css"
import {Button, Col, Row} from "react-bootstrap";
import PropTypes from "prop-types";

import "../assets/styles/HomeSection.css"


const HomeSection = (props) => {


    if(props.right) {
        return (
            <>
                <Row className={"home_section align-content-center mt-5"}>
                    <Col sm={4} className={"justify-content-center m-auto mt-5 mb-3"} md={4}>
                        <img  className={"m-auto w-75 rounded-5 d-block"} src={props.src} alt={props.alt}/>
                    </Col>
                    <Col md={6}  className={"m-auto"}>
                        <h2>{props.title}</h2>
                        <p>{props.content}</p>
                    </Col>
                </Row>
            </>
        )
    }
    else {
        return (
            <>
                <Row className={"home_section d-flex align-items-baseline mt-3 mb-5"}>
                    <Col md={6}  className={"m-auto"}>
                        <h2>{props.title}</h2>
                        <p>{props.content}</p>
                    </Col>
                    <Col sm={4} className={"justify-content-center m-auto mt-3"} md={4}>
                        <img className={"m-auto w-75 rounded-5 d-block"} src={props.src} alt={props.alt}/>
                    </Col>

                </Row>
            </>
        )
    }



}

HomeSection.propTypes = {
    right :     PropTypes.bool.isRequired,
    src:        PropTypes.string.isRequired,
    alt:        PropTypes.string.isRequired,
    title:      PropTypes.string.isRequired,
    content:    PropTypes.string.isRequired

}

export default HomeSection
