import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import CompanyCard from './CompanyCard';


const CardCarousel = ({ companies }) => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
        <Slider {...settings}>
			{companies && companies.map((eachCompany) => (
				<CompanyCard 
					{...eachCompany}
				/>
			))}
        </Slider>
    );
};


export default CardCarousel;
