import React, {useState, useEffect} from 'react';
import fetchRequest from '../utils/fetchRequest';

// 自定义 Hook
const useFetchData = (url, initData) => {
  const [data, setData] = useState(initData || []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = async (url) => {
    try {
      let responseJson = await fetchRequest(url);
      setData(responseJson);
    } catch (err) {
      console.warn(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(url);
  }, [url]);

  return {data, setData, loading, setLoading, error, setError, fetchData};
};

export default useFetchData;
