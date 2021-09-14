import React, { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardBody } from "reactstrap"
import Swiper from "react-id-swiper"
import img1 from "../../../assets/img/slider/banner-1.jpg"
import img2 from "../../../assets/img/slider/banner-2.jpg"
import img3 from "../../../assets/img/slider/banner-3.jpg"
import img4 from "../../../assets/img/slider/banner-4.jpg"
import img5 from "../../../assets/img/slider/banner-5.jpg"

import "swiper/css/swiper.css"
import "../../../assets/scss/plugins/extensions/swiper.scss"
import http from '../../../http'

export default function Coverflow() {
    const [postSlider, setPostSlider] = useState([])

    useEffect(() => {
        http.get(`get_slider`)
            .then((response) => {
                setPostSlider(response.data)
            })
    }, [])


    const params = {
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Слайдер</CardTitle>
            </CardHeader>
            <CardBody>
                <Swiper {...params}>
                    {
                        postSlider?.map((el, index) => {
                            return (
                                <div key={index}>
                                    <img src={el.img} alt="swiper 1" className="img-fluid" />
                                </div>
                            )
                        })
                    }
                </Swiper>
            </CardBody>
        </Card>
    )
}

