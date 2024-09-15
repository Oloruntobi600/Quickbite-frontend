import React, { useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { topMeels } from "./topMeels";
import CarouselItem from "./CarouselItem";

const MultiItemCarousel = () => {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const getSlidesToShow = () => {
        if (windowSize.width < 600) return 1;
        if (windowSize.width < 900) return 2;
        if (windowSize.width < 1200) return 3;
        return 5;
    };
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: getSlidesToShow(),
        slidesToScroll: 1,
        autoplay:true,
        autoplaySpeed:2000,
        arrows: false
      };
    return (
        <div>
            {/* <Slider {...settings}>
                {topMeels.map((item) =><CarouselItem image={item.image} title={item.title}/>)}
            </Slider> */}
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