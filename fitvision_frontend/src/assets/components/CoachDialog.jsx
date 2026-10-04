// The robot coach "talking" to the user in an RPG-style dialog box.
// The title is the page's <h1>, so use this once per page.
// `row` keeps the robot beside the text on every screen, for pages where the
// coach sits above a full-width panel instead of next to a narrow column.
function CoachDialog({ title, children, row = false }) {
  return (
    <div className={`flex items-center gap-4 ${row ? '' : 'md:flex-col md:gap-6'}`}>
      <img
        src="/step2-robot.png"
        alt=""
        className={`w-auto shrink-0 motion-safe:animate-float ${row ? 'h-20 md:h-28' : 'h-20 md:h-56'}`}
      />
      <div className="rounded-lg border-2 border-white bg-ink/90 px-4 py-3 shadow-[4px_4px_0_var(--color-ink)] md:px-6 md:py-5">
        <h1 className="tracking-in-expand text-2xl leading-tight font-bold text-brand md:text-4xl">{title}</h1>
        {children && <p className="mt-1 text-lg text-white md:text-2xl">{children}</p>}
      </div>
    </div>
  );
}

export default CoachDialog;
