import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DisplayCurrentMonth: React.FC = () => {
  const [lastItem, setLastItem] = useState<any>('');
  const [loading, setLoading] = useState<boolean>(true);
  
  const loadData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/month/short/`);
      const items = response.data;
      setLastItem(items[0]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadData();
    }, 2000); // 2000 milliseconds = 2 seconds

    // Optional cleanup in case the component unmounts before timeout completes
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="">
       {JSON.stringify(lastItem, null, 2)}
    </div>
  );
};

export default DisplayCurrentMonth;