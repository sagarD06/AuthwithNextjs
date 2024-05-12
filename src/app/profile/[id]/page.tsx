import React from "react";

function UserProfile({params}:any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-5">
      <h1 className="text-4xl">Profile</h1>
      <hr />
      <p className="text-4xl">
        Profile page
        <span className=" p-2 ml-2 rounded bg-orange-500 text-black">
          {params.id}
        </span>
      </p>
    </div>
  );
}

export default UserProfile;
