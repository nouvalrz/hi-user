import { useState } from "react";
import Pagination from "@/components/Pagination";
import UserItem from "@/components/UserItem";
import { API_KEY, API_URL } from "@/constants";
import { useNavigate, useSearchParams } from "react-router";
import UserItemPlaceholder from "@/components/UserItemPlaceholder";
import Search from "@/components/Search";
import { useEffect } from "react";
import EmptyDataPlaceholder from "@/components/EmptyDataPlaceholder";
import { useContext } from "react";
import { UsersContext } from "@/contexts/UsersContext";
import Button from "@/components/Button";
import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

function HomePage() {
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchParam, setSearchParam] = useSearchParams();
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [page, setPage] = useState(Number(searchParam.get("page") || 1));

  const { loading, getUsers, users } = useContext(UsersContext);

  const pageChangeHandler = (newPage) => {
    setSearchParam({ page: newPage.toString() });
    setPage(newPage);
  };

  const searchChangeHandler = (value) => {
    setSearchKeyword(value);
  };

  useEffect(() => {
    getUsers(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    if (Object.keys(users).length !== 0) {
      console.log(users, "HOHO");
      setFilteredUsers(
        users.data.filter((item) => {
          const combinedName = `${item.first_name} ${item.last_name}`;
          return combinedName
            .toLowerCase()
            .includes(searchKeyword.toLowerCase());
        })
      );
    }
  }, [users, searchKeyword]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col justify-center items-center my-8">
        <h1 className="text-3xl font-semibold dark:text-white">
          Welcome to Hi User👋
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-300">
          Find all of users in one app
        </p>
        <div className="flex gap-3 items-center mt-6 w-full max-w-[600px]">
          <Search
            className="flex-1"
            placeholder="Search by name ..."
            onSearchChange={searchChangeHandler}
          />
          <Button
            className="rounded-full"
            onClick={() => navigate("/users/add")}
          >
            <Plus className="size-4 mr-2" />
            <p>Add Employee</p>
          </Button>
        </div>
        {users && (
          <div className="mt-6">
            <Pagination
              count={users.total_pages}
              current={page}
              onPageChange={pageChangeHandler}
            />
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
        <AnimatePresence>
          {loading.getUsers
            ? Array.from({ length: 6 }).map((_, index) => (
                <UserItemPlaceholder key={index} />
              ))
            : filteredUsers.map((item) => (
                <UserItem user={item} key={item.id} />
              ))}
        </AnimatePresence>
      </div>
      {filteredUsers.length === 0 && <EmptyDataPlaceholder className="mt-8" />}
    </div>
  );
}

export default HomePage;
