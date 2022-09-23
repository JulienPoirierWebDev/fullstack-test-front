import React from 'react'
import {LinkContainer} from 'react-router-bootstrap'


import "../assets/styles/ThreeJSHero.css"
import {Button} from "react-bootstrap";


const HeroContent = () => {


    return (
            <>
                <div className={"hero_content text-center"} style={{"backgroundColor":"white"}}>
                    <h1>Avec <span>WEBLIO</span> vivez les mots</h1>
                    <p className={"mt-5 mb-5"}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aliquid deleniti dolore dolorem est, nemo nostrum quae sunt veniam voluptate?</p>
                    <div className="col-md-12 text-center mt-5">
                        <LinkContainer to="/mon-profil">
                        <Button variant="outline-info" size={"lg"}>Vivez votre aventure !</Button>
                        </LinkContainer>
                    </div>
                </div>
            </>
    )
}

export default HeroContent
