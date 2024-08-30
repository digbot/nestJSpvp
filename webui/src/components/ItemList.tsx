import React, { useState, useEffect } from 'react';

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
  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/data') // Replace with your actual API endpoint
      .then((response) => response.json())
      .then((data: any) => {
        setItems(data.msg_ids);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  const deleteItem = (id: number) => {
    // Implement the delete logic here
    fetch(`http://127.0.0.1:5000/api/data/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
       //   setItems(items.filter((item) => item.date !== id));
        }
      })
      .catch((error) => console.error('Error deleting item:', error));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Items List</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Description</th>
            <th>Command</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item[0]}</td>
              <td>{item[1]}</td>
              <td>{item[2]}</td>
              <td>{item[3]}</td>
              <td>
                <button onClick={() => deleteItem(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemList;
