import React from 'react';
import Register from '../Pages/Register';
import SignUp from '../Pages/SignUp';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const AuthStack = () => {
  return (
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<SignUp />} />
      </Routes>
  );
}

export default AuthStack;