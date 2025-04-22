import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import { Navbar } from './Elements/Navbar';

import Login from './Pages/Login';
import Register from './Pages/Register';
import Pricing from './Pages/Pricing';
import LoginForm from './Pages/Login';
import PricingComponent from './Pages/Pricing';
import DashboardHome from './Pages/Dashboard/DashboardHome';
import NotFound from './Pages/NotFound';
import { useSelector } from 'react-redux';

{/* <div className='bg-[#1f1f1f] text-[#fbfbfb]'> */ }
const App = () => {

  const user = useSelector((state) => state.user.currentUser ? state.user.currentUser.user : null);
  console.log(user)

  return (
    <div className='bg-[#1f1f1f] text-[#fbfbfb]'>

      <Router>
        <Navbar />
        <Routes>

          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/pricing' element={<PricingComponent />} />
          <Route path='/dashboard/*' element={<DashboardHome />} />
          <Route path="*" element={<NotFound />} />

        </Routes>

      </Router>

    </div>
  )
}

export default App