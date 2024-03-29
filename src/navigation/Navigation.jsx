import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AuthStack from './AuthStack';
import UserStack from './UserStack';


import app from '../../firebaseConfig';

const Navigation = () => {
  const isAuth = true; 
  return (
    <>
      
        {isAuth ? <UserStack /> : <AuthStack />} 
    </>
  );
}

export default Navigation;

 