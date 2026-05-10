import React from 'react'
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Error from './Components/Error';
import Login from './Components/Login';
import Dashboard_Student from './Components/Student/Dashboard_Student';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='*' element={<Error />} />
        <Route path='/' element={<Login />} />

        <Route path='/student-dashbord' element={<Dashboard_Student />} />
      </Routes>
    </Router>
  )
}

export default App