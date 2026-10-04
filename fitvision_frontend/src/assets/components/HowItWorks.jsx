import PixelIcon from './PixelIcon';
import { clipboardIcon, starIcon } from './pixelIcons';

// Each step shows either a drawn illustration (`image`) or a pixel icon (`icon`).
const steps = [
  {
    icon: clipboardIcon,
    title: 'Tell us about you',
    text: 'Pick your fitness level, your main goal and the equipment you have.',
  },
  {
    image: '/step2-robot.png',
    title: 'AI builds your plans',
    text: 'Our AI coach creates two different plans tailored to you, in seconds.',
  },
  {
    icon: starIcon,
    title: 'Rate and refine',
    text: 'Rate the plan that suits you best, or generate new ones anytime.',
  },
];

function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-5xl px-4 py-12 md:py-20">
      <h2 className="text-center text-4xl font-bold text-brand md:text-5xl">How it works</h2>

      <ol className="mt-8 grid gap-4 md:mt-12 md:grid-cols-3 md:gap-6">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className="rounded-2xl border border-brand/30 bg-white/70 p-6 text-center shadow-sm transition-transform duration-300 motion-safe:hover:scale-105"
          >
            {/* The illustration floats; each card starts a little later so they
                move as a wave. motion-safe: skipped for users who asked for reduced motion. */}
            <div
              className="flex h-24 items-center justify-center motion-safe:animate-float"
              style={{ animationDelay: `${index * 0.4}s` }}
            >
              {step.image ? (
                <img src={step.image} alt="" className="h-full w-auto" />
              ) : (
                <PixelIcon rows={step.icon} className="size-16 text-brand" />
              )}
            </div>
            <p className="mt-4 text-lg text-gray-500">Step {index + 1}</p>
            <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
            <p className="mt-2 text-lg leading-snug text-gray-700">{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default HowItWorks;
