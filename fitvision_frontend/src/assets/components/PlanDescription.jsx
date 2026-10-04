import PixelIcon from "./PixelIcon";
import { arrowRightIcon } from "./pixelIcons";

// The coach writes each plan's description in a small, fixed kind of markdown:
// "## " headings with "- " bullet lists under them (see Fitivsion_Ai/system_prompt.txt).
// That is all this understands, which is why it is a few lines instead of a
// markdown library; any other line is shown as a plain paragraph.
//
// Each heading becomes a section that starts closed, so the two plans can be
// compared by their title and summary first, and read in detail on demand.
function parse(markdown) {
  // Lines before the first heading (not expected, but possible) get a section
  // with no title, shown as-is.
  const sections = [{ title: null, blocks: [] }];

  for (const raw of markdown.split("\n")) {
    // The prompt forbids bold text, but a stray ** should not show up on screen.
    const line = raw.trim().replace(/\*\*/g, "");
    if (line === "") continue;

    if (line.startsWith("#")) {
      sections.push({ title: line.replace(/^#+\s*/, ""), blocks: [] });
      continue;
    }

    const blocks = sections.at(-1).blocks;
    if (line.startsWith("- ") || line.startsWith("* ")) {
      const item = line.slice(2);
      const last = blocks.at(-1);
      // Consecutive bullets belong to the same list.
      if (last?.type === "list") last.items.push(item);
      else blocks.push({ type: "list", items: [item] });
    } else {
      blocks.push({ type: "paragraph", text: line });
    }
  }

  return sections.filter((section) => section.title || section.blocks.length > 0);
}

// "Monday: Full Body A - squats 3 sets of 8" -> label "Monday" + the rest.
// Only a short lead-in without a full stop counts, so an ordinary sentence
// that happens to contain a colon is left alone.
const LABELLED = /^([^:.]{1,40}):\s+(.+)$/;

function Bullet({ text }) {
  const match = text.match(LABELLED);
  return (
    <li className="flex gap-3 text-lg leading-snug text-gray-700">
      <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 bg-ink/50" />
      <span>
        {match ? (
          <>
            <span className="block text-base font-bold tracking-wider text-brand uppercase">{match[1]}</span>
            {match[2]}
          </>
        ) : (
          text
        )}
      </span>
    </li>
  );
}

function Blocks({ blocks }) {
  return (
    <div className="space-y-3">
      {blocks.map((block, index) =>
        block.type === "list" ? (
          <ul key={index} className="space-y-2">
            {block.items.map((item, i) => (
              <Bullet key={i} text={item} />
            ))}
          </ul>
        ) : (
          <p key={index} className="text-lg leading-snug text-gray-700">
            {block.text}
          </p>
        )
      )}
    </div>
  );
}

function PlanDescription({ markdown }) {
  if (!markdown) return null;

  return (
    <div className="space-y-2 text-left">
      {parse(markdown).map((section, index) =>
        section.title ? (
          // <details> opens and closes on its own - no state needed - and is
          // keyboard and screen-reader friendly out of the box.
          <details
            key={index}
            className="group rounded-xl border-2 border-ink/15 bg-canvas/60 open:border-brand/40 open:bg-white"
          >
            <summary className="flex cursor-pointer list-none items-center gap-3 rounded-xl px-4 py-3 text-2xl font-bold text-ink focus-visible:outline-2 focus-visible:outline-brand [&::-webkit-details-marker]:hidden">
              <PixelIcon
                rows={arrowRightIcon}
                className="size-4 shrink-0 text-brand transition-transform group-open:rotate-90"
              />
              {section.title}
            </summary>
            <div className="px-4 pb-4">
              <Blocks blocks={section.blocks} />
            </div>
          </details>
        ) : (
          <Blocks key={index} blocks={section.blocks} />
        )
      )}
    </div>
  );
}

export default PlanDescription;
