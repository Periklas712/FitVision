import { useState } from "react";
import {useNavigate} from "react-router-dom";
import secondPageForm from "./SecondPageForm";      

function InformationForm() {

    const containerStyle = {
        backgroundColor: '#DFF1FF',
        display: "flex", 
        flexDirection: "column",
        alignItems: "center",
        minHeight: "70vh", 
        border:'2px solid #f12a54 ',
        borderRadius: '4em'
    };

    const titleStyle = {
        animation: "tracking-in-expand 1s both, pulse 2s infinite",
        backgroundClip: "text", 
        color: "#f12a54", 
        fontSize: '4.5rem',
        fontWeight: 'bold',
        fontFamily: 'VT323, monospace',    
        textAlign: "center"
    };

    const InputLabel = {
        animation: "tracking-in-expand 1s both, pulse 2s infinite",
        backgroundClip: "text", 
        color: "#f12a54", 
        fontSize: '2.0rem',
        fontWeight: 'bold',
        fontFamily: 'VT323, monospace',    
        textAlign: "center"
    };
    const inputContainerStyle = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        marginTop: '10px',
    };

    const inputStyle = {
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #f12a54',
        fontFamily: 'VT323, monospace',
    };
    const textStyle ={
        animation: "tracking-in-expand 1s both, pulse 2s infinite",
        backgroundClip: "text", 
        color: "#f12a54", 
        fontSize: '2.0rem',
        fontWeight: 'bold',
        fontFamily: 'VT323, monospace',    
        textAlign: "center"
    };

    const [hover,setHover] = useState(false);
    const buttonStyle ={
        border:'none',
        backgroundColor: hover ? "#b3e0ff" : "#DFF1FF",
        height: '3em',
        width: '6em',
        cursor: "pointer",
        transition: "background-color 0.3s ease",
    }

    const [mail,setMail] = useState("");
    const [username,setUserName]=useState("");
    const navigate = useNavigate();

    const handleButtonClick = () =>{
        console.log("Username: ",username);
        console.log("Email: ",mail);

        localStorage.setItem("createUserData",JSON.stringify({username,mail}));

        navigate("/secondPageForm");

    }

    return (
        <div style={containerStyle}>
            <h1 style={titleStyle}>Tell us about you champ ...</h1>
        
            <div style={inputContainerStyle}>
                <p style={InputLabel}>Name: </p>
                <input id="usernameInput" style={inputStyle} type="text" placeholder="Enter your name" value={username} onChange={(e)=>setUserName(e.target.value)} />
            </div>
            <h2 style={textStyle}>and let your fitness journey begin !</h2>
            <div style={inputContainerStyle}>
                <p style={InputLabel}>Email: </p>
                <input id="emailInput" style={{...inputStyle,width: "10em"}} type="text" placeholder="Enter your email" value={mail} onChange={(e)=>setMail(e.target.value)}/>
            </div>
            <button style = {buttonStyle}
                    onMouseEnter={()=>setHover(true)}
                    onMouseLeave={()=>setHover(false)}
                    onClick={handleButtonClick}>
                <img src="/arrow-right.png" alt="Next Page" style ={{width:'30px',height:'20px'}}/>
            </button>
            <p>Note ! All information are private </p>
        </div>
    );
}

export default InformationForm;