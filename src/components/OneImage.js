import React, {useEffect, useState} from 'react'

import {Button, Card, Col, Nav} from "react-bootstrap";
import axios from "axios";
import {LinkContainer} from "react-router-bootstrap";
import {element} from "three/examples/jsm/nodes/shadernode/ShaderNodeBaseElements";
import {api_url} from "../assets/params";



const OneImage = (props) => {




    async function handleDelete(id_element, type) {
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



            if (id_element) {
                await axios.delete(api_url + "/api/" + type+ "/" + id_element, config)
                    .then(async (result) => {
                        props.setTypeAlert("warning")
                        props.setTestAlert("L'" + type + " a bien été supprimée")

                        await axios.get(api_url + '/api/image/').then((response) => {
                            let myData = [];
                            let myId = Number(localStorage.getItem("user_id"))

                            response.data.forEach(element => {
                                if (props.element.id_user === myId) {
                                    myData.push(element)
                                }
                            })
                            console.log(myData)
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
            <img className={"col-12 text-center m-auto"} key={props.element.id} src={api_url + "/"+props.element.image} style={{ width: '25rem'}}/>
            <Button className="col-12 text-center mt-4" variant="danger" type="submit" onClick={() => {handleDelete(props.element.id, "image")}}>
                Supprimer
            </Button>
        </>
    )


}


export default OneImage
