import React, {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {Link, useParams} from 'react-router-dom'
import {Row, Col, Image, ListGroup, Card, Button, Form, Alert} from 'react-bootstrap'
import Message from "../components/Message";
import Loader from "../components/Loader";
import Authenticated from "../components/Authenticated";
import Header from "../components/Header";
import {api_url} from "../assets/params";
import axios from "axios";
import ReactMarkdown from 'react-markdown'




const ItemsScreen = ({}) => {
    const [image, setImage] = useState({})
    const [histoire, setHistoire] = useState({})



    const { id } = useParams()

    useEffect( () => {


        if(typeof id !== "undefined") {


            const loadItem = async () => {
                let config = {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
                await axios.get(api_url + "/api/item/" + id, config)
                    .then((res) => {
                        setHistoire(res.data[0])





                    })
                    .catch((err) => {

                    });

            }

            loadItem()


        }

    }, [])

    useEffect(() => {
        if(Object.keys(histoire).length > 0){
            const getMyImages = async (img) => {
                await axios.get(api_url + "/api/image/" + img ).then((response) => {
                    setImage(response.data[0])
                }).catch((err) => {

                })
            }

            getMyImages(histoire.main_image)
        }


    }, [histoire])




  return (
      <>
          <div className="container-fluid main_container gx-0 w-100 m-0">
              <Row className={"m-0 p-0 vw-100"}>
                  <Col className={"w-100 position-relative d-flex flex-column p-0"}>
                      <Header/>
                  </Col>
              </Row>
              <Row className="m-5 justify-content-around">
                  <h1 className={"text-center"}>{histoire.title}</h1>
              </Row>
              {Object.keys(image).length > 0 ?
                  <Row className="m-5 justify-content-around m-auto w-25">
                      <Image src={api_url + "/" + image.image} alt={image.alt}/>
                  </Row>
                  :""
              }

              <Row  className="m-5 justify-content-around">
                  <Col md={6}>
                      <ReactMarkdown >{histoire.content}</ReactMarkdown>

                  </Col>

              </Row>

          </div>


      </>  )
}

export default ItemsScreen
