const steps = ['About you', 'Training', 'Your plans'];

// Progress bar shared by the three pages of the sign-up flow.
// `current` is the 1-based number of the page the user is on.
function FlowSteps({ current }) {
  return (
    <nav aria-label="Progress">
      <ol className="flex items-start justify-center gap-2 sm:gap-4">
        {steps.map((label, index) => {
          const number = index + 1;
          const isDone = number < current;
          const isActive = number === current;

          const boxStyle = isActive
            ? 'border-ink bg-brand text-white'
            : isDone
              ? 'border-ink bg-ink text-white'
              : 'border-ink/30 bg-white text-ink/40';

          return (
            <li key={label} className="flex items-start gap-2 sm:gap-4" aria-current={isActive ? 'step' : undefined}>
              <div className="flex flex-col items-center gap-1">
                <span
                  className={`flex size-9 items-center justify-center rounded-md border-2 text-xl font-bold shadow-[2px_2px_0_var(--color-ink)] ${boxStyle}`}
                >
                  {number}
                </span>
                <span className={`text-base whitespace-nowrap sm:text-lg ${isActive ? 'font-bold text-brand' : 'text-gray-600'}`}>
                  {label}
                </span>
              </div>
              {number < steps.length && (
                <span aria-hidden="true" className={`mt-4 h-1 w-6 sm:w-16 ${isDone ? 'bg-ink' : 'bg-ink/20'}`} />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default FlowSteps;
