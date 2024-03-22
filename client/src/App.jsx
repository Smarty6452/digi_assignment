// App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './pages/Home';
import SignUp from './components/SignUp';
import Login from './components/Login';


function App() {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={isLoggedIn ? <Home /> : <SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
