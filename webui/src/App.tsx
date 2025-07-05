import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import ItemList from './components/ItemList';
import MonthList from './components/MonthList';
import AddItemForm from './components/AddItemForm'; 
import DisplayCurrentMonth from './components/DisplayCurrentMonth';

const App: React.FC = () => {
  return (
    <Router>
      <div className="bg-gray-100">
      <div className="App">
          <header className="App-header">
            <h1>Account Application [AA_V: 0.1]</h1>
            <DisplayCurrentMonth/>
            <Routes>
              <Route path="/" element={<ItemList />} />
              <Route path="/months" element={<MonthList  />} />
              <Route path="/add" element={<AddItemForm onAdd={() => {}} onCancel={() => { window.location.replace('/') }} />} />
            </Routes>
          </header>
        </div>
      </div>
    </Router>
  );
};

export default App;
