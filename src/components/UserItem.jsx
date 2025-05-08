import React from "react";
import { useNavigate } from "react-router";

function UserItem({ user }) {
  const { id, email, first_name, last_name, avatar } = user;
  const navigate = useNavigate();
  return (
    <div className="cursor-pointer" onClick={() => navigate("/users/" + id)}>
      <div className="w-full h-[300px]  rounded-lg overflow-clip">
        <img
          src={avatar}
          alt="profile"
          className="w-full h-full object-cover hover:scale-110 transition"
        />
      </div>
      <h2 className="text-sm font-medium mt-2">
        {first_name} {last_name}
      </h2>
      <p className="text-xs text-gray-500">{email}</p>
    </div>
  );
}

export default UserItem;
