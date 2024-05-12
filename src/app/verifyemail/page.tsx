"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";


function VerifyEmail() {
  const [token, setToken] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [isError, setIsError] = useState(false);


  const verifyEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", {token : token});
      setIsVerified(true);
      setIsError(false);
      console.log("User verified successfully!!");
    } catch (error) {
      setIsError(true);
      console.log("Something went wrong!, while verifying email!");
    }
  };

  useEffect(() => {
    setIsError(false);
    const urlToken = window.location.search.split("=")[1];
    console.log(urlToken);
    
    setToken(urlToken || "");
  }, []);

  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8 gap-4">
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Verify your email address
      </h2>

      <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        "Token: {token ? token : "no token"}"
      </h2>

      <div>
        <button
          type="button"
          className={`flex justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600
          ${isVerified &&  "bg-green-600  hover:bg-green-500 disabled"}`}
          onClick={verifyEmail}
        >
          {isVerified ? "Verified" : "Click here to Verify"}
        </button>
      </div>
    </div>
  );
}

export default VerifyEmail;
