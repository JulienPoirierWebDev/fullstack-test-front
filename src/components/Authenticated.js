import React, {useEffect, useState} from 'react'

import "../assets/styles/ThreeJSHero.css"


import "../assets/styles/Categories.css"
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {api_url} from "../assets/params";


const Authenticated = (props) => {

    let navigate = useNavigate();

    const [isLogged, setIsLogged] = useState(false)
    const [authenticateWaiting, setAuthenticateWaiting] = useState(true)


    const storedJwt = localStorage.getItem('jwt') ? localStorage.getItem('jwt') : null;
    const storedUserId = localStorage.getItem('user_id') ? localStorage.getItem('user_id') : null;

    const [jwt, setJwt] = useState(storedJwt || null);
    const [userId, setUserId] = useState(storedUserId || null);

    const testLogged = async (data) => {

        // On indique dans les en-tête de la requête que l'on envoi du JSON
        let config = {
            headers: {
                "Content-Type": "application/json",
            }
        }
        //Lancement de la requête de connexion
        let result = await axios.post(api_url + "/api/user/is_authenticated", data, config).catch((err) => {

        });
        // On récupère le JWT et le refresh_token
        return [result.data.token, result.data.decoded.userId];

    }



    useEffect( () => {
        const isAuthenticated = async () => {
            let data = {
                token: jwt
            }

            await testLogged(data).then((res) => {

                setJwt(res[0])
                setUserId(res[1])
                setIsLogged(true)
                setAuthenticateWaiting(false)

            }).catch((err) => {
                setAuthenticateWaiting(false)

            })
        }

        isAuthenticated()


    }, [])

    useEffect(() => {
        if(authenticateWaiting === false && !isLogged) {
            navigate("/")
        }
    }, [authenticateWaiting])



    return (
            <>
            </>
        )




}


export default Authenticated
