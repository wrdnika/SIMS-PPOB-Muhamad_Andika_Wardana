import React, { memo } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

/**
 * Komponen slider untuk menampilkan banner promosi.
 * Dioptimalkan dengan React.memo untuk mencegah re-render yang tidak perlu.
 * @param {object} props - Props untuk komponen BannerSlider.
 * @param {Array<{banner_name: string, banner_image: string}>} props.banners - Array objek banner yang akan ditampilkan.
 */
const BannerSlider = ({ banners }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full mt-10">
      <h2 className="text-lg font-semibold mb-4">Temukan promo menarik</h2>
      <Slider {...settings}>
        {banners.map((banner) => (
          <div key={banner.banner_name} className="px-2">
            <img
              src={banner.banner_image}
              alt={banner.banner_name}
              className="w-full h-32 object-cover rounded-lg"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default memo(BannerSlider);
