// Covers the page while a slow call is running. Generating the plans takes
// several seconds, so the user needs to see that something is happening - and
// must not be able to fire a second request in the meantime.
// `open` is the only switch: render it always and let this decide.
function WaitingModal({ open, title = "Your coach is thinking...", children }) {
  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 px-4"
    >
      <div className="w-full max-w-md rounded-2xl border-2 border-brand bg-canvas p-6 text-center shadow-[6px_6px_0_var(--color-ink)]">
        <img src="/step2-robot.png" alt="" className="mx-auto h-24 w-auto motion-safe:animate-float" />

        <p className="mt-4 text-3xl font-bold text-brand">{title}</p>
        {children && <p className="mt-2 text-xl text-ink">{children}</p>}

        {/* Three squares breathing in turn: a pixel-art loading indicator. */}
        <div className="mt-6 flex justify-center gap-2" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="size-3 border-2 border-ink bg-brand motion-safe:animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default WaitingModal;
