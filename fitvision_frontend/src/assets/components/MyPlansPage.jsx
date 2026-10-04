import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserWorkoutPlanList } from "../services/ApiHandler";
import { readSavedProfile, readSavedUserId } from "../utils/savedUser";
import CoachDialog from "./CoachDialog";
import FieldError from "./FieldError";
import PixelIcon from "./PixelIcon";
import PlanResultCard from "./PlanResultCard";
import RatingModal from "./RatingModal";
import { arrowRightIcon } from "./pixelIcons";

const panel = "rounded-2xl border-2 border-brand bg-white p-5 text-center shadow-[6px_6px_0_var(--color-ink)] md:p-6";

const primaryButton =
  "group inline-flex items-center justify-center gap-3 rounded-2xl border-2 border-ink bg-brand px-6 py-4 text-2xl text-white shadow-[4px_4px_0_var(--color-ink)] transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand active:translate-y-0.5 active:shadow-[2px_2px_0_var(--color-ink)] disabled:cursor-not-allowed disabled:opacity-60 md:px-10";

const secondaryButton =
  "inline-flex items-center justify-center gap-2 rounded-xl border-2 border-ink bg-canvas px-5 py-2 text-xl text-ink shadow-[3px_3px_0_var(--color-ink)] transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand active:translate-y-0.5 active:shadow-none disabled:cursor-not-allowed disabled:opacity-50";

// Every plan this browser's user has been given, newest first, each with its
// description and rating. There is no login, so "this user" is the id the
// results step saved in localStorage.
export default function MyPlansPage() {
  const [userId] = useState(readSavedUserId);
  const [profile] = useState(readSavedProfile);
  const [plans, setPlans] = useState([]);
  // "loading" | "ready" | "empty" | "error". Without a saved id there is
  // nothing to fetch, so the page starts empty.
  const [status, setStatus] = useState(userId ? "loading" : "empty");
  const [ratingPlan, setRatingPlan] = useState(null);
  const navigate = useNavigate();

  // useCallback keeps the same function between renders, so the effect below
  // runs once while "Try again" can call the very same loader.
  const loadPlans = useCallback(async () => {
    if (userId === null) return;
    setStatus("loading");
    try {
      const saved = await getUserWorkoutPlanList(userId);
      // The backend answers oldest first; the newest plans belong on top.
      setPlans([...saved].sort((a, b) => b.id - a.id));
      setStatus(saved.length > 0 ? "ready" : "empty");
    } catch (error) {
      console.log(error);
      // 404: the saved id no longer exists (the database was reset). For the
      // user that simply means there are no plans; the next generation will
      // notice the stale id and create a fresh account.
      setStatus(error.status === 404 ? "empty" : "error");
    }
  }, [userId]);

  useEffect(() => {
    loadPlans();
  }, [loadPlans]);

  // Swap in the plan the backend sent back, so its card shows the new rating.
  const handleRated = (saved) => {
    setPlans((current) => current.map((plan) => (plan.id === saved.id ? saved : plan)));
    setRatingPlan(null);
  };

  const name = profile.username ? `, ${profile.username}` : "";

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 md:px-8 md:py-12">
      {status === "empty" ? (
        <>
          <div className="flex justify-center">
            <CoachDialog row title={`No plans yet${name}!`}>
              Answer three quick questions and I will build your first two plans.
            </CoachDialog>
          </div>
          <div className="mt-8 flex justify-center">
            <button type="button" onClick={() => navigate("/InformationForm")} className={primaryButton}>
              Start my journey
              <PixelIcon rows={arrowRightIcon} className="size-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-center">
            <CoachDialog row title={`Your plans${name}`}>
              {status === "ready"
                ? `${plans.length} plans saved. Open a section to read it, and rate the ones you have tried.`
                : "Every plan I have built for you, in one place."}
            </CoachDialog>
          </div>

          {status === "loading" && (
            <section className={`${panel} mx-auto mt-8 max-w-xl md:mt-10`} aria-live="polite">
              <p className="text-2xl text-ink">Fetching your plans...</p>
              <div className="mt-4 flex justify-center gap-2" aria-hidden="true">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="size-3 border-2 border-ink bg-brand motion-safe:animate-pulse"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            </section>
          )}

          {status === "error" && (
            <section className={`${panel} mx-auto mt-8 max-w-xl md:mt-10`}>
              <div className="text-left">
                <FieldError id="plansError">
                  We could not load your plans. Make sure the server is running and try again.
                </FieldError>
              </div>
              <button type="button" onClick={loadPlans} className={`${secondaryButton} mt-4`}>
                Try again
              </button>
            </section>
          )}

          {status === "ready" && (
            // items-start: opening a section in one card must not stretch its neighbour.
            <div className="mt-8 grid grid-cols-1 items-start gap-6 md:mt-10 md:grid-cols-2">
              {plans.map((plan, index) => (
                <PlanResultCard
                  key={plan.id}
                  plan={plan}
                  // Numbered from the oldest, so a plan keeps its number as new ones arrive.
                  label={`Plan ${plans.length - index}`}
                  onRate={setRatingPlan}
                />
              ))}
            </div>
          )}

          {status !== "loading" && (
            <div className="mt-8 flex justify-center">
              <button type="button" onClick={() => navigate("/SecondPageForm")} className={primaryButton}>
                Create new plans
                <PixelIcon rows={arrowRightIcon} className="size-5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          )}
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
    </main>
  );
}
