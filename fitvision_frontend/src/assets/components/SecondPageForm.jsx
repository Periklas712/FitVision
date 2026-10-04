import React, { useCallback, useEffect, useState } from "react";
import {getEnums} from "../services/ApiHandler" ;
import { useNavigate } from "react-router";
import CoachDialog from "./CoachDialog";
import FlowSteps from "./FlowSteps";
import OptionCard from "./OptionCard";
import OptionPager from "./OptionPager";
import PixelIcon from "./PixelIcon";
import { arrowRightIcon } from "./pixelIcons";
import FieldError from "./FieldError";
import { formatEnum, imageFor } from "../utils/enumDisplay";



const levels = ["Beginner", "Intermediate", "Advanced"];

// Used for "Try again" - quieter than the main call to action.
const secondaryButton =
  "mt-4 inline-flex items-center justify-center gap-2 rounded-xl border-2 border-ink bg-canvas px-5 py-2 text-xl text-ink shadow-[3px_3px_0_var(--color-ink)] transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand active:translate-y-0.5 active:shadow-none disabled:cursor-not-allowed disabled:opacity-50";

const panel = "rounded-2xl border-2 border-brand bg-white p-5 text-center shadow-[6px_6px_0_var(--color-ink)] md:p-6";
const sectionTitle = "text-3xl font-bold text-brand md:text-4xl";

export default function Questionnaire() {
  const [equipment, setEquipment] = useState(() => localStorage.getItem("fitnessEquipment") ?? "");
  const [goal, setGoal] = useState(() => localStorage.getItem("fitnessGoal") ?? "");
  const [experience, setExperience] = useState(readSavedLevel);
  const [goalOptions,setGoalOptions]=useState([]);
  const [equipmentOptions,setEquipmentOptions] = useState([]);
  const [errors, setErrors] = useState({});
  const [enumsError, setEnumsError] = useState("");
  const [isLoadingEnums, setIsLoadingEnums] = useState(true);
  const navigate = useNavigate();

  // useCallback keeps the same function between renders, so the effect below runs
  // once while the "Try again" button can call the very same loader.
  const loadEnums = useCallback(async () => {
    setIsLoadingEnums(true);
    setEnumsError("");
    try {
      const enums = await getEnums();
      setEquipmentOptions(enums.fitnessEquipment || [] );
      setGoalOptions(enums.fitnessGoal||[]);
    }catch (error){
      console.log(error);
      setEnumsError("We could not load your options. Make sure the server is running and try again.");
    }finally{
      setIsLoadingEnums(false);
    }
  }, []);

  useEffect(()=>{
    loadEnums();
  },[loadEnums]);

  const handleNextClick = () => {
    const newErrors = {}
    if (goal.trim() === "") {
      newErrors.goal = "Goal is missing";
    }
    if (equipment.trim() === "") {
      newErrors.equipment = "Equipment is missing";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0){
      return;
    }
    // Nothing is stored until every answer is valid, so a failed attempt cannot
    // leave half of the choices behind.
    localStorage.setItem("fitnessGoal",goal);
    localStorage.setItem("fitnessEquipment",equipment);
    localStorage.setItem("fitnessLevel",levels[experience].toUpperCase());
    navigate("/GenerateWorkoutPage");
  }

  return (
    <main className="mx-auto w-full max-w-[1600px] px-4 py-8 md:px-8 md:py-12">
      <FlowSteps current={2} />

      <div className="mt-8 flex justify-center md:mt-10">
        <CoachDialog row title="What are we working with?">
          Pick your gear and your goal, then tell me your level.
        </CoachDialog>
      </div>

      <div className="mt-8 md:mt-10">
        <section className={`${panel} text-center`}>
          <h2 className={sectionTitle}>How would you rate your experience?</h2>
          <div className="mx-auto mt-4 max-w-md">
            <label htmlFor="experience" className="sr-only">Experience level</label>
            <input
              id="experience"
              type="range"
              min="0"
              max="2"
              step="1"
              value={experience}
              onChange={(e) => setExperience(Number(e.target.value))}
              className="w-full accent-brand"
            />
            <div className="mt-2 flex justify-between text-lg">
              {levels.map((level, index) => (
                <span key={level} className={experience === index ? "font-bold text-brand" : "text-gray-600"}>
                  {level}
                </span>
              ))}
            </div>
          </div>
        </section>

        {enumsError ? (
          <section className={`${panel} mt-6`}>
            <h2 className={sectionTitle}>The coach is offline</h2>
            <div className="mx-auto mt-2 max-w-xl text-left">
              <FieldError id="enumsError">{enumsError}</FieldError>
            </div>
            <button type="button" onClick={loadEnums} disabled={isLoadingEnums} className={secondaryButton}>
              {isLoadingEnums ? "Trying..." : "Try again"}
            </button>
          </section>
        ) : (
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <section className={panel}>
            <h2 className={sectionTitle}>What equipment do you have?</h2>
            {isLoadingEnums ? (
              <p className="mt-4 py-10 text-xl text-gray-600">Loading options...</p>
            ) : (
            <OptionPager label="equipment">
              {equipmentOptions.map((eq) => (
                <OptionCard
                  key={eq}
                  label={formatEnum(eq)}
                  imageSrc={imageFor("equipment", eq)}
                  selected={equipment === eq}
                  onSelect={() => {setEquipment(eq); setErrors(prev => ({...prev, equipment: undefined}));}}
                />
              ))}
            </OptionPager>
            )}
            <FieldError id="equipmentError">{errors.equipment}</FieldError>
          </section>

          <section className={panel}>
            <h2 className={sectionTitle}>What is your goal?</h2>
            {isLoadingEnums ? (
              <p className="mt-4 py-10 text-xl text-gray-600">Loading options...</p>
            ) : (
            <OptionPager label="goals">
              {goalOptions.map((g) => (
                <OptionCard
                  key={g}
                  label={formatEnum(g)}
                  imageSrc={imageFor("goals", g)}
                  selected={goal === g}
                  onSelect={() => {setGoal(g); setErrors(prev => ({...prev, goal: undefined}));}}
                />
              ))}
            </OptionPager>
            )}
            <FieldError id="goalError">{errors.goal}</FieldError>
          </section>
        </div>
        )}

        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={handleNextClick}
            className="group inline-flex w-full items-center justify-center gap-3 rounded-2xl border-2 border-ink bg-brand px-6 py-4 text-2xl text-white shadow-[4px_4px_0_var(--color-ink)] transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand active:translate-y-0.5 active:shadow-[2px_2px_0_var(--color-ink)] md:w-auto md:px-10"
          >
            Generate my plans
            <PixelIcon rows={arrowRightIcon} className="size-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </main>
  );
}

// The slider works with 0-2 while storage keeps "BEGINNER"/"INTERMEDIATE"/"ADVANCED",
// so coming back to the page means looking the saved name up in `levels`.
// findIndex answers -1 when there is nothing saved yet; the slider would break on
// a value below its min, so that case falls back to the first level.
function readSavedLevel() {
  const index = levels.findIndex((level) => level.toUpperCase() === localStorage.getItem("fitnessLevel"));
  return index === -1 ? 0 : index;
}
