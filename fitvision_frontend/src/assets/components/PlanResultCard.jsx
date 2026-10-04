import PixelIcon from "./PixelIcon";
import PlanDescription from "./PlanDescription";
import { POINTS_PER_STAR } from "./RatingModal";
import WorkoutPlanCard from "./WorkoutPlanCard";
import { starIcon } from "./pixelIcons";

// A generated plan in full: the preview card, the collapsible description, and
// its rating. Used wherever plans are listed (the results step and My plans);
// the page owns the rating dialog and opens it through `onRate`.
function PlanResultCard({ plan, label, onRate }) {
  return (
    <WorkoutPlanCard
      label={label}
      title={plan.title}
      summary={plan.summary}
      daysPerWeek={plan.daysPerWeek}
      duration={plan.duration}
    >
      <hr className="my-5 border-t-2 border-dashed border-brand/30" />
      <PlanDescription markdown={plan.description} />
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t-2 border-dashed border-brand/30 pt-4">
        <SavedRating plan={plan} />
        <button
          type="button"
          onClick={() => onRate(plan)}
          className="inline-flex items-center gap-2 rounded-xl border-2 border-ink bg-canvas px-4 py-2 text-xl text-ink shadow-[3px_3px_0_var(--color-ink)] transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand active:translate-y-0.5 active:shadow-none"
        >
          <PixelIcon rows={starIcon} className="size-4 text-brand" />
          {plan.ratedAt ? "Edit rating" : "Rate plan"}
        </button>
      </div>
    </WorkoutPlanCard>
  );
}

// The stars a plan already has, or a hint that it has none yet. `ratedAt` is
// the reliable signal: `stars` is 0 both for "not rated" and for a real zero.
function SavedRating({ plan }) {
  if (!plan.ratedAt) {
    return <p className="text-lg text-gray-500">Not rated yet</p>;
  }
  const filled = Math.round(plan.stars / POINTS_PER_STAR);
  return (
    <p className="flex items-center gap-1" aria-label={`Rated ${filled} of 5 stars`}>
      {[1, 2, 3, 4, 5].map((value) => (
        <PixelIcon key={value} rows={starIcon} className={`size-5 ${value <= filled ? "text-brand" : "text-ink/15"}`} />
      ))}
    </p>
  );
}

export default PlanResultCard;
