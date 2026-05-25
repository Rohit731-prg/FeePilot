import React from 'react'
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Error from './Components/Error';
import Login from './Components/Login';
import Dashboard_Student from './Components/Student/Dashboard_Student';
import Subjects_Student from './Components/Student/Subjects';
import Payment_Student from './Components/Student/Payment_Student';
import Student_batch from './Components/Student/Student_batch';
import DashBoard_Teacher from './Components/Teacher/DashBoard_Teacher';
import Course from './Components/Teacher/Course';
import Student_Portal from './Components/Teacher/Student_Portal';
import Batch_Details from './Components/Teacher/Batch_Details';
import Student_details from './Components/Teacher/Student_details';
import Payment_Details from './Components/Teacher/Payment_Details';

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

        <Route path='/dashboard' element={<DashBoard_Teacher/>} />
        <Route path='/course-info' element={<Course />} />
        <Route path='/batch-details/:id' element={<Batch_Details />} />
        <Route path='/student-portal' element={<Student_Portal />} />
        <Route path='/student-details' element={<Student_details />} />
        <Route path='/payment-details' element={<Payment_Details />} />
      </Routes>
    </Router>
  )
}

export default App