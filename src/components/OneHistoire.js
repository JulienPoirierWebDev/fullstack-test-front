import React, {useEffect, useState} from 'react'

import {Button, Card, Col, Nav} from "react-bootstrap";
import axios from "axios";
import {LinkContainer} from "react-router-bootstrap";
import {api_url} from "../assets/params";
import "../assets/styles/OneStory.css"



const OneHistoire = (props) => {

    const [img, setImg] = useState({});





    useEffect( () => {
            axios.get(api_url+'/api/image/' + props.element.main_image).then((response) => {
                setImg(response.data[0])
            }).catch((err) => {
                console.log("error")
            })

        }, [])

    async function handleDelete(id_element, type) {
        try {
            console.log(id_element)

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



            if (id_element) {
                await axios.delete(api_url + "/api/" + type+ "/" + id_element, config)
                    .then(async (result) => {
                        props.setTypeAlert("warning")
                        props.setTestAlert("L'" + type + " a bien été supprimée")

                        await axios.get(api_url + '/api/item/').then((response) => {
                            let myData = [];
                            let myId = Number(localStorage.getItem("user_id"))

                            response.data.forEach(element => {
                                if (element.id_user === myId) {
                                    myData.push(element)
                                }
                            })

                            props.setItems(myData)
                        })


                    })
                    .catch((err) => {
                        props.setTypeAlert("danger")
                        props.setTestAlert("L'"+type+" n'a pas été supprimée.")

                    });
            }
        } catch (err) {
            props.setTypeAlert("warning")
            props.setTestAlert("Oops")
        }
    }



    return (
        <>
            <Col>
                <Card className={"m-auto mt-5 d-flex flex-column align-content-around"} style={{ maxWidth: '25rem'}}>
                    {Object.keys(img).length>= 0 ?
                        <Card.Img style={{ width:"auto", maxHeight:'12rem'}} className={" m-auto mt-3"} variant="top" src={api_url + "/"+img.image} />
                        : ""}
                    <Card.Body className={" d-flex flex-column align-content-around "}>
                        <Card.Title className={"text-center"} >{props.element.title}</Card.Title>
                        <Card.Text>
                            {props.element.description.slice(0,300)} ...
                        </Card.Text>
                        <div className="col-md-12 text-center m-3">

                        <LinkContainer to={`/histoire/${props.element.id}`}>
                            <Nav.Link><Button  variant="primary">Lire l'histoire</Button></Nav.Link>
                        </LinkContainer>
                        </div>

                        {props.isUser ?
                                <div className="col-md-12 text-center m-3">

                                <LinkContainer to={`/edition/${props.element.id}`} >
                                    <Nav.Link><Button  variant="primary">Modifier l'histoire</Button></Nav.Link>
                                </LinkContainer>
                                    <Button className=" mt-4 text-center " variant="danger" type="submit" onClick={() => {handleDelete(props.element.id, "item")}}>
                                        Supprimer
                                    </Button>
                                </div>
                            :""
                            }
                    </Card.Body>
                </Card>
            </Col>
        </>
    )


}


export default OneHistoire
