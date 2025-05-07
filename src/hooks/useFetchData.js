import { useEffect } from "react";
import { useState } from "react"

export const useFetchData = ({ endpoint, options }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(endpoint, options);
        const responseJson = await response.json();
        setData(responseJson);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint]);

  return { data, loading, error };
}