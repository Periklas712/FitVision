
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPageImg from './assets/components/LandingPageImg';
import NavBar from './assets/components/NavBar';
import Profile from './Profile';
import Footer from './assets/components/Footer';
import InformationForm from './assets/components/InformationForm';
import ContactPage from './assets/components/ContactPage';
import InfoPage from './assets/components/InfoPage';
import SecondPageForm from './assets/components/SecondPageForm';
import GenerateWorkoutPage from './assets/components/GenerateWorkoutPage';

function App() {
  return (
    <Router>
      <div className='bg-[#DFF1FF]'>
        <NavBar />
        <Routes>
          <Route path="/" element={<LandingPageImg />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/InformationForm" element={<InformationForm />} />
          <Route path="/ContactPage" element={<ContactPage/>} />
          <Route path="/InfoPage" element={<InfoPage/>}/>
          <Route path="/SecondPageForm" element={<SecondPageForm/>}/>
          <Route path="/GenerateWorkoutPage" element={<GenerateWorkoutPage/>}/>
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App; 
