import {useNavigate} from "react-router-dom";

function LandingPageImg() {

const navigate = useNavigate();

const handleClickOnBegin = () =>{
  navigate("/InformationForm");

};

const handleClickContact=()=>{
  navigate("/ContactPage")
};

const handleClickInfo =()=>{
  navigate("/InfoPage")
};

  const containerStyle = {
    backgroundImage: 'url("/LandingPage.png")',
    backgroundSize: "cover",
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: 'white',
    position: 'relative',
    padding: '1rem',
    borderRadius: '10px',
  };

  const headerTextStyle = {
    position: 'absolute',
    top: '20%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    width: '100%',
  };

  const mainHeadingStyle = {
    fontSize: '3.5rem',
    fontWeight: 'bold',
    fontFamily: 'VT323, monospace',
    color: '#f12a54',
    lineHeight: '1.1',
    textAlign: 'center',
    letterSpacing: '2px',
    animation: 'tracking-in-expand 1s both, pulse 2s infinite',
    backgroundClip: 'text',
  };

  const subHeadingStyle = {
    fontSize: '1.4rem',
    color: 'white',
    marginTop: '1rem',
    fontWeight: "bold",
    fontFamily: 'VT323, monospace',
    textAlign: 'center',
    textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
    animation: 'tracking-in-expand 1s both, pulse 2s infinite',
  };

  const buttonContainerStyle = {
    position: 'absolute',
    bottom: '10%',
    left: '5%',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  };

  const buttonStyle = {
    padding: '0.75rem 2rem',
    fontSize: '1rem',
    backgroundColor: '#DFF1FF',
    fontFamily: 'VT323, monospace', 
    color: '#f12a54',
    borderRadius: '15px',
    cursor: 'pointer',
    minWidth: '120px',
    border: '1px solid #f12a54',
    textAlign: 'center',
  };


  const getStartedButtonStyle = {
    position: 'absolute',
    bottom: '10%',
    right: '5%',
    fontFamily: 'VT323, monospace', 
    padding: '1.5rem 3rem',
    fontSize: '2.0rem',
    backgroundColor: '#DFF1FF',
    color: '#f12a54',
    borderRadius: '15px',
    border: '1px solid #f12a54',
    cursor: 'pointer',
  };

  return (
    <div style={containerStyle}>
      <div style={headerTextStyle}>
        <h1 style={mainHeadingStyle}>
          DISCOVER THE MOST SUITABLE WORKOUT PLANS
        </h1>
        <p style={subHeadingStyle}>
          LET OUR AI COACH SUGGEST<br />
          YOU THE BEST WORKOUT<br />
          PLANS
        </p>
      </div>
      
      <div style={buttonContainerStyle}>
        <button style={buttonStyle} onClick={handleClickContact}>Contact Us</button>
        <button style={buttonStyle}onClick={handleClickInfo}>Information</button>
      </div>

      <button style={getStartedButtonStyle} onClick={handleClickOnBegin}>
        Start Your Journey →
      </button>
    </div>

  );
}

export default LandingPageImg;
