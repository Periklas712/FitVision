// Draws a small pixel-art icon from a text grid (see pixelIcons.js).
// It is an SVG, so it stays crisp at any size and takes its colour from the text colour.
function PixelIcon({ rows, className }) {
  const width = rows[0].length;
  const height = rows.length;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      {rows.flatMap((row, y) =>
        [...row].map((cell, x) =>
          cell === '#' ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="currentColor" /> : null
        )
      )}
    </svg>
  );
}

export default PixelIcon;
