import React, {useEffect, useState} from 'react'

import "../assets/styles/ThreeJSHero.css"
import {Alert, Button, Col, Container, Form, Row} from "react-bootstrap";

import "../assets/styles/Categories.css"
import axios from "axios";
import OneHistoire from "./OneHistoire";
import {api_url} from "../assets/params";
import {Image} from "@react-three/drei";
import OneImage from "./OneImage";


const MesHistoires = (props) => {

    const [img, setImg] = useState({})

    const [testAlert, setTestAlert] = useState("")
    const [typeAlert, setTypeAlert] = useState("")

    const [nameValue, setNameValue] = useState("")
    const [altValue, setAltValue] = useState("")
    const [fileValue, setFileValue] = useState("")






    useEffect( () => {


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


    function handleChange(event) {

        if(event.target.name === "nameInput") {
            setNameValue(event.target.value)
        } else if (event.target.name === "altInput") {
            setAltValue(event.target.value);
        } else if (event.target.name === "fileInput") {
            setFileValue(event.target.files[0]);
            console.log(event.target.files[0])
        }

    }

    async function handleSave(event) {
        event.preventDefault()

        try {
            event.preventDefault()

            const storedJwt = localStorage.getItem('jwt') ? localStorage.getItem('jwt') : null;
            const userId = localStorage.getItem('user_id') ? localStorage.getItem('user_id') : null;

            let config = {
                headers: {
                    "Content-Type": "multipart/form-data",

                    "Authorization": "Bearer " + storedJwt
                }
            }

            let data = {
                "name": nameValue,
                "image": fileValue,
                "alt": altValue,
                "id_user": Number(userId)
            }

                await axios.post(api_url + "/api/image/", data, config)
                    .then((result) => {
                        setTypeAlert("primary")
                        setTestAlert("Votre image a été uploadée !")

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

                    })
                    .catch((err) => {
                        setTypeAlert("danger")
                        setTestAlert("L'image n'a pas été uploadé")
                    });

        } catch (err) {
            // Do something
        }
    }



    async function handleDelete(id_item, type) {
        try {
            const storedJwt = localStorage.getItem('jwt') ? localStorage.getItem('jwt') : null;
            const userId = localStorage.getItem('user_id') ? localStorage.getItem('user_id') : null;

            let config = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + storedJwt
                },
                data : {
                    id_user: Number(userId)
                }
            }



                if (id_item) {
                    await axios.delete(api_url + "/api/" + type+ "/" + id_item, config)
                        .then((result) => {
                            setTypeAlert("warning")
                            setTestAlert("L'"+type+" a bien été supprimée")
                        })
                        .catch((err) => {
                            setTypeAlert("danger")
                            setTestAlert("L'"+type+" n'a pas été supprimée.")

                        });
                }
    } catch (err) {
            setTypeAlert("warning")
            setTestAlert("Oops")
        }
    }

    return (
        <>
            <div className={"mt-3"}>
                <h2 className={"text-center p-3 mt-5 mb-5"}>Uploader une image</h2>

                <Row>
                    <Col md={8} className={"m-auto"} xs={8}>
                        <Form>
                            <Form.Group className="mb-3" controlId="nameInput">
                                <Form.Label>Nom de l'image</Form.Label>
                                <Form.Control type="text" placeholder="Nom de l'image" value={nameValue}  name="nameInput" onChange={handleChange}/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="altInput">
                                <Form.Label>Texte alternatif</Form.Label>
                                <Form.Control type="text" placeholder="Un texte alternatif décrivant l'image" value={altValue} onChange={handleChange} name="altInput"/>
                            </Form.Group>

                            <Form.Group controlId="fileInput" className="mb-3">
                                <Form.Label>Merci de choisir l'image à uploader</Form.Label>
                                <Form.Control type="file" name="fileInput" onChange={handleChange}/>
                            </Form.Group>



                            <Button className="col-12 text-center mt-4" variant="primary" type="submit" onClick={handleSave}>
                                Enregistrer
                            </Button>
                            {testAlert ? <Alert className={"mt-4"} variant={typeAlert}>{testAlert}</Alert> : ""}

                        </Form>
                    </Col>

                </Row>

            </div>
            { Object.keys(img).length >0 ?

                <div className={"mt-3"}>

                    <h2 className={"text-center p-3 mt-5 mb-5"}>Mes images</h2>

                    <Container className={"container-md d-flex justify-content-md-evenly w-100"}>
                        {
                            img ? img.map(element => {
                                return (
                                    <div key={element.id} className={"d-flex flex-column"}>
                                        <OneImage
                                            element={element}
                                            setTypeAlert={setTypeAlert}
                                            setTestAlert={setTestAlert}
                                            setItems={setImg}
                                        />
                                    </div>
                                )

                            }) : ""}

                    </Container>
                    {typeof testAlert === "undefined"  ? <Alert className={"w-25 m-auto mt-4 text-center"} variant={typeAlert}>{testAlert}</Alert> : ""}

                </div>

                :
            ""}
        </>
    )


}


export default MesHistoires
