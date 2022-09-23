import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {api_url} from "../assets/params";
import {Alert, Button, Form} from "react-bootstrap";


const Login = ({buttonImg}) => {

    const [connexionEmailValue, setConnexionEmailValue] = useState("");
    const [connexionPasswordValue, setConnexionPasswordValue] = useState("");
    const [testAlert, setTestAlert] = useState("");
    const [testAlertClass, setTestAlertClass] = useState("invalid");


    const [logged, setLogged] = useState(null);

    const storedJwt = localStorage.getItem('jwt') ? localStorage.getItem('jwt') : null;
    const storedUserId = localStorage.getItem('user_id') ? localStorage.getItem('user_id') : null;

    const [jwt, setJwt] = useState(storedJwt || null);
    const [userId, setUserId] = useState(storedUserId || null);


    let navigate = useNavigate();


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
        if(event.target.name === "connexionEmail") {
            setConnexionEmailValue(event.target.value)
        } else if (event.target.name === "connexionPassword") {
            setConnexionPasswordValue(event.target.value);
        }

    }

    const handleLogin = async (event) => {
        event.preventDefault();
        console.log("clicked")

        if(connexionPasswordValue && connexionEmailValue){

            let data = {
                "login":connexionEmailValue,
                "password":connexionPasswordValue
            };
            await login(data).then( (res) => {
                    // Si promesse acceptée : on stocke les token et on change le loged pour rediriger
                    setJwt(res[0]);
                    setUserId(res[1]);

                    localStorage.setItem("jwt",res[0]);
                    localStorage.setItem("user_id", res[1]);

                    setLogged(true);

                },
                //Si promesse rejetée : on affiche l'échec
                ()=> {
                    console.log("fail")
                    setTestAlert("Il y a un problème avec votre adresse email ou votre mot de passe : veuillez contacter votre MJ.")
                });
        }
    }

    useEffect(() => {
        if(logged) {
            navigate("/mon-profil");
        }
    }, [logged, navigate]);

    return (
        <>
            <h2>Connexion</h2>
            <Form>
                <Form.Group className="mb-3" controlId="connexionEmail">
                    <Form.Label>Adresse email</Form.Label>
                    <Form.Control name="connexionEmail" type="email" placeholder="Entrer votre adresse email" onChange={handleChange}/>
                    <Form.Text className="text-muted">
                        Vos données ne sont pas partagées, on les garde pour nous (et pour vous) !
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="connexionPassword">
                    <Form.Label>Mot de passe</Form.Label>
                    <Form.Control name="connexionPassword" type="password" placeholder="Entrer votre mot de passe" onChange={handleChange}/>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleLogin}>
                    Se connecter
                </Button>
                {testAlert ? <Alert variant='warning'>{testAlert}</Alert> : ""}
            </Form>
        </>
    )
}

export default Login;
