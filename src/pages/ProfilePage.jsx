import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchProfile,
  updateProfile,
  updateProfileImage,
} from "../redux/slices/profileSlice";
import { logout } from "../redux/slices/authSlice";
import InputField from "../components/common/InputField";
import DefaultProfileImage from "/assets/auth/Profile_Photo.png";
import { Edit2 } from "lucide-react";

function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const { profile, isLoading } = useSelector((state) => state.profile);

  const [imageSrc, setImageSrc] = useState(DefaultProfileImage);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        first_name: profile.first_name,
        last_name: profile.last_name,
      });
    } else {
      dispatch(fetchProfile());
    }
  }, [profile, dispatch]);

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

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 100 * 1024) {
        alert("Ukuran file maksimal adalah 100 KB");
        return;
      }
      dispatch(updateProfileImage(file));
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setFormData({
      first_name: profile.first_name,
      last_name: profile.last_name,
    });
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    dispatch(updateProfile(formData)).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        setIsEditing(false);
      }
    });
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="container mx-auto flex flex-col items-center justify-center py-10">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/jpeg, image/png"
      />
      {/* Gambar dan Nama Profil */}
      <div className="relative flex flex-col items-center mb-6">
        <img
          src={imageSrc}
          onError={handleImageError}
          alt="Profile"
          className="w-28 h-28 rounded-full object-cover"
        />
        <button
          onClick={handleImageClick}
          className="absolute bottom-0 -right-2 bg-white p-2 rounded-full shadow-md border border-gray-200"
        >
          <Edit2 size={18} className="text-gray-700" />
        </button>
      </div>
      <h1 className="text-2xl font-bold mb-10">
        {profile?.first_name} {profile?.last_name}
      </h1>

      {/* Form Data Profil */}
      <form onSubmit={handleSave} className="w-full max-w-lg">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <InputField
            id="email"
            type="email"
            value={profile?.email || ""}
            disabled
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nama Depan
          </label>
          <InputField
            id="first_name"
            name="first_name"
            type="text"
            value={formData.first_name}
            onChange={handleFormChange}
            disabled={!isEditing || isLoading}
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nama Belakang
          </label>
          <InputField
            id="last_name"
            name="last_name"
            type="text"
            value={formData.last_name}
            onChange={handleFormChange}
            disabled={!isEditing || isLoading}
          />
        </div>

        {/* Tombol Aksi Dinamis */}
        <div className="mt-10 space-y-4">
          {isEditing ? (
            <>
              <button
                type="submit"
                className="w-full bg-red-500 text-white font-semibold py-3 rounded-md hover:bg-red-600 disabled:bg-gray-400"
                disabled={isLoading}
              >
                {isLoading ? "Menyimpan..." : "Simpan"}
              </button>
              <button
                type="button"
                onClick={handleCancelClick}
                className="w-full border border-gray-300 text-gray-700 font-semibold py-3 rounded-md hover:bg-gray-50"
              >
                Batalkan
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={handleEditClick}
                className="w-full border border-red-500 text-red-500 font-semibold py-3 rounded-md hover:bg-red-50"
              >
                Edit Profile
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="w-full bg-red-500 text-white font-semibold py-3 rounded-md hover:bg-red-600"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}

export default ProfilePage;
