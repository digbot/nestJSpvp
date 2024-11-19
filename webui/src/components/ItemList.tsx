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
  const loadData = () => {
    fetch(process.env.REACT_APP_API_URL + '/api/data') // Replace with your actual API endpoint
        .then((response) => response.json())
        .then((data: any) => {
            console.log('----> :: ', data.msg_ids);
            setItems(data.msg_ids);
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
    fetch(`${process.env.REACT_APP_API_URL}/api/data/${id}`, {
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
      console.log ('REACT_APP_API_URL: ', process.env.REACT_APP_API_URL );

      fetch(`${process.env.REACT_APP_API_URL}/api/run`, {
        method: 'POST',
      })
      .then((response) => {
        if (response.ok) {
          alert(JSON.stringify(response));
        }
      })
      .catch((error) => console.error('Something went wrong', error));
  }

  return (
    <div>
      <div>
         <h2>Button list List</h2>
         <button type="button" onClick={onRun}>RUN</button>  
      </div>  
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
                <button onClick={() => deleteItem(index + 1)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemList;
