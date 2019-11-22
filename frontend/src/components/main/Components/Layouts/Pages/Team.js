import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Rating from "@material-ui/lab/Rating";
import { getTeams } from "../../../../../utils/backend";
import Img from "../../../../img/index";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

export default function Gallery() {
  const [teams, setTeams] = useState([]);

  const GetTeams = () => {
    getTeams((err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log(res.toObject());
        setTeams(res.toObject().teamsList);
      }
    });
  };

  useEffect(() => {
    GetTeams();
  }, []);

  return (
    <Carousel
      additionalTransfrom={0}
      arrows
      responsive={responsive}
      // autoPlay={true}
      // autoPlaySpeed={3000}
      centerMode={false}
      className=""
      containerClass="container-with-dots"
      dotListClass=""
      draggable
      infinite
      itemClass=""
      keyBoardControl
      minimumTouchDrag={80}
      renderButtonGroupOutside={true}
      renderDotsOutside={false}
    >
      {teams.map((member, index) => (
        <div
          key={index}
          className="card"
          style={{
            width: "95%",
            margin: "20px auto",
            minHeight: "500px"
          }}
        >
          <Img
            style={{
              maxWidth: "100%",
              borderRadius: "5px 5px 0 0"
            }}
            alt={""}
            src={`${member.image}`}
          />
          <div className="card-body">
            <div className="card-title">{member.name}</div>
            <div className="card-text">
              <div>
                <Rating
                  name="rating"
                  value={member.rating}
                  precision={0.5}
                  readOnly={true}
                />
              </div>
              {member.description}
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
}
