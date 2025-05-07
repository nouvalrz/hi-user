import UserItem from "../components/UserItem";
import { API_KEY, API_URL } from "../constants";
import { useFetchData } from "../hooks/useFetchData";

function HomePage() {
  const { data, loading, error } = useFetchData({
    endpoint: API_URL + "users",
    options: {
      headers: {
        ...API_KEY,
      },
    },
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
      {data.data.map((item, index) => (
        <UserItem {...item} key={index} />
      ))}
    </div>
  );
}

export default HomePage;
