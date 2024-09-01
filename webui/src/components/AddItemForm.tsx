// src/components/AddItemForm.tsx
import React, { useState } from 'react';

interface AddItemFormProps {
  onAdd: (item:any) => void;
  onCancel: () => void;
}

const AddItemForm: React.FC<AddItemFormProps> = ({ onAdd, onCancel }) => {
  const [date, setDate] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [description, setDescription] = useState<string>('');
  const [command, setCommand] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem = [
      Date.now(),
      amount,
      description,
      command,
    ];
    onAdd(newItem);
    onCancel(); // Optionally navigate back or clear the form
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Item</h2>
      <div>
        <label>Date:</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      </div>
      <div>
        <label>Amount:</label>
        <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} required />
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
