import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
  };

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="text-white font-bold">Home</Link>
        <div>
          <Link to="/login" className="text-white mr-4">Login</Link>
          <Link to="/register" className="text-white">Register</Link>
          <button onClick={handleLogout} className="text-white ml-4">Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
