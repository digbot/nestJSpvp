import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

// Define a TypeScript interface for the item structure
interface Item {
  id: number;
  date: string;
  amount: number;
  description: string;
  command: string;
}

const ItemList: React.FC = () => {
  const [items, setItems] = useState<[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  // Fetch the data from an API (replace with your actual API)
  const loadData = () => {
    fetch(process.env.REACT_APP_API_URL + '/day/byMonth') // Replace with your actual API endpoint
        .then((response) => response.json())
        .then((data: any) => {
            setItems(data);
          setLoading(false);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            setLoading(false);
        });
  }
  useEffect(() => {
    loadData();
  }, []);

  const deleteItem = (id: number) => {
    // Implement the delete logic here
    fetch(`${process.env.REACT_APP_API_URL}/day/byId?id=${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          loadData();
        }
      })
      .catch((error) => console.error('Error deleting item:', error));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  const onRun = () => {
      // Implement the delete logic here
      fetch(`${process.env.REACT_APP_API_URL}/run`, {
        method: 'GET',
      })
      .then((response) => {
        if (response.ok) {
          window.location.reload();
        }
      })
      .catch((error) => console.error('Something went wrong', error));
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Button List</h2>
        <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
          type="button" 
          onClick={onRun}
        >
          RUN
        </button>
      </div>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold"> </h2>
        <Link to="/add">
          <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
            type="button" 
            onClick={onRun}
          >
            ADD
          </button>
        </Link>
      </div>
      <h2 className="text-xl font-semibold">Items List</h2>
      <table className="w-full table-auto space-y-2">
        <thead>
          <tr className="bg-gray-200">
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
            <tr key={item['id']} className="border-b border-gray-200">
              <td className="px-4 py-2">{new Date(item['date']).toLocaleDateString()}</td>
              <td className="px-4 py-2 text-right">{item['value']}</td>
              <td className="px-4 py-2 text-left">{item['comment']} </td>
              <td className="px-4 py-2 text-left">{item['note']}</td>
              <td className="px-4 py-2 text-left">{item['type']}</td>
              <td className="px-4 py-2">
                <button 
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" 
                  onClick={() => deleteItem(item['id'])}
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
