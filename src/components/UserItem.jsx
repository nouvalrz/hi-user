import React from "react";

function UserItem({ id, email, first_name, last_name, avatar }) {
  return (
    <div className="p-4 shadow rounded-lg flex flex-row gap-2">
      <img src={avatar} alt="profile-img" className="w-12 rounded-full" />
      <div>
        <p>{`${first_name} ${last_name}`}</p>
        <p>{email}</p>
      </div>
    </div>
  );
}

export default UserItem;
