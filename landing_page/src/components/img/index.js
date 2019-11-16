import React from "react";

export default function Img({ src, className, style, alt }) {
  return (
    <img
      className={className}
      style={style}
      alt={alt}
      src={`${process.env.REACT_APP_SERVER_LOCAL_IP}:8081/${src}`}
    />
  );
}
