import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchServices } from "../redux/slices/servicesSlice";
import { fetchBanners } from "../redux/slices/bannerSlice";
import BannerSlider from "../components/common/BannerSlider";
import Balance from "../components/common/Balance";
import UserProfile from "../components/common/UserProfile";

function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { services } = useSelector((state) => state.services);
  const { banners } = useSelector((state) => state.banners);

  useEffect(() => {
    dispatch(fetchServices());
    dispatch(fetchBanners());
  }, [dispatch]);

  const handleServiceClick = (service) => {
    navigate("/payment", { state: { service } });
  };

  return (
    <div className="container mx-auto py-8 pt-8">
      {/* BAGIAN HEADER*/}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <UserProfile />
        <Balance />
      </div>

      {/* GRID LAYANAN */}
      <div className="flex space-x-6 overflow-x-auto py-4">
        {services.map((service) => (
          <button
            key={service.service_code}
            onClick={() => handleServiceClick(service)}
            className="flex flex-col items-center text-center flex-shrink-0 w-20"
          >
            <img
              src={service.service_icon}
              alt={service.service_name}
              className="w-12 h-12 mb-2"
            />
            <p className="text-xs">{service.service_name}</p>
          </button>
        ))}
      </div>

      {/* --- SLIDER BANNER --- */}
      <BannerSlider banners={banners} />
    </div>
  );
}

export default HomePage;
