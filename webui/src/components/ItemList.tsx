import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';

interface Item {
  id: number;
  date: string;
  value: number;
  comment: string;
  note: string;
  type: string;
}

const ItemList: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isReloading, setIsReloading] = useState<boolean>(false);
  
  const loadData = async () => {
    try {
      const response = await axios.get<Item[]>(`${process.env.REACT_APP_API_URL}/day/byMonth`);
      setItems(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleteItem = async (id: number) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/day/byId?id=${id}`);
      loadData(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const onRun = async () => {
      setIsReloading(true); // Set reloading state
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/run`);
        if (response.status === 200) {
           await loadData(); // Await the data reload before resetting the state
        } else {
           alert('Response code: ' + response.status);
        }
      } catch (error) {
          alert('Response code: ' + error);
          console.error('Something went wrong:', error);
      } finally {
        setIsReloading(false); // Reset reloading state
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Button List</h2>
        <button 
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${isReloading ? 'cursor-wait' : ''}`} 
          type="button" 
          onClick={onRun}
          disabled={isReloading} // Disable the button while reloading
        >
          {isReloading ? 'Reloading...' : 'RUN'}
        </button>
      </div>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold"></h2>
        <Link to="/add">
          <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
            type="button"
          >
            ADD
          </button>
        </Link>
      </div>
      <h2 className="text-xl font-semibold">Transactions</h2>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Amount</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Command</th>
            <th className="px-4 py-2">Type</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="border-b border-gray-200">
              <td className="px-4 py-2">{item.date}</td>
              <td className="px-4 py-2 text-right">{item.value}</td>
              <td className="px-4 py-2">{item.comment}</td>
              <td className="px-4 py-2">{item.note}</td>
              <td className="px-4 py-2">{item.type}</td>
              <td className="px-4 py-2">
                <button 
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" 
                  onClick={() => deleteItem(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemList;