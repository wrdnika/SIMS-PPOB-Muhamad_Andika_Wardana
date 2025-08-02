import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, fetchBalance } from "../redux/slices/profileSlice";
import { fetchServices } from "../redux/slices/servicesSlice";
import { fetchBanners } from "../redux/slices/bannerSlice";
import BannerSlider from "../components/common/BannerSlider";

function HomePage() {
  const dispatch = useDispatch();
  const [isBalanceVisible, setIsBalanceVisible] = useState(false);

  const { profile, balance, isLoading } = useSelector((state) => state.profile);
  const { services } = useSelector((state) => state.services);
  const { banners } = useSelector((state) => state.banners);

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchBalance());
    dispatch(fetchServices());
    dispatch(fetchBanners());
  }, [dispatch]);

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  return (
    <div className="container mx-auto p-4">
      {isLoading && <p>Loading...</p>}
      {profile && (
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">
              Selamat datang, {profile.first_name} {profile.last_name}
            </h1>
          </div>
          <div className="bg-red-500 text-white p-6 rounded-lg w-1/3">
            <p>Saldo anda</p>
            <h2 className="text-4xl font-bold my-2">
              {isBalanceVisible ? formatRupiah(balance || 0) : "Rp. •••••••"}
            </h2>
            <button
              onClick={() => setIsBalanceVisible(!isBalanceVisible)}
              className="text-sm underline cursor-pointer"
            >
              {isBalanceVisible ? "Tutup Saldo" : "Lihat Saldo"}
            </button>
          </div>
        </div>
      )}
      <div className="grid grid-cols-4 md:grid-cols-7 gap-4">
        {services.map((service) => (
          <div
            key={service.service_code}
            className="flex flex-col items-center text-center"
          >
            <img
              src={service.service_icon}
              alt={service.service_name}
              className="w-12 h-12 mb-2"
            />
            <p className="text-xs">{service.service_name}</p>
          </div>
        ))}
      </div>
      <BannerSlider banners={banners} />
    </div>
  );
}

export default HomePage;
