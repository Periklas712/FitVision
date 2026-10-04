// Preview card for one workout plan. Takes the same fields the backend returns
// (title, summary, daysPerWeek, duration), so the results page can reuse it.
// Anything passed as children (the full description on the results page) goes
// underneath; the landing page passes none and gets the short preview.
function WorkoutPlanCard({ title, summary, daysPerWeek, duration, label, children }) {
  return (
    <article className="rounded-2xl border-2 border-brand bg-white p-5 text-left shadow-md md:p-6">
      {label && <p className="text-base tracking-widest text-gray-500 uppercase">{label}</p>}
      <h3 className="mt-1 text-2xl font-bold text-brand md:text-3xl">{title}</h3>
      <p className="mt-3 text-lg leading-snug text-gray-700">{summary}</p>
      <div className="mt-4 flex flex-wrap gap-2 text-lg">
        <span className="rounded-lg bg-canvas px-3 py-1">{daysPerWeek} days / week</span>
        <span className="rounded-lg bg-canvas px-3 py-1">{duration} weeks</span>
      </div>
      {children}
    </article>
  );
}

export default WorkoutPlanCard;
