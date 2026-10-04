
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPageImg from './assets/components/LandingPageImg';
import NavBar from './assets/components/NavBar';
import Footer from './assets/components/Footer';
import InformationForm from './assets/components/InformationForm';
import SecondPageForm from './assets/components/SecondPageForm';
import GenerateWorkoutPage from './assets/components/GenerateWorkoutPage';
import MyPlansPage from './assets/components/MyPlansPage';

function App() {
  return (
    <Router>
      <div className='bg-[#DFF1FF]'>
        <NavBar />
        <Routes>
          <Route path="/" element={<LandingPageImg />} />
          <Route path="/InformationForm" element={<InformationForm />} />
          <Route path="/SecondPageForm" element={<SecondPageForm/>}/>
          <Route path="/GenerateWorkoutPage" element={<GenerateWorkoutPage/>}/>
          <Route path="/MyPlans" element={<MyPlansPage/>}/>
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
}

export default App; 
