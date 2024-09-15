import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { topMeels } from "./topMeels";
import CarouselItem from "./CarouselItem";
import "./MultiItemCarousel.css";

const MultiItemCarousel = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay:true,
        autoplaySpeed:2000,
        arrows: false,
        responsive: [
            {
              breakpoint: 1024, // For tablets and smaller devices
              settings: {
                slidesToShow: 3,
              },
            },
            {
              breakpoint: 768, // For mobile devices
              settings: {
                slidesToShow: 2,
              },
            },
            {
              breakpoint: 480, // For very small mobile devices
              settings: {
                slidesToShow: 1,
              },
            },
          ],
      };
    return (
        <div>
             <Slider {...settings}>
                {topMeels.map((item, index) => (
                    <CarouselItem
                        key={index}  // Add a unique key prop here
                        image={item.image}
                        title={item.title}
                    />
                ))}
            </Slider>
        </div>
    )
}

export default MultiItemCarousel