import React, {useEffect, useState} from 'react'
import {Row, Col, Form, Button, Alert} from 'react-bootstrap'

import Header from "../components/Header";
import axios from "axios";
import {api_url} from "../assets/params";
import { useParams} from "react-router-dom";
import ReactMarkdown from 'react-markdown'

import Authenticated from "../components/Authenticated";
import MarkdownHelper from "../components/MarkdownHelper";



const EditScreen = () => {



    const [titleValue, setTitleValue] = useState("")
    const [descriptionValue, setDescriptionValue] = useState("")
    const [contentValue, setContentValue] = useState("")
    const [mainImageValue, setMainImageValue] = useState("")
    const [mainImageName, setMainImageName] = useState("")


    const [categoryValue, setCategoryValue] = useState("")

    const [testAlert, setTestAlert] = useState("")
    const [typeAlert, setTypeAlert] = useState("")

    const [images, setImages] = useState({})

    const [markdownHelper, setMarkdownHelper] = useState(false)


    const { id_item } = useParams()


    const categories = [
        "fantasy",
        "science-fiction",
        "thriller",
        "horreur",
        "érotique",
        "policier",
        "romance"
    ]




    useEffect( () => {

        const getMyImages = async () => {
            let id_user = Number(localStorage.getItem("user_id"));

            await axios.get(api_url+'/api/image/').then((response) => {

                let myImages = []

                response.data.forEach((element) => {
                    if(element.id_user === id_user) {
                        myImages.push(element)
                    }
                })

                setImages(myImages)
            }).catch((err) => {

            })
        }

        getMyImages()

        if(typeof id_item !== "undefined") {


            const loadItem = async () => {

                let config = {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
                await axios.get(api_url + "/api/item/" + id_item, config)
                    .then((res) => {
                        setTitleValue(res.data[0].title)
                        setDescriptionValue(res.data[0].description)
                        setContentValue(res.data[0].content)
                        setCategoryValue(res.data[0].category)
                        setMainImageValue(res.data[0].main_image)
                    })
                    .catch((err) => {

                    });

            }

            loadItem()


        }

    }, [])





    function handleChange(event) {

        setTestAlert("")
        setTypeAlert("")
        if(event.target.name === "titleInput") {
            setTitleValue(event.target.value)
        } else if (event.target.name === "descriptionInput") {
            setDescriptionValue(event.target.value);
        } else if (event.target.name === "contentInput") {
            setContentValue(event.target.value);
        } else if (event.target.name === "categoryInput") {
            setCategoryValue(event.target.value);
        } else if (event.target.name === "mainImageInput") {
            setMainImageValue(event.target.value);
            images.forEach(element => {
                if(Number(element.id) === Number(event.target.value)) {
                    setMainImageName(element.image)
                }
            })
        }

    }

    async function handleSave(event) {
        try {
            event.preventDefault()

            const storedJwt = localStorage.getItem('jwt') ? localStorage.getItem('jwt') : null;
            const userId = localStorage.getItem('user_id') ? localStorage.getItem('user_id') : null;

            let config = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + storedJwt
                }
            }

            let data = {
                "title":titleValue,
                "description":descriptionValue,
                "content" : contentValue,
                "main_image":Number(mainImageValue),
                "category":categoryValue,
                "id_user":Number(userId)
            }

            if (id_item) {
                await axios.put(api_url + "/api/item/" + id_item, data, config)
                    .then((result) => {
                        setTypeAlert("primary")
                        setTestAlert("Votre histoire a été mise à jour !")
                    })
                    .catch((err) => {
                        setTypeAlert("danger")
                        setTestAlert("L'histoire n'a pas été mise à jour.")


                    });
            } else {

                await axios.post(api_url + "/api/item/", data, config)
                    .then((result) => {
                        setTypeAlert("primary")
                        setTestAlert("Votre histoire a été enregistrée !")
                    })
                    .catch((err) => {
                        setTypeAlert("danger")
                        setTestAlert("L'histoire n'a pas été enregistrée.")
                    });
            }

        } catch (err) {
            // Do something
        }

    }


  return (
    <>
        <div className="container-fluid main_container gx-0 w-100 m-0">
            <Authenticated/>
            <Row className={"m-0 p-0 vw-100"}>
                <Col className={"w-100 position-relative d-flex flex-column p-0"}>
                    <Header/>
                </Col>
            </Row>
            {markdownHelper ?
                <div>
                    <h2 className={"text-center m-5"} onClick={() => {setMarkdownHelper(!markdownHelper)} }>Pour fermer cette aide, cliquez ici !</h2>
                    <MarkdownHelper/>
                </div>: ""}
            <Row className="m-5 justify-content-around">
                <h1 className={"text-center"}>Edition d'une histoire</h1>
                {id_item ? <h2 className={"text-center"}>{titleValue}</h2>:""}
            </Row>
            <Row>
                <Col md={8} className={"m-auto"} xs={8}>
                    <Form>
                        <Form.Group className="mb-3" controlId="titleInput">
                            <Form.Label>Titre</Form.Label>
                            <Form.Control type="text" placeholder="Titre" value={titleValue}  name="titleInput" onChange={handleChange}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="descriptionInput">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder="Un résumé de l'histoire ..." value={descriptionValue} onChange={handleChange} name="descriptionInput"/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="contentInput">
                            <Form.Label>Contenu de l'histoire</Form.Label>
                            <p onClick={() => {setMarkdownHelper(!markdownHelper)} }><u>Vous pouvez rédiger l'histoire en markdown : besoin d'aide ?</u></p>

                            <Form.Control as="textarea" rows={20} value={contentValue} onChange={handleChange} name="contentInput"/>
                        </Form.Group>

                        <Form.Select className={"mt-4"} aria-label="Choisissez l'image principal de l'histoire" name="mainImageInput" value={mainImageValue} onChange={handleChange}>
                            <option>Choix de l'image principale</option>

                            {images.length > 0 ? images.map((element) => {
                                return <option key={element.id} value={element.id}>{element.name}</option>
                            }) : ""}
                        </Form.Select>

                        {mainImageName !== "" ?
                            <img className={"m-auto d-block mt-3"} style={{"height" : "200px"}} src={api_url + "/" + mainImageName} alt=""/>
                            : ""}
                        <Form.Select className={"mt-4"} aria-label="Choisissez une catégorie" name="categoryInput" value={categoryValue} onChange={handleChange}>
                            <option>Catégorie</option>

                            {categories.map((element) => {
                                return <option key={element} value={element}>{element}</option>
                            })}

                        </Form.Select>

                        <Button className="col-12 text-center mt-4" variant="primary" type="submit" onClick={handleSave}>
                            Enregistrer
                        </Button>
                        {testAlert ? <Alert className={"mt-4"} variant={typeAlert}>{testAlert}</Alert> : ""}

                    </Form>
                </Col>

            </Row>
            {contentValue !== "" ?
                <Row className={"mt-5"}>
                    <h2 className={"mt-5 text-center"}>Aperçu de l'histoire</h2>
                </Row>
                :""}
            <Row className={"mt-5"}>
                <Col md={8} className={"m-auto text-justify"} xs={8}>

                    <ReactMarkdown>{contentValue}</ReactMarkdown>
                </Col>
            </Row>


        </div>


    </>
  )
}

export default EditScreen
