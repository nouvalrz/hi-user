import { useState } from "react";
import Pagination from "../components/Pagination";
import UserItem from "../components/UserItem";
import { API_KEY, API_URL } from "../constants";
import { useFetchData } from "../hooks/useFetchData";
import { useSearchParams } from "react-router";
import UserItemPlaceholder from "../components/UserItemPlaceholder";
import Search from "../components/Search";
import { useEffect } from "react";
import EmptyDataPlaceholder from "../components/EmptyDataPlaceholder";

function HomePage() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchParam, setSearchParam] = useSearchParams();
  const [filteredUsers, setFilteredUsers] = useState([]);
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

  const searchChangeHandler = (value) => {
    setSearchKeyword(value);
  };

  useEffect(() => {
    if (data) {
      setFilteredUsers(
        data.data.filter((item) => {
          const combinedName = `${item.first_name} ${item.last_name}`;
          return combinedName
            .toLowerCase()
            .includes(searchKeyword.toLowerCase());
        })
      );
    }
  }, [data, searchKeyword]);

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col justify-center items-center my-8">
        <h1 className="text-3xl font-semibold ">Welcome to Hi User👋</h1>
        <p className="text-sm text-gray-500">Find all of users in one app</p>
        <Search
          className="w-md mt-6"
          placeholder="Search by name ..."
          onSearchChange={searchChangeHandler}
        />
        {data && (
          <div className="mt-6">
            <Pagination
              count={data.total_pages}
              current={page}
              onPageChange={pageChangeHandler}
            />
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <UserItemPlaceholder key={index} />
            ))
          : filteredUsers.map((item, index) => (
              <UserItem user={item} key={index} />
            ))}
      </div>
      {filteredUsers.length === 0 && <EmptyDataPlaceholder className="mt-8" />}
    </div>
  );
}

export default HomePage;
