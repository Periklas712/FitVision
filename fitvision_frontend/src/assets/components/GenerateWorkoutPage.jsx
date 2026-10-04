import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUser, createUserWorkoutPlanList, updateUser } from "../services/ApiHandler";
import { formatEnum, imageFor } from "../utils/enumDisplay";
import { readSavedProfile, readSavedUserId } from "../utils/savedUser";
import CoachDialog from "./CoachDialog";
import FieldError from "./FieldError";
import FlowSteps from "./FlowSteps";
import PixelIcon from "./PixelIcon";
import PlanResultCard from "./PlanResultCard";
import RatingModal from "./RatingModal";
import WaitingModal from "./WaitingModal";
import { arrowRightIcon, imagePlaceholderIcon } from "./pixelIcons";

const LEVELS = ["BEGINNER", "INTERMEDIATE", "ADVANCED"];

const panel = "rounded-2xl border-2 border-brand bg-white p-5 text-center shadow-[6px_6px_0_var(--color-ink)] md:p-6";
const sectionTitle = "text-3xl font-bold text-brand md:text-4xl";

const primaryButton =
  "group inline-flex items-center justify-center gap-3 rounded-2xl border-2 border-ink bg-brand px-6 py-4 text-2xl text-white shadow-[4px_4px_0_var(--color-ink)] transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand active:translate-y-0.5 active:shadow-[2px_2px_0_var(--color-ink)] disabled:cursor-not-allowed disabled:opacity-60 md:px-10";

const secondaryButton =
  "group inline-flex items-center justify-center gap-3 rounded-2xl border-2 border-ink bg-canvas px-6 py-4 text-2xl text-ink shadow-[4px_4px_0_var(--color-ink)] transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand active:translate-y-0.5 active:shadow-none disabled:cursor-not-allowed disabled:opacity-60";

export default function GenerateWorkoutPage() {
  // Everything the previous two steps saved, read once when the page opens.
  const [answers] = useState(readAnswers);
  const [plans, setPlans] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [failure, setFailure] = useState(null);
  // The plan whose rating dialog is open, or null when it is closed.
  const [ratingPlan, setRatingPlan] = useState(null);
  const navigate = useNavigate();

  const missingAboutYou = !answers.username || !answers.email;
  const missingTraining = !answers.level || !answers.goal || !answers.equipment;

  const handleGenerate = async () => {
    setFailure(null);
    setIsGenerating(true);
    try {
      const userId = await saveAnswers(answers);
      // The backend builds the plans from what is stored for this user, which is
      // why the answers have to be saved first and only the id is sent here.
      const newPlans = await createUserWorkoutPlanList(userId);
      setPlans(newPlans);
      window.scrollTo({ top: 0 });
    } catch (error) {
      console.log(error);
      setFailure(describeFailure(error));
    } finally {
      setIsGenerating(false);
    }
  };

  // The backend answers with the updated plan; swap it in so the card shows the
  // new rating. map() builds a new array, which is what tells React to redraw.
  const handleRated = (saved) => {
    setPlans((current) => current.map((plan) => (plan.id === saved.id ? saved : plan)));
    setRatingPlan(null);
  };

  const backButton = (to, text) => (
    <button type="button" onClick={() => navigate(to)} disabled={isGenerating} className={secondaryButton}>
      <PixelIcon rows={arrowRightIcon} className="size-5 rotate-180 transition-transform group-hover:-translate-x-1" />
      {text}
    </button>
  );

  const failureMessage = failure && (
    <div className="mx-auto mt-6 max-w-2xl">
      <FieldError id="generateError">{failure.message}</FieldError>
    </div>
  );

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 md:px-8 md:py-12">
      <FlowSteps current={3} />

      {missingAboutYou || missingTraining ? (
        <>
          <div className="mt-8 flex justify-center md:mt-10">
            <CoachDialog row title="Hold on, champ!">
              I am missing a few answers before I can build anything.
            </CoachDialog>
          </div>

          <section className={`${panel} mx-auto mt-8 max-w-2xl`}>
            <h2 className={sectionTitle}>What is missing</h2>
            <div className="mt-4 space-y-3 text-left">
              <FieldError id="missingAboutYou">{missingAboutYou && "Your name and email, from step 1."}</FieldError>
              <FieldError id="missingTraining">
                {missingTraining && "Your experience, equipment and goal, from step 2."}
              </FieldError>
            </div>
          </section>

          <div className="mt-8 flex justify-center">
            {missingAboutYou
              ? backButton("/InformationForm", "Back to step 1")
              : backButton("/SecondPageForm", "Back to step 2")}
          </div>
        </>
      ) : plans.length === 0 ? (
        <>
          <div className="mt-8 flex justify-center md:mt-10">
            <CoachDialog row title={`Ready, ${answers.username}?`}>
              Here is what you told me. Create your plans, or go back and change something.
            </CoachDialog>
          </div>

          <section className={`${panel} mt-8 md:mt-10`}>
            <h2 className={sectionTitle}>Your setup</h2>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <SummaryTile label="Experience" value={formatEnum(answers.level)}>
                <LevelBars level={answers.level} />
              </SummaryTile>
              <SummaryTile label="Equipment" value={formatEnum(answers.equipment)}>
                <TileImage src={imageFor("equipment", answers.equipment)} />
              </SummaryTile>
              <SummaryTile label="Goal" value={formatEnum(answers.goal)}>
                <TileImage src={imageFor("goals", answers.goal)} />
              </SummaryTile>
            </div>
          </section>

          {failureMessage}

          <div className="mt-8 flex flex-col-reverse items-stretch justify-center gap-4 sm:flex-row sm:items-center">
            {failure?.fixPath
              ? backButton(failure.fixPath, "Change my email")
              : backButton("/SecondPageForm", "Back")}
            <button type="button" onClick={handleGenerate} disabled={isGenerating} className={primaryButton}>
              Create my plans
              <PixelIcon rows={arrowRightIcon} className="size-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="mt-8 flex justify-center md:mt-10">
            <CoachDialog row title="Your plans are ready!">
              Two different ways to reach your goal. Pick the one that fits your week.
            </CoachDialog>
          </div>

          {/* items-start: opening a section in one card must not stretch the other one. */}
          <div className="mt-8 grid grid-cols-1 items-start gap-6 md:mt-10 md:grid-cols-2">
            {plans.map((plan, index) => (
              <PlanResultCard key={plan.id} plan={plan} label={`Plan ${index + 1}`} onRate={setRatingPlan} />
            ))}
          </div>

          {failureMessage}

          <div className="mt-8 flex flex-col-reverse items-stretch justify-center gap-4 sm:flex-row sm:items-center">
            {backButton("/SecondPageForm", "Change my answers")}
            <button type="button" onClick={handleGenerate} disabled={isGenerating} className={primaryButton}>
              Create two new plans
              <PixelIcon rows={arrowRightIcon} className="size-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <p className="mt-6 text-center text-xl text-gray-600">
            Every plan is saved. Find them again any time in{" "}
            <Link to="/MyPlans" className="text-brand underline underline-offset-4 hover:no-underline">
              My plans
            </Link>
            .
          </p>
        </>
      )}

      {ratingPlan && (
        <RatingModal
          key={ratingPlan.id}
          plan={ratingPlan}
          onClose={() => setRatingPlan(null)}
          onSaved={handleRated}
        />
      )}

      <WaitingModal open={isGenerating}>
        Building two plans just for you. This takes a few seconds.
      </WaitingModal>
    </main>
  );
}

// One answer in the "Your setup" panel: a caption, a picture, and the value.
function SummaryTile({ label, value, children }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border-2 border-ink/20 bg-canvas p-4">
      <p className="text-base tracking-widest text-gray-500 uppercase">{label}</p>
      <div className="relative flex aspect-square w-full max-w-40 items-center justify-center overflow-hidden rounded-lg bg-white">
        {children}
      </div>
      <p className="text-2xl leading-tight font-bold text-brand">{value}</p>
    </div>
  );
}

// Same trick as OptionCard: the placeholder sits underneath, so a picture that
// does not exist yet uncovers it instead of showing a broken image.
function TileImage({ src }) {
  return (
    <>
      <PixelIcon rows={imagePlaceholderIcon} className="size-8 text-ink/20" />
      <img
        src={src}
        alt=""
        className="absolute inset-0 size-full object-contain p-2"
        onError={(e) => { e.currentTarget.style.display = "none"; }}
      />
    </>
  );
}

// Experience has no artwork, so it is drawn: three rising bars, filled up to the level.
function LevelBars({ level }) {
  const filled = LEVELS.indexOf(level) + 1;
  const heights = ["h-8", "h-14", "h-20"];
  return (
    <div className="flex items-end gap-2" aria-hidden="true">
      {heights.map((height, i) => (
        <span key={height} className={`w-7 border-2 border-ink ${height} ${i < filled ? "bg-brand" : "bg-white"}`} />
      ))}
    </div>
  );
}

// Step 1 stored name and email together as JSON; step 2 stored one key per answer.
// The keys are renamed here to what the backend expects (fitnessGoal -> goal ...).
function readAnswers() {
  return {
    ...readSavedProfile(),
    level: localStorage.getItem("fitnessLevel") ?? "",
    goal: localStorage.getItem("fitnessGoal") ?? "",
    equipment: localStorage.getItem("fitnessEquipment") ?? "",
  };
}

// Makes sure the backend holds these answers and returns the user's id.
// First visit: create the user and remember the id in this browser.
// Coming back: update the same user, because the plans are generated from what
// is stored, so skipping this would build plans for the old answers.
async function saveAnswers(answers) {
  const savedId = readSavedUserId();

  if (savedId !== null) {
    try {
      await updateUser({ id: savedId, ...answers });
      return savedId;
    } catch (error) {
      // 404: the database was reset since this browser last saw it. Forget the
      // stale id and fall through to creating the user again.
      if (error.status !== 404) throw error;
      localStorage.removeItem("userId");
    }
  }

  const user = await createUser(answers);
  localStorage.setItem("userId", String(user.id));
  return user.id;
}

// Turns what went wrong into words for the user, plus where to go to fix it.
function describeFailure(error) {
  if (error.status === 409) {
    return {
      message: "That email already belongs to another account. Go back and use a different one.",
      fixPath: "/InformationForm",
    };
  }
  if (error.status === 503 || error.status === 429) {
    return { message: "The AI coach is busy right now. Give it a moment and try again." };
  }
  if (error.status === undefined) {
    // fetch itself failed: nothing answered at all.
    return { message: "We could not reach the server. Make sure it is running and try again." };
  }
  return { message: "Something went wrong while building your plans. Please try again." };
}
