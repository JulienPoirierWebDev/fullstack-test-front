import React from 'react'
import {Row, Col} from 'react-bootstrap'
import ThreeJSHero from "../components/ThreeJSHero";
import Header from "../components/Header";
import HeroContent from "../components/HeroContent";
import HomeSection from "../components/HomeSection";
import Categories from "../components/Categories";
import Histoires from "../components/Histoires";


const HomeScreen = () => {

  return (
    <>
        <div className="container-fluid main_container d-flex gx-0 w-100 m-0">
            <Row className={"m-0 p-0 vw-100"}>
                <Col className={"vh-100 w-100 position-relative d-flex flex-column p-0"}>
                    <Header/>
                    <div className={"three-js"} style={{ "width":"100%", "overflow":"hidden"}} id="canvas-container">

                        <ThreeJSHero/>
                    </div>
                    <HeroContent/>
                </Col>
            </Row>
        </div>

        <HomeSection
            right={true}
            title={"Lorem ipsum dolor sit amet."}
            content={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ad amet assumenda atque blanditiis culpa, excepturi hic impedit inventore modi natus nulla officia repellat, repudiandae vitae? Deserunt maxime molestias vero!"}
            src={"/images/JuPoWebDev_Books_falling_from_sky_realistic_highly_details_81efabbb-320b-4486-bd68-17d3feb951ff.png"}
            alt={"Une image de livre"}
        />
        <HomeSection
            right={false}
            title={"Lorem ipsum dolor sit."}
            content={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ad amet assumenda atque blanditiis culpa, excepturi hic impedit inventore modi natus nulla officia repellat, repudiandae vitae? Deserunt maxime molestias vero!"}
            src={"/images/JuPoWebDev_Books_falling_from_sky_realistic_highly_details_6a6f43af-fa93-45c0-8344-b17629a6ed66.png"}
            alt={"Une image de livre"}

        />
        <Row>
            <Col>
                <Categories/>
            </Col>
        </Row>
        <Row>
            <Col>
                <Histoires/>
            </Col>
        </Row>


    </>
  )
}

export default HomeScreen
