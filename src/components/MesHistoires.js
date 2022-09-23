import React, {useEffect, useState} from 'react'

import "../assets/styles/ThreeJSHero.css"
import {Alert, Button, Col, Container, Form, Nav, Row} from "react-bootstrap";

import "../assets/styles/Categories.css"
import axios from "axios";
import OneHistoire from "./OneHistoire";
import {api_url} from "../assets/params";
import {Image} from "@react-three/drei";
import {LinkContainer} from "react-router-bootstrap";


const MesHistoires = (props) => {

    const [data, setData] = useState({})
    const [img, setImg] = useState({})

    const [testAlert, setTestAlert] = useState("")
    const [typeAlert, setTypeAlert] = useState("")

    const [nameValue, setNameValue] = useState("")
    const [altValue, setAltValue] = useState("")
    const [fileValue, setFileValue] = useState("")






    useEffect( () => {

        axios.get(api_url+'/api/item/' ).then((response) => {
            let myData=[];
            let myId = Number(localStorage.getItem("user_id"))

            response.data.forEach(element => {
                if(element.id_user === myId) {
                    myData.push(element)
                }
            })

            setData(myData)

        })

        axios.get(api_url+'/api/image/' ).then((response) => {
            let myData=[];
            let myId = Number(localStorage.getItem("user_id"))

            response.data.forEach(element => {
                if(element.id_user === myId) {
                    myData.push(element)
                }
            })
            setImg(myData)

        })

    }, [])


    return (
        <>
            <h2 className={"text-center p-3"}>Vos récits</h2>

            <Container className={"container-md d-flex flex-column justify-content-md-center w-100"}>
                <Row>
                    <Col>
                        <LinkContainer to={`/edition/`} >

                            <Nav.Link className="col-md-12 text-center m-3"><Button className={"m-auto"}  variant="primary">Créer une nouvelle histoire !</Button></Nav.Link>
                        </LinkContainer>
                    </Col>
                </Row>
                <Row className={"d-flex "}>
                        {
                            Object.keys(data).length >=1 ? data.map(element => {
                            return <OneHistoire
                                key={element.id}
                                element={element}
                                isUser={true}
                                setItems={setData}
                                setTypeAlert={setTypeAlert}
                                setTestAlert={setTestAlert}

                            />
                        }) : ""}
                </Row>
                {typeof testAlert === "undefined"  ? <Alert className={"w-25 m-auto mt-4 text-center"} variant={typeAlert}>{testAlert}</Alert> : ""}

            </Container>

        </>
    )


}


export default MesHistoires
