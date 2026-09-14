import React, { useEffect, useState } from "react";
import {getEnums} from "../services/ApiHandler" ;
import { useNavigate } from "react-router";

export default function Questionnaire() {
  const [equipment, setEquipment] = useState("");
  const [goal, setGoal] = useState("");
  const [experience, setExperience] = useState(0);
  const [isHover, setIsHover] = useState(false);
  const [goalOptions,setGoalOptions]=useState([]);
  const [equipmentOptions,setEquipmentOptions] = useState([]);
  const navigate = useNavigate();

  useEffect(()=>{
    const loadEnums = async () => {
      try {
        const enums = await getEnums();
        setEquipmentOptions(enums.fitnessEquipment || [] );
        setGoalOptions(enums.fitnessGoal||[]);
      }catch (error){
        console.log(error);
      }
    };
    loadEnums();
  },[]);

  const containerBox = {
    display: "flex",
    flexDirection: "row",
    gap: "40px",
    padding: "40px",
    fontFamily: "VT323, monospace",
    height:"60vh"
   
  };

  const headerTextStyle = {
    fontSize: "2.5rem",
    color: "#f12a54",
    textAlign: "center",
    marginBottom: "20px",
  };

  const inputContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    marginTop:"2em"
  };

  const rowForLabel={
    display:"flex",
    flexDirection:"row",
    gap:"10px",
  };

  const inputLabelStyle = {
    fontSize: "1.5rem",
    color: "#f12a54",
    fontWeight: "bold",
    marginTop:'9px'
  };

  const selectStyle = {
    padding: "8px 12px",
    border: "2px solid #f12a54",
    borderRadius: "6px",
    fontFamily: "VT323, monospace",
    fontSize: "1.2rem",
  };

  const buttonStyle = {
 
    fontFamily: "VT323, monospace",
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#f12a54",
    backgroundColor: "transparent",
    border: "2px solid #f12a54",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.3s ease",
    width:"100px",
    height:"40px",
    marginTop:"20em",

  };

  const buttonHoverStyle = {
    ...buttonStyle,
    backgroundColor: "#f12a54",
    color: "white",
  };

  const sliderContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "5px",
    marginTop: "10px",
  };

  const sliderStyle = {
    width: "250px",
    accentColor: "#f12a54",
  };
  function formatEnum(value){
    return value.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  }

  const handleNextClick =() =>{
    localStorage.setItem("fitnessGoal",goal);
    localStorage.setItem("fitnessEquipment",equipment);
    if (experience === 0){
      localStorage.setItem("fitnessLevel","BEGINNER");
    }else if (experience === 1){
      localStorage.setItem("fitnessLevel","INTERMEDIATE");
    }else{
      localStorage.setItem("fitnessLevel","ADVANCED");
    }
   
    
    navigate("/GenerateWorkoutPage");



  }

  return (
    <div style={containerBox}>
      <div style={inputContainerStyle}>
      <h2 style={headerTextStyle}>What equipment do you have ?</h2>
      <div style={rowForLabel}>
        <label htmlFor="equipment" style={inputLabelStyle}>
          Equipment:
        </label>
        <select
          id="equipment"
          value={equipment}
          onChange={(e) => setEquipment(e.target.value)}
          style={selectStyle}
        >
          <option value="">-- Select Equipment --</option>
          {equipmentOptions.map((eq,i)=>(
            <option key={i} value={eq}>{formatEnum(eq)}</option>
          ))}
        </select>
        </div>
      </div>

      <div style={inputContainerStyle}>
      
        <img src="/FitVisionLogo2.png"              
            alt="FitVision"             
            className="object-cover drop-shadow-sm"             
            style={{ width: '300px', height: '300px',marginTop:"2em",backgroundColor:"#DFF1FF"}}/>
      <h2 style={headerTextStyle}>
          How would you rate yourself on your experience ?
        </h2>
        <div style={rowForLabel}>
        <label htmlFor="experience" style={inputLabelStyle}>
          Experience:
        </label>
        <div style={sliderContainerStyle}>
          <input
            type="range"
            min="0"
            max="2"
            step="1"
            value={experience}
            onChange={(e) => setExperience(Number(e.target.value))}
            style={sliderStyle}
          />
          <div style={{ display: "flex", justifyContent: "space-between", width: "250px", fontSize: "1rem" }}>
            <span style={{ color: experience === 0 ? "#f12a54" : "black" }}>Beginner</span>
            <span style={{ color: experience === 1 ? "#f12a54" : "black" }}>Intermediate</span>
            <span style={{ color: experience === 2 ? "#f12a54" : "black" }}>Advanced</span>
            </div>
          </div>
        </div>
       
      </div>

      {/* Experience */}
      <div style={inputContainerStyle}>
      <h2 style={headerTextStyle}>What are your goals ?</h2>
        <div style={rowForLabel}>
            <label htmlFor="goal" style={inputLabelStyle}>
            Goal:
            </label>
            <select
            id="goal"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            style={selectStyle}
            >
            <option value="">-- Select Goal --</option>
            {goalOptions.map((goal,i)=>(
              <option key={i} value={goal}>{formatEnum(goal)}</option>
            ))}
            </select>
        </div>
        
      </div>
      <button
        style={isHover ? buttonHoverStyle : buttonStyle}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        onClick={handleNextClick}
      >
        Next
      </button>
     
    </div>
    
  );
}
