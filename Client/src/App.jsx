import React from 'react'
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Error from './Components/Error';
import Login from './Components/Login';
import Dashboard_Student from './Components/Student/Dashboard_Student';
import Subjects_Student from './Components/Student/Subjects';
import Payment_Student from './Components/Student/Payment_Student';
import Student_batch from './Components/Student/Student_batch';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='*' element={<Error />} />
        <Route path='/' element={<Login />} />

        <Route path='/student-dashbord' element={<Dashboard_Student />} />
        <Route path='/student-subject' element={<Subjects_Student />} />
        <Route path='/student-payment' element={<Payment_Student />} />
        <Route path='/student-batch' element={<Student_batch />} />
      </Routes>
    </Router>
  )
}

export default App