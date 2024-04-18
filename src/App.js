// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes component
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';
import CalorieTracker from './components/BMI';
import MealDB from './components/MealDB'; // Import the MealDB component
import Home from './components/Home';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> {/* Add route for Register component */}
          <Route path="/BMI" element={<CalorieTracker />} />
          <Route path="/meal-db" element={<MealDB />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}


export default App;
