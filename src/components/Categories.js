import React, {useState} from 'react'

import "../assets/styles/ThreeJSHero.css"
import {Carousel} from "react-bootstrap";


import "../assets/styles/Categories.css"


const Categories = (props) => {

    const slides = [
        {
            slug: "/images/JuPoWebDev_a_writer_of_fantasy_book_having_an_idea_realistic_na_48a66825-da5c-472b-82ba-ffc5b761c696.png",
            alt:"First slide",
            title:"Title1",
            paragraph:"Lorem ipsum dolor sit amet, consectetur adipisicing elit."
        },
        {
            slug: "/images/JuPoWebDev_a_writer_of_horror_book_having_an_idea_realistic_nat_1cbc7a9a-055c-4531-a791-0710359355a8.png",
            alt:"Second slide",
            title:"Title2",
            paragraph:"Lorem ipsum dolor sit amet, consectetur adipisicing elit."
        },
        {
            slug: "/images/JuPoWebDev_a_writer_of_thriller_book_having_an_idea_realistic_n_6a811822-e6be-46b6-bf4a-c2258a4d9bf0.png",
            alt:"Third slide",
            title:"Title3",
            paragraph:"Lorem ipsum dolor sit amet, consectetur adipisicing elit."
        }
        ]

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

        return (
            <>
                <Carousel activeIndex={index} onSelect={handleSelect}>
                    {slides.map(slide => {
                        return (
                            <Carousel.Item key={slide.slug}>
                                <img
                                    className="d-block w-100 h-auto categories_img"
                                    src={slide.slug}
                                    alt={slide.alt}
                                />
                                <Carousel.Caption className={"d-flex flex-column justify-content-center"}>
                                    <h3>{slide.title}</h3>
                                    <p>{slide.paragraph}</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        )
                    })}
                </Carousel>
            </>
        )




}


export default Categories
