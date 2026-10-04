import { useEffect, useRef, useState } from "react";
import { rateWorkoutPlan } from "../services/ApiHandler";
import FieldError from "./FieldError";
import PixelIcon from "./PixelIcon";
import { starIcon } from "./pixelIcons";

// The backend keeps ratings on a 0-10 scale. Five stars are shown and each is
// worth two points, so the stored number stays meaningful if the AI ever reads it.
export const POINTS_PER_STAR = 2;
const STAR_COUNT = 5;
const WORDS = ["Tap a star", "Not for me", "Could be better", "Good", "Great", "Perfect for me"];

const smallButton =
  "inline-flex items-center justify-center gap-2 rounded-xl border-2 border-ink px-5 py-2 text-xl shadow-[3px_3px_0_var(--color-ink)] transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand active:translate-y-0.5 active:shadow-none disabled:cursor-not-allowed disabled:opacity-60";

// Opened for one plan at a time. The parent mounts it with a `key` per plan,
// so the stars and comment always start from that plan's saved rating.
function RatingModal({ plan, onClose, onSaved }) {
  const [stars, setStars] = useState(() => Math.round((plan.stars ?? 0) / POINTS_PER_STAR));
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState(plan.comment ?? "");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const firstStar = useRef(null);

  // Start keyboard users on the stars, and let Escape close the dialog.
  useEffect(() => {
    firstStar.current?.focus();
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape" && !isSaving) onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isSaving, onClose]);

  const handleSave = async () => {
    if (stars === 0) {
      setError("Pick at least one star.");
      return;
    }
    setError("");
    setIsSaving(true);
    try {
      const saved = await rateWorkoutPlan({
        workoutPlanId: plan.id,
        stars: stars * POINTS_PER_STAR,
        comment: comment.trim(),
      });
      onSaved(saved);
    } catch (err) {
      console.log(err);
      setError("We could not save your rating. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const shown = hovered || stars;

  return (
    // Clicking the dark backdrop closes, clicking inside the box does not.
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 px-4"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isSaving) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="rating-title"
        className="w-full max-w-md rounded-2xl border-2 border-brand bg-canvas p-6 text-center shadow-[6px_6px_0_var(--color-ink)]"
      >
        <h2 id="rating-title" className="text-3xl font-bold text-brand">Rate this plan</h2>
        <p className="mt-1 text-lg text-gray-600">{plan.title}</p>

        <div
          role="radiogroup"
          aria-label="Rating"
          className="mt-5 flex justify-center gap-1"
          onMouseLeave={() => setHovered(0)}
        >
          {Array.from({ length: STAR_COUNT }, (_, i) => {
            const value = i + 1;
            return (
              <button
                key={value}
                ref={i === 0 ? firstStar : undefined}
                type="button"
                role="radio"
                aria-checked={stars === value}
                aria-label={`${value} of ${STAR_COUNT} stars`}
                onClick={() => {
                  setStars(value);
                  setError("");
                }}
                onMouseEnter={() => setHovered(value)}
                className="rounded-md p-1 transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-brand"
              >
                <PixelIcon
                  rows={starIcon}
                  className={`size-10 ${value <= shown ? "text-brand" : "text-ink/15"}`}
                />
              </button>
            );
          })}
        </div>
        <p className="mt-2 text-xl text-ink" aria-live="polite">{WORDS[shown]}</p>

        <label htmlFor="rating-comment" className="mt-5 block text-left text-xl font-bold text-gray-900">
          Comment <span className="font-normal text-gray-500">(optional)</span>
        </label>
        <textarea
          id="rating-comment"
          rows={3}
          maxLength={1000}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="What did you like, or what was missing?"
          className="mt-2 w-full resize-none rounded-xl border-2 border-brand/40 bg-white px-4 py-3 text-lg text-gray-900 placeholder:text-gray-500 focus:border-brand focus:ring-4 focus:ring-brand/20 focus:outline-none"
        />

        <div className="text-left">
          <FieldError id="rating-error">{error}</FieldError>
        </div>

        <div className="mt-6 flex flex-col-reverse justify-center gap-3 sm:flex-row">
          <button type="button" onClick={onClose} disabled={isSaving} className={`${smallButton} bg-white text-ink`}>
            Cancel
          </button>
          <button type="button" onClick={handleSave} disabled={isSaving} className={`${smallButton} bg-brand text-white`}>
            <PixelIcon rows={starIcon} className="size-4" />
            {isSaving ? "Saving..." : "Save rating"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default RatingModal;
