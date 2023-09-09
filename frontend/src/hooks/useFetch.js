import { useEffect, useState } from "react";
import { getData } from "../utils/api";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getData(url)
      if (!res.ok) {
        setError("failed to fetch");
        alert("failed to fetch");
      }
      const result = await res.json();
      setData(result.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return {
    data,
    error,
    loading,
    fetchData,
  };
};

export default useFetch;
