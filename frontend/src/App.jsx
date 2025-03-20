import './App.css';
import Login_page from './components/Login_page';
import Body from './components/Body';
// import LoginPage from './components/Login_page';
import Mainpage from './components/Mainpage';
import Profile from './components/Profile';
import Signup from './components/Signup';
import RefrshHandler from './RefrshHandler';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import CareerCafe from './components/CareerCafe';
import Entrepreneurship from './components/Entrepreneurship';
import Interview from './components/Interview';
import Quiz from './quiz/Quiz';
import QuizSection from './quiz/QuizSection';
import { Result } from './quiz/Result';
import CreateQuiz from './quiz/CreateQuiz';
import Admin from './components/Admin';
import ReferralPage from './components/ReferralPage';
import WeeklyAssessment from './components/WeeklyAssessment';
import { PointsProvider } from './context/PointsContext';
import JobOpportunities from './components/JobOpportunities';

import {
  BrowserRouter as Router,
  Route,
  Routes, // Import Routes instead of Switch
} from 'react-router-dom';

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Current auth token:', token);
    setIsAuthenticated(!!token);
  }, []);

  const PrivateRoute = ({ element }) => {
    console.log('PrivateRoute check - isAuthenticated:', isAuthenticated);
    return isAuthenticated ? element : <Navigate to="/login" />;
  }

  return (
    <PointsProvider>
      <Router>
        <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
        <Routes>
          <Route path="/" element={<Mainpage/>} />
          <Route path='/body' element={<PrivateRoute element={<Body />} />} />
          <Route path="/body/career-cafe" element={<PrivateRoute element={<CareerCafe />} />} />
          <Route path="/body/entrepreneurship" element={<PrivateRoute element={<Entrepreneurship />} />} />
          <Route path="/body/interview" element={<PrivateRoute element={<Interview/>} />} />
          <Route path="/body/job-opportunities" element={<PrivateRoute element={<JobOpportunities />} />} />
          <Route path="/body/quiz" element={<PrivateRoute element={<Quiz/>} />} />
          <Route path="/body/quizsection/:quizId" element={<PrivateRoute element={<QuizSection/>} />} />
          <Route path="/body/quiz/create" element={<PrivateRoute element={<CreateQuiz/>} />} />
          <Route path="/body/referrals" element={<PrivateRoute element={<ReferralPage />} />} />
          <Route path="/body/weekly-assessment" element={<PrivateRoute element={<WeeklyAssessment />} />} />
          <Route path='/body/result' element={<Result/>}  />
          <Route path="/login" element={<Login_page/>}/>
          <Route path="/myprofile" element = {<Profile/>}/>
          <Route path="/signup" element = {<Signup/>}/>
          <Route path="/admin" element={<PrivateRoute element={<Admin />} />} />
        </Routes>
      </Router>
    </PointsProvider>
  );
}

export default App;
