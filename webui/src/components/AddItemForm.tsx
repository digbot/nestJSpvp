// src/components/AddItemForm.tsx
import React, { useState } from 'react';
import sha256 from 'crypto-js/sha256';
import { useNavigate } from 'react-router-dom';

interface AddItemFormProps {
  onAdd: (item:any) => void;
  onCancel: () => void;
}

function hashStringWithCryptoJS(input: any) {
  return sha256(input).toString();
}

const AddItemForm: React.FC<AddItemFormProps> = ({ onAdd, onCancel }) => {

  const navigate = useNavigate(); // Initialize the useNavigate hook

  const getCurrentDateFormatted = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');  // Ensure two digits
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();

    let now = new Date().toISOString(); // ISO 8601 format

    return `${day}.${month}.${year}_${now}`;
  };

  const [date, setDate] = useState<string>(getCurrentDateFormatted());
  const [amount, setAmount] = useState<String>('');
  const [description, setDescription] = useState<string>('');
  const [comment, setComment] = useState<string>('');


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Convert amount to a number if needed
    const numericAmount = amount;

    // Create new item object
    let newItem = {
      date: getCurrentDateFormatted(), // Unique identifier,
      value: Number(numericAmount),
      note: description,
      comment: comment,
      type: 'manuel',
      hash: '',
    }
    newItem.hash = newItem.date + '_' + hashStringWithCryptoJS(
      newItem.date + '_' + newItem.value + '_' + newItem.note + '_' + newItem.comment
    );

    try {
      // Perform the POST request
      const response = await fetch(`${process.env.REACT_APP_API_URL}/day/`, {
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-lg font-bold">Add New Item</h2>
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">Date:</label>
        <input 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
          type="date" 
          id="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">Amount:</label>
        <input 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
          type="text" 
          id="amount" 
          value={amount.toString()} 
          onChange={(e) => setAmount(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="command">Command:</label>
        <input 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
          type="text" 
          id="command" 
          value={comment} 
          onChange={(e) => setComment(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Description:</label>
        <input 
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
          type="text" 
          id="description" 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
        />
      </div>
      <div className="flex justify-between">
        <button 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
          type="submit"
        >
          Add Item
        </button>
        <button 
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
          type="button" 
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddItemForm;
