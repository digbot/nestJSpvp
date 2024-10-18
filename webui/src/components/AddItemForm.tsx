// src/components/AddItemForm.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


interface AddItemFormProps {
  onAdd: (item:any) => void;
  onCancel: () => void;
}

const AddItemForm: React.FC<AddItemFormProps> = ({ onAdd, onCancel }) => {

  const navigate = useNavigate(); // Initialize the useNavigate hook


  const getCurrentDateFormatted = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');  // Ensure two digits
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  };

  const [date, setDate] = useState<string>(getCurrentDateFormatted());
  const [amount, setAmount] = useState<string>("0");
  const [description, setDescription] = useState<string>('');
  const [command, setCommand] = useState<string>('');


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Convert amount to a number if needed
    const numericAmount = parseFloat(amount);

    // Create new item object
    const newItem = {
      id: getCurrentDateFormatted(), // Unique identifier
      date,
      amount: numericAmount,
      description,
      command,
    };

    try {
      // Perform the POST request
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });

      if (!response.ok) {
        throw new Error('Failed to add item');
      }

      const data = await response.json();

      onAdd(data); // Pass the new item data back to the parent component
      onCancel(); // Optionally clear the form or navigate away
      navigate('/'); // Redirect to the home page after successful submission
    } catch (error) {
      console.error('Error adding item:', error);
      // Optionally, handle the error (e.g., show an error message to the user)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Item</h2>
      <div>
        <label>Date:</label>
        <input type="text" value={date} onChange={(e) => setDate(e.target.value)} required />
      </div>
      <div>
        <label>Amount:</label>
        <input type="text" value={amount} onChange={(e) => setAmount(e.target.value) } required />
      </div>
      <div>
        <label>Description:</label>
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>
      <div>
        <label>Command:</label>
        <input type="text" value={command} onChange={(e) => setCommand(e.target.value)} required />
      </div>
      <button type="submit">Add Item</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default AddItemForm;
