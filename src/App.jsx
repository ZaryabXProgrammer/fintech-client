import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Home from './Pages/Home';
import { Navbar } from './Elements/Navbar';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Pricing from './Pages/Pricing';
import DashboardHome from './Pages/Dashboard/DashboardHome';
import NotFound from './Pages/NotFound';
import { userRequest } from './lib/RequestMethods';

const App = () => {
  const [subscriptionStatus, setSubscriptionStatus] = useState(false)
  const user = useSelector((state) => state.user.currentUser?.user || null);


  useEffect(() => {

    const checkSubscriptionStatus = async () => {
      const res = await userRequest.get("/subscriptions/status")
      setSubscriptionStatus(res.data.subscribed)
      console.log("Subscription Staus is:", res.data.subscribed)
    }

    checkSubscriptionStatus();
  }, [])


  return (
    <div className='bg-[#1f1f1f] text-[#fbfbfb]'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/pricing' element={<Pricing />} />

          {/* Protected Dashboard Route */}
          <Route
            path='/dashboard/*'
            element={
              user ? (
                subscriptionStatus ? (
                  <DashboardHome />
                ) : (
                  <Navigate to='/pricing' />
                )
              ) : (
                <Navigate to='/login' />
              )
            }
          />

          <Route path='*' element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
