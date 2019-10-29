import React from "react";
import Slider from "react-slick";

export default function imgCarousel(props) {
	var settings = {
		dots: true,
		infinite: false,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		dotsClass: "mt-4 d-flex flex-row no-dots",
		customPaging: i => (
			<img
				alt={"Product"}
				style={{ width: "100px" }}
				src={props.imgs[i]}
			/>
		)
	};
	return (
		<Slider {...settings}>
			{props.imgs.map((img, i) => (
				<img key={i} className="item-slick" src={img} alt="" />
			))}
		</Slider>
	);
}
