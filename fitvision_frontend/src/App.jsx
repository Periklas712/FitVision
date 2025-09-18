
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPageImg from './assets/components/LandingPageImg';
import NavBar from './assets/components/NavBar';
import Profile from './Profile';

function App() {
  return (
    <Router>
      <div className='bg-[#DFF1FF]'>
        <NavBar />
        <Routes>
          <Route path="/" element={<LandingPageImg />} />
          <Route path="/Profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 
