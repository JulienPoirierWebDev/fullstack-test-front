import React, {useEffect, useState} from 'react'
import {LinkContainer} from 'react-router-bootstrap'


import "../assets/styles/ThreeJSHero.css"
import {Button} from "react-bootstrap";


const HeroContent = () => {

    const [isLogged, setisLogged] = useState(false)

    useEffect(() => {
        // eslint-disable-next-line no-unused-expressions
        localStorage.getItem('jwt') ? setisLogged(true) : false

    }, [])
    return (
            <>
                <div className={"hero_content text-center h-100"} style={{"backgroundColor":"white"}}>
                    <h1 style={{"fontSize": "calc(1.525rem + 2vw)"}}>Avec <span>WEBLIO</span> vivez les mots</h1>
                    <p className={"mt-5 mb-5"}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aliquid deleniti dolore dolorem est ?</p>
                    <div className="col-md-12 text-center mt-5">
                        {isLogged ?
                            <LinkContainer to="/mon-profil/">
                                <Button variant="outline-info" size={"lg"}>Vivez votre aventure !</Button>
                            </LinkContainer>
                        :
                            <LinkContainer to="/se-connecter/">
                                <Button variant="outline-info" size={"lg"}>Vivez votre aventure !</Button>
                            </LinkContainer>
                        }
                    </div>
                </div>
            </>
    )
}

export default HeroContent
