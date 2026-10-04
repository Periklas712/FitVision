import { Link } from 'react-router-dom';
import HowItWorks from './HowItWorks';
import PixelIcon from './PixelIcon';
import WorkoutPlanCard from './WorkoutPlanCard';
import { arrowDownIcon, arrowRightIcon, calendarIcon, chartIcon, heartIcon } from './pixelIcons';

// A real plan the AI generated for a beginner with dumbbells, trimmed to the card fields.
const examplePlan = {
  title: 'Full Body Dumbbell Hypertrophy',
  summary:
    'A full-body routine three times a week that hits every muscle group multiple times, built around simple dumbbell movements.',
  daysPerWeek: 3,
  duration: 4,
};

// These match the three sections the AI writes in every plan description.
const planContents = [
  { icon: calendarIcon, title: 'Weekly structure', text: 'What to train each day, with exercises, sets and reps.' },
  { icon: chartIcon, title: 'Progression', text: 'How to push a little further every week.' },
  { icon: heartIcon, title: 'Warm-up & recovery', text: 'How to prepare for each session and recover after it.' },
];

const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand';

function LandingPageImg() {
  return (
    <>
      <section
        className="mx-2 mt-2 overflow-hidden rounded-xl bg-cover bg-center md:mx-4 md:mt-4"
        style={{ backgroundImage: 'url("/LandingPage.png")' }}
      >
        {/* Mobile first: one column, headline on top, actions at the bottom.
            From md up the actions spread out into two corners. */}
        <div className="flex min-h-[calc(100svh-9rem)] flex-col items-center justify-between gap-10 px-4 py-10 text-center md:min-h-[calc(100svh-10rem)] md:px-10 md:py-16">
          <div className="max-w-4xl">
            {/* Hard, unblurred outline + drop shadow: the classic pixel-game title look,
                and it keeps the red readable whatever part of the image is behind it. */}
            <h1 className="tracking-in-expand text-4xl leading-tight font-bold tracking-wide text-brand [text-shadow:2px_0_0_var(--color-ink),-2px_0_0_var(--color-ink),0_2px_0_var(--color-ink),0_-2px_0_var(--color-ink),4px_4px_0_var(--color-ink)] sm:text-5xl lg:text-6xl">
              DISCOVER THE MOST SUITABLE WORKOUT PLANS
            </h1>
            {/* Styled like an RPG dialog box. */}
            <p className="mx-auto mt-6 max-w-md rounded-lg border-2 border-white bg-ink/85 px-4 py-3 text-xl text-white shadow-[4px_4px_0_var(--color-ink)] md:text-2xl">
              LET OUR AI COACH SUGGEST YOU THE BEST WORKOUT PLANS
            </p>
          </div>

          <div className="flex w-full flex-col items-center gap-4 md:flex-row md:items-end md:justify-between">
            <Link
              to="/InformationForm"
              className={`group order-1 inline-flex w-full max-w-sm items-center justify-center gap-3 rounded-2xl border border-brand bg-canvas px-8 py-5 text-2xl text-brand shadow-md transition-transform hover:scale-105 md:order-2 md:w-auto md:px-12 md:py-6 md:text-3xl ${focusRing}`}
            >
              Start Your Journey
              <PixelIcon rows={arrowRightIcon} className="size-5 transition-transform group-hover:translate-x-1 md:size-6" />
            </Link>

            <a
              href="#how-it-works"
              className={`group order-2 inline-flex items-center gap-2 rounded-2xl border border-brand bg-canvas px-6 py-3 text-lg text-brand transition-colors hover:bg-white md:order-1 ${focusRing}`}
            >
              How it works
              <PixelIcon rows={arrowDownIcon} className="size-4 transition-transform group-hover:translate-y-0.5" />
            </a>
          </div>
        </div>
      </section>

      <HowItWorks />

      {/* Two columns from md up so the section uses the full width:
          what a plan contains on the left, an example card on the right. */}
      <section className="mx-auto max-w-5xl px-4 pb-12 md:pb-20">
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
          <div>
            <h2 className="text-center text-4xl font-bold text-brand md:text-left md:text-5xl">What you get</h2>
            <p className="mt-3 text-center text-xl text-gray-700 md:text-left">
              Two plans, each with a short summary and a full breakdown:
            </p>
            <ul className="mt-6 space-y-4">
              {planContents.map((item) => (
                <li key={item.title} className="flex items-start gap-4">
                  <span className="shrink-0 rounded-xl bg-white p-2 shadow-sm">
                    <PixelIcon rows={item.icon} className="size-8 text-brand" />
                  </span>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{item.title}</h3>
                    <p className="text-lg leading-snug text-gray-700">{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <WorkoutPlanCard {...examplePlan} label="Example plan" />
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/InformationForm"
            className={`group inline-flex items-center gap-3 rounded-2xl border border-brand bg-brand px-8 py-4 text-2xl text-white shadow-md transition-transform hover:scale-105 ${focusRing}`}
          >
            Start Your Journey
            <PixelIcon rows={arrowRightIcon} className="size-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </>
  );
}

export default LandingPageImg;
