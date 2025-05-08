import React from "react";
import { useParams } from "react-router";
import { useFetchData } from "../hooks/useFetchData";
import { API_KEY, API_URL } from "../constants";
import UserDetail from "../components/UserDetail";
import UserDetailPlaceholder from "../components/UserDetailPlaceholder";

function DetailPage() {
  const { id } = useParams();

  const { data, loading, error } = useFetchData({
    endpoint: API_URL + "users/" + id,
    options: { headers: API_KEY },
  });

  return (
    <div className="flex flex-col items-center">
      {!loading && !error ? (
        <UserDetail user={data.data} />
      ) : (
        <UserDetailPlaceholder />
      )}
    </div>
  );
}

export default DetailPage;
