import { React, useState } from "react";
import PropTypes from "prop-types";
import LoadingCircle from "./LoadingCircle";
import CenterCircle from "./CenterCircle";
export default function Image(props) {
  const [imgLoading, setImgLoading] = useState(true);
  const showImage = () => {
    setTimeout(() => {
      setImgLoading(false);
    }, props.lazytime);
  };
  return (
    <div className="w-full h-full relative">
      <CenterCircle />
      {imgLoading && (
        <div className="w-full h-[214px] m-auto flex justify-center items-center gap-2">
          <LoadingCircle strokeColor="stroke-black" textColor="text-black" />
        </div>
      )}
      <img
        alt="pikachu"
        className={`max-w-full h-auto transition-transform relative ${
          props.hoverScale ? "hover:scale-110" : ""
        }`}
        hidden={imgLoading}
        src={props.url}
        onLoad={showImage}
      />
    </div>
  );
}

Image.propTypes = {
  url: PropTypes.string,
  lazy: PropTypes.bool,
  hoverScale: PropTypes.bool,
  lazyTime: PropTypes.number,
};

Image.defaultProps = {
  url: "",
  lazy: true,
  hoverScale: false,
  lazyTime: 300,
};
