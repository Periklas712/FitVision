function LandingPageImg() {
  const containerStyle = {
    backgroundImage: 'url("/gymimg.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: 'white',
    position: 'relative',
  };

  const overlayStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: '2rem',
    borderRadius: '10px',
  };

  const buttonStyle = {
    marginTop: '1rem',
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    backgroundColor: '#ff5e57',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  return (
    <div style={containerStyle}>
      <div style={overlayStyle}>
        <h2>DISCOVER THE BEST WORKOUT PLANS</h2>
        <h4>Let our smart fitness coach create personalized workout plans</h4>
        <button style={buttonStyle}>Get Started</button>
      </div>
    </div>
  );
}

export default LandingPageImg;
