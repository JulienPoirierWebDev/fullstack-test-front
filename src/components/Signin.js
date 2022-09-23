import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {api_url} from "../assets/params";
import {Alert, Button, Form} from "react-bootstrap";


const Signin = ({buttonImg}) => {

    const [connexionEmailValue, setConnexionEmailValue] = useState("");
    const [connexionPasswordValue, setConnexionPasswordValue] = useState("");
    const [confirmationPasswordValue, setConfirmationPasswordValue] = useState("");

    const [testAlert, setTestAlert] = useState("");


    const [logged, setLogged] = useState(null);

    const storedJwt = localStorage.getItem('jwt') ? localStorage.getItem('jwt') : null;
    const storedUserId = localStorage.getItem('user_id') ? localStorage.getItem('user_id') : null;

    const [jwt, setJwt] = useState(storedJwt || null);
    const [userId, setUserId] = useState(storedUserId || null);


    let navigate = useNavigate();


    const signin = async (data) => {
        // On indique dans les en-tête de la requête que l'on envoi du JSON
        let config = {
            headers: {
                "Content-Type": "application/json",
            }
        }
        //Lancement de la requête de connexion
        let result = await axios.post(api_url + "/api/user/sign", data, config);
        // On récupère le JWT et le refresh_token
        return [result.data.insertId];
    }

    const login = async (data) => {
        // On indique dans les en-tête de la requête que l'on envoi du JSON
        let config = {
            headers: {
                "Content-Type": "application/json",
            }
        }
        //Lancement de la requête de connexion
        let result = await axios.post(api_url + "/api/user/login", data, config);
        // On récupère le JWT et le refresh_token
        return [result.data.token, result.data.userId];
    }

    function handleChange(event) {
        if(event.target.name === "signEmail") {
            console.log("email")
            setConnexionEmailValue(event.target.value)
        } else if (event.target.name === "signPassword") {
            console.log("pass")

            setConnexionPasswordValue(event.target.value);
        } else if (event.target.name === "confirmationPassword") {
            console.log("pass2")

            setConfirmationPasswordValue(event.target.value);
        }
    }

    const handleSignin = async (event) => {

        event.preventDefault();
        setTestAlert("")

        if(connexionPasswordValue && connexionEmailValue && confirmationPasswordValue && connexionPasswordValue === confirmationPasswordValue){
            let data = {
                "login":connexionEmailValue,
                "password":connexionPasswordValue
            };
            await signin(data).then( async (res) => {
                    // Si promesse acceptée : on stocke les token et on change le loged pour rediriger
                    setUserId(res[0]);

                    localStorage.setItem("user_id", res[1]);


                    await login(data).then((res) => {
                        setJwt(res[0]);
                        localStorage.setItem("jwt", res[0]);

                        setLogged(true);


                    })
                },
                //Si promesse rejetée : on affiche l'échec
                ()=> {
                    console.log("fail")
                    setTestAlert("Il y a un problème avec votre adresse email ou votre mot de passe.")
                });
        } else {
            setTestAlert("Veuillez vérifier vos informations : vos mots de passe ne semblent pas convenir")

        }
    }

    useEffect(() => {
        if(logged) {
            navigate("/mon-profil");
        }
    }, [logged, navigate]);

    return (
        <>
            <h2>Inscription</h2>
        <Form>
            <Form.Group className="mb-3" controlId="signEmail">
                <Form.Label>Adresse email</Form.Label>
                <Form.Control name="signEmail" type="email" placeholder="Entrer votre adresse email" onChange={handleChange}/>
                <Form.Text className="text-muted">
                    Vos données ne sont pas partagées, on les garde pour nous (et pour vous) !
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="signPassword">
                <Form.Label>Mot de passe</Form.Label>
                <Form.Control name="signPassword" type="password" placeholder="Entrer votre mot de passe" onChange={handleChange}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="confirmationPassword">
                <Form.Label>Confirmation du mot de passe</Form.Label>
                <Form.Control name="confirmationPassword" type="password" placeholder="Entrer à nouveau votre mot de passe" onChange={handleChange}/>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleSignin}>
                S'inscrire
            </Button>
            {testAlert ? <Alert variant='warning'>{testAlert}</Alert> : ""}
        </Form>
        </>
    )
}

export default Signin;
