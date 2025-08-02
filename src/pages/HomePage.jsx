import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../redux/slices/profileSlice";

function HomePage() {
  const dispatch = useDispatch();

  const { profile, isLoading } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  return (
    <div className="container mx-auto p-4">
      {isLoading && <p>Loading...</p>}
      {profile && (
        <div>
          <h1 className="text-3xl font-bold">
            Selamat datang, {profile.first_name} {profile.last_name}
          </h1>
        </div>
      )}
    </div>
  );
}

export default HomePage;
