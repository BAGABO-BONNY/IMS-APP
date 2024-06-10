import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Welcome to the Inventory Management System</h1>
      <div className="flex space-x-4">
        <Link to="/login">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300">
            Login
          </button>
        </Link>
        <Link to="/register">
          <button className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-green-700 transition duration-300">
            Register
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
