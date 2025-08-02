import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../../redux/slices/profileSlice";
import DefaultProfileImage from "/assets/auth/Profile_Photo.png";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.profile);

  const [imageSrc, setImageSrc] = useState(DefaultProfileImage);

  useEffect(() => {
    if (!profile) {
      dispatch(fetchProfile());
    }
  }, [dispatch, profile]);

  useEffect(() => {
    if (profile?.profile_image) {
      setImageSrc(profile.profile_image);
    } else {
      setImageSrc(DefaultProfileImage);
    }
  }, [profile]);

  const handleImageError = () => {
    setImageSrc(DefaultProfileImage);
  };

  return (
    <div>
      <img
        src={imageSrc}
        onError={handleImageError}
        alt="Profile"
        className="w-16 h-16 rounded-full object-cover mb-4"
      />
      <p className="text-2xl">Selamat datang,</p>
      <h1 className="text-3xl font-bold">
        {profile?.first_name} {profile?.last_name}
      </h1>
    </div>
  );
};

export default UserProfile;
