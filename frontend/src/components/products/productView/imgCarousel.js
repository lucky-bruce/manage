import React from "react";
import Slider from "react-slick";
import Img from "../../img/index";

export default function imgCarousel({ imgs }) {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    dotsClass: "mt-4 d-flex flex-row no-dots",
    customPaging: i => (
      <Img alt={"Product"} style={{ width: "100px" }} src={imgs[i]} />
    )
  };
  return (
    <Slider {...settings}>
      {imgs.map((img, i) => (
        <Img key={i} className="item-slick" src={img} alt="" />
      ))}
    </Slider>
  );
}
