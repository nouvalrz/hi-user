import React from "react";

function UserDetail({ user }) {
  const { email, first_name, last_name, avatar } = user;
  return (
    <div className="flex flex-col items-center">
      <img src={avatar} alt="profile" className="rounded-full w-62" />
      <h1 className="text-base font-medium mt-4 dark:text-gray-300">
        {first_name} {last_name}
      </h1>
      <p className="text-sm text-gray-500">{email}</p>
    </div>
  );
}

export default UserDetail;
