import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import { Navbar } from './Elements/Navbar';


const App = () => {
  return (
    <div className='bg-[#1f1f1f] text-[#fbfbfb]'>

      <Router>
        <Navbar />
        <Routes>

          <Route path='/' element={<Home />} />

        </Routes>

      </Router>

    </div>
  )
}

export default App