import React from 'react';
import  HomePage from '../Pages/HomePage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const UserStack = () => {
  return (
      <Routes>
            <Route path="/" element={<HomePage />} />
      </Routes>
  );
}

export default UserStack;