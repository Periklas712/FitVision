import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav className="w-full bg-canvas px-4 pt-4 md:px-8 md:pt-6">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between gap-4">
        <Link
          to="/"
          aria-label="FitVision home"
          className="shrink-0 rounded-xl transition-transform duration-300 hover:scale-105 focus-visible:outline-2 focus-visible:outline-brand"
        >
          <img
            src="/FitVisionLogo2.png"
            alt="FitVision"
            className="aspect-[3/2] h-12 object-cover drop-shadow-sm md:h-20"
          />
        </Link>

        {/* min-w-0 + flex-1 let the tagline shrink and wrap between the logo and
            the profile icon instead of pushing the page wider on small phones. */}
        <div className="min-w-0 flex-1 text-center">
          <p className="tracking-in-expand text-2xl leading-tight font-bold text-brand drop-shadow-sm sm:text-3xl md:text-4xl lg:text-5xl">
            A new era of workouts
          </p>
          <p className="mt-1 hidden text-lg text-gray-700 sm:block">Personalized workouts, powered by AI</p>
        </div>

        {/* The label is hidden on phones to leave room for the tagline; the
            aria-label keeps the link named for screen readers either way. */}
        <Link
          to="/MyPlans"
          aria-label="My plans"
          className="flex shrink-0 items-center gap-2 rounded-lg p-2 transition-all duration-300 hover:scale-105 hover:bg-blue-50 hover:shadow-md focus-visible:outline-2 focus-visible:outline-brand"
        >
          <span className="hidden text-xl text-ink lg:inline">My plans</span>
          <img
            src="/person.png"
            alt=""
            className="size-10 rounded-full border-2 border-white object-cover shadow-sm md:size-12"
          />
        </Link>
      </div>
      <hr className="mt-4 border-t-2 border-brand md:mt-6" />
    </nav>
  );
}

export default NavBar;
