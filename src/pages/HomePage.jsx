import { useState } from "react";
import Pagination from "../components/Pagination";
import UserItem from "../components/UserItem";
import { API_KEY, API_URL } from "../constants";
import { useFetchData } from "../hooks/useFetchData";
import { useSearchParams } from "react-router";

function HomePage() {
  const [searchParam, setSearchParam] = useSearchParams();
  const [page, setPage] = useState(Number(searchParam.get("page") || 1));

  const { data, loading, error } = useFetchData(
    {
      endpoint: API_URL + (page ? `users?page=${page}` : `users`),
      options: {
        headers: {
          ...API_KEY,
        },
      },
    },
    [page]
  );

  const pageChangeHandler = (newPage) => {
    setSearchParam({ page: newPage.toString() });
    setPage(newPage);
  };

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div>
      <div className="flex flex-col justify-center items-center my-8">
        <h1 className="text-3xl font-semibold ">Welcome to Hi User👋</h1>
        <p>Find all of users in one app</p>
        {data && (
          <div>
            <Pagination
              count={data.total_pages}
              current={page}
              onPageChange={pageChangeHandler}
            />
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
        {!loading ? (
          data.data.map((item, index) => <UserItem {...item} key={index} />)
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;
