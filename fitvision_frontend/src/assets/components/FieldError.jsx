import PixelIcon from './PixelIcon';
import { warningIcon } from './pixelIcons';

// Error message shown under a form field.
// Renders nothing when there is no message, so it can be dropped under any input.
// `id` must match the input's aria-describedby so screen readers read them together.
function FieldError({ id, children }) {
  if (!children) return null;

  return (
    <p
      id={id}
      role="alert"
      className="mt-2 flex items-start gap-2 rounded-lg border-2 border-brand bg-brand/10 px-3 py-2 text-lg text-ink shadow-[3px_3px_0_var(--color-ink)]"
    >
      <PixelIcon rows={warningIcon} className="mt-1 size-4 shrink-0 text-brand" />
      {children}
    </p>
  );
}

export default FieldError;
