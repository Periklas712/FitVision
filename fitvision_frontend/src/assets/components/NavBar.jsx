import { useNavigate } from 'react-router-dom';

function NavBar() {   
  const navigate = useNavigate();

  const handleLogoClick = () => {     
    navigate('/');  
  };    

  const handleProfileClick = () => {     
    navigate('/Profile');   
  };    

  return (     
    <nav className="w-full bg-[#DFF1FF] px-8 py-6 shadow-sm border-b border-blue-100">       
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">                  
        <div            
          onClick={handleLogoClick}           
          className="bg-[#DFF1FF] rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-md p-3 w-20 h-16"         
        >           
          <img             
            src="/FitVisionLogo2.png"              
            alt="FitVision"             
            className="object-cover drop-shadow-sm"             
            style={{ width: '150px', height: '100px' }}
          />         
        </div>         
        
        <div className="flex-1 flex justify-center px-8">
          <h1 className="tracking-in-expand text-[#f12a54] font-bold text-center bg-gradient-to-r from-[#f12a54] to-[#e91e63] bg-clip-text text-transparent drop-shadow-sm animate-pulse whitespace-nowrap" 
              style={{fontSize: '48px', textShadow: '0 2px 4px rgba(241, 42, 84, 0.1)'}}>
            A new era of workouts
          </h1>
        </div>
                                   
        <div            
          onClick={handleProfileClick}           
          className="flex items-center cursor-pointer transition-all duration-300 hover:bg-blue-50 hover:shadow-md rounded-lg p-3 hover:scale-105 w-20 h-16"         
        >             
          <img               
            src="/person.png"               
            alt="Profile"               
            className="object-cover rounded-full border-2 border-white shadow-sm mx-auto"               
            style={{width: '48px', height: '48px'}}
          />         
        </div>                
      </div>     
    </nav>   
  ); 
}  

export default NavBar;