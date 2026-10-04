import { Children, useEffect, useState } from 'react';
import PixelIcon from './PixelIcon';
import { arrowRightIcon } from './pixelIcons';

// Options are shown a page at a time (2x2 on phones, a row of four on desktop).
// Nothing is ever half visible, so you cannot tap a card you can barely see, and
// the arrows live under the grid instead of on top of the artwork.
const PER_PAGE = 4;

const arrowButton =
  'flex size-10 items-center justify-center rounded-lg border-2 border-ink bg-canvas text-brand shadow-[2px_2px_0_var(--color-ink)] transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand active:translate-y-0.5 active:shadow-none disabled:cursor-not-allowed disabled:opacity-30 disabled:shadow-none disabled:hover:translate-y-0';

// A page that is not full is padded with these, so the panel keeps its height
// and the arrows do not jump around as you flip through.
function Spacer() {
  return (
    <div aria-hidden="true" className="rounded-xl border-2 border-transparent p-2">
      <div className="aspect-square w-full" />
      <div className="mt-2 text-base leading-tight">&nbsp;</div>
    </div>
  );
}

function OptionPager({ label, children }) {
  const items = Children.toArray(children);
  const pageCount = Math.max(1, Math.ceil(items.length / PER_PAGE));
  const [page, setPage] = useState(0);

  // A choice restored from a previous visit can sit on any page, and the options
  // only arrive after the first render, so open on whichever page holds it.
  // This runs on a real change of selection, which leaves manual paging alone.
  const selectedIndex = items.findIndex((item) => item.props.selected);
  useEffect(() => {
    if (selectedIndex >= 0) setPage(Math.floor(selectedIndex / PER_PAGE));
  }, [selectedIndex]);

  const current = Math.min(page, pageCount - 1);
  // The updater form reads the latest page, so two quick clicks move two pages
  // instead of both acting on the value this render happened to capture.
  const step = (delta) => setPage((p) => Math.min(pageCount - 1, Math.max(0, p + delta)));
  const visible = items.slice(current * PER_PAGE, current * PER_PAGE + PER_PAGE);

  return (
    <div className="mt-4">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {visible}
        {Array.from({ length: PER_PAGE - visible.length }, (_, i) => (
          <Spacer key={`spacer-${i}`} />
        ))}
      </div>

      {pageCount > 1 && (
        <div className="mt-4 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => step(-1)}
            disabled={current === 0}
            aria-label={`Previous ${label}`}
            className={arrowButton}
          >
            <PixelIcon rows={arrowRightIcon} className="size-4 rotate-180" />
          </button>

          <p className="flex items-center gap-2" aria-hidden="true">
            {Array.from({ length: pageCount }, (_, i) => (
              <span
                key={i}
                className={`size-2.5 rounded-sm border-2 border-ink ${i === current ? 'bg-brand' : 'bg-white'}`}
              />
            ))}
          </p>

          <button
            type="button"
            onClick={() => step(1)}
            disabled={current === pageCount - 1}
            aria-label={`More ${label}`}
            className={arrowButton}
          >
            <PixelIcon rows={arrowRightIcon} className="size-4" />
          </button>
        </div>
      )}
    </div>
  );
}

export default OptionPager;
