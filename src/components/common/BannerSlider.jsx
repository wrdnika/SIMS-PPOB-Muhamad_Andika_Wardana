import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BannerSlider = ({ banners }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="w-full mt-8">
      <h2 className="text-lg font-semibold mb-4">Temukan promo menarik</h2>
      <Slider {...settings}>
        {banners.map((banner) => (
          <div key={banner.banner_name} className="px-2">
            <img
              src={banner.banner_image}
              alt={banner.banner_name}
              className="w-full h-40 object-cover rounded-lg"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BannerSlider;
