import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import ItemList from './components/ItemList';
import AddItemForm from './components/AddItemForm'; 

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Fetch and List Items</h1>
          <Routes>
            <Route path="/" element={<ItemList />} />
            <Route path="/add" element={<AddItemForm onAdd={() => {}} onCancel={() => {}} />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
};

export default App;
