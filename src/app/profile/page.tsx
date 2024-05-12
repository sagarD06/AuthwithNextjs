"use client";
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function ProfilePage() {
  const [data, setData] = useState("nothing");
  const router = useRouter();
  const getUserDetails = async () => {
    try {
      const response = await axios.get("/api/users/me");
      setData(response.data.data._id);
    } catch (error: any) {
      console.log(error.message);
    }
  };
  const logoutUser = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8 gap-5">
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Profile Page
      </h2>
      <hr />
      <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        {data !== "nothing" ? (
          <Link className="text-blue-500" href={`/profile/${data}`}>Click here to get more user details.</Link>
        ) : (
          "Nothing"
        )}
      </h2>
      <hr />
      <div className="flex flex-wrap flex-1 gap-3 justify-center">
        <button
          type="button"
          className="flex justify-center h-10 rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          onClick={getUserDetails}
        >
          Get user details
        </button>
        <button
          type="button"
          className="flex justify-center h-10 rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          onClick={logoutUser}
        >
          Log out
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;
