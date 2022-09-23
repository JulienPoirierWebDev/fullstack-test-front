import React, {useEffect, useState} from 'react'

import "../assets/styles/ThreeJSHero.css"
import {Container, Row} from "react-bootstrap";

import "../assets/styles/Categories.css"
import axios from "axios";
import OneHistoire from "./OneHistoire";
import {api_url} from "../assets/params";


const Histoires = (props) => {

    const [data, setData] = useState()

    useEffect( () => {

        axios.get(api_url+'/api/item/' ).then((response) => {
            setData(response.data)
        })

    }, [])

    return (
        <>

            <br/>

            <h2 className={"text-center p-3"}>Nos derniers récits</h2>
            <Container className={"container-md d-flex justify-content-md-center w-100"}>
                <Row>

                        {
                            data ? data.map(element => {
                            return <OneHistoire key={element.id} element={element}/>
                        }) : ""}
                </Row>
            </Container>
        </>
    )


}


export default Histoires
