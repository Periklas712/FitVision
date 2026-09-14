import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function GenerateWorkoutPage() {
  const [goalError, setGoalError] = useState(false);
  const [levelError, setLevelError] = useState(false);
  const [equipmentError, setEquipmentError] = useState(false);
  const navigate = useNavigate();
  const [isHover, setIsHover] = useState(false);
  const [question, setQuestion] = useState("");

  useEffect(() => {
    try {
      const goal = localStorage.getItem("fitnessGoal");
      const level = localStorage.getItem("fitnessLevel");
      const equipment = localStorage.getItem("fitnessEquipment");

      if (goal === null || goal === "") {
        setGoalError(true);
      }
      if (level === null || level === "") {
        setLevelError(true);
      }
      if (equipment === null || equipment === "") {
        setEquipmentError(true);
      }

      if (goal && level && equipment) {
        setQuestion(
          `Generate workouts to ${goal} with ${equipment} as equipment for the ${level} level?`.replace(/"_"/g, ' ')  
        );
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const mainContainerStyle = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "100vh",
    border: "2px solid #f12a54",
    borderRadius: "4em",
    overflow: "hidden"
  };

  const backgroundOverlayStyle = {
    position: "absolute",
    inset: 0,
    backgroundImage: `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.5)), url("/genwork.png")`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    zIndex: 0,
    pointerEvents: "none"
  };

  const contentStyle = {
    position: "relative",
    zIndex: 1,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  };

  const errorTextStyle = {
    marginTop: "2em",
    animation: "tracking-in-expand 1s both, pulse 2s infinite",
    color: "#DFF1FF",
    fontSize: "3rem",
    fontWeight: "bold",
    fontFamily: "VT323, monospace",
    textAlign: "center",
    margin: "0.5em",
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
    width: "100px",
    height: "40px",
  };
  const buttonHoverStyle = {
    ...buttonStyle,
    backgroundColor: "#f12a54",
    color: "white",
  };

  const successTextStyle = {
    marginTop: "2em",
    border: "2px solid #f12a54",
    borderRadius: "1em",
    padding: "1em",
    backgroundColor: "#DFF1FF",
    color: "black",
    fontSize: "2rem",
    fontFamily: "VT323, monospace",
    textAlign: "center",
    margin: "0.5em",
  };

  return (
    <div style={mainContainerStyle}>
      <div style={backgroundOverlayStyle}></div>

      <div style={contentStyle}>
        {goalError && <p style={errorTextStyle}>⚠ Goal is missing!</p>}
        {levelError && <p style={errorTextStyle}>⚠ Level is missing!</p>}
        {equipmentError && <p style={errorTextStyle}>⚠ Equipment is missing!</p>}

        {(goalError || levelError || equipmentError) ? (
          <>
            <p style={errorTextStyle}>
              ! Please return to previous page and complete the missing values !
            </p>
            <button
              onClick={() => navigate("/SecondPageForm")}
              style={isHover ? buttonHoverStyle : buttonStyle}
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
            >
              Back
            </button>
          </>
        ) : (
          <p style={successTextStyle}>{question}</p>
        )}
      </div>
    </div>
  );
}