import PixelIcon from './PixelIcon';
import { checkIcon, imagePlaceholderIcon } from './pixelIcons';

// One selectable option (a piece of equipment, a goal...).
// The placeholder sits behind the image, so a picture that does not exist yet
// simply uncovers it instead of showing a broken-image icon.
function OptionCard({ label, imageSrc, selected, onSelect, className = "" }) {
  const frame = selected
    ? 'border-brand bg-brand/5 -translate-y-0.5 shadow-[3px_3px_0_var(--color-brand)]'
    : 'border-ink/20 bg-canvas hover:border-brand/60 hover:-translate-y-0.5';

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`relative flex flex-col items-center gap-2 rounded-xl border-2 p-2 text-center transition-transform focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${frame} ${className}`}
    >
      {selected && (
        <span className="absolute top-1 right-1 z-10 flex size-6 items-center justify-center rounded-md border-2 border-ink bg-brand">
          <PixelIcon rows={checkIcon} className="size-3 text-white" />
        </span>
      )}

      <span className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-lg bg-white">
        <PixelIcon rows={imagePlaceholderIcon} className="size-8 text-ink/20" />
        {imageSrc && (
          <img
            src={imageSrc}
            alt=""
            className="absolute inset-0 size-full object-contain p-1"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
        )}
      </span>

      <span
        className={`rounded-md px-2 py-0.5 text-base leading-tight ${selected ? 'bg-brand font-bold text-white' : 'text-gray-700'}`}
      >
        {label}
      </span>
    </button>
  );
}

export default OptionCard;
