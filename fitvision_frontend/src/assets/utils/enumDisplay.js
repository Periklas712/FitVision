// Helpers for showing backend enum values (LOSE_WEIGHT, PULL_UP_BAR...) to people.
// Shared by every page that shows the user's answers, so they read the same everywhere.

// PULL_UP_BAR -> "Pull Up Bar". The enums arrive in capitals, so the rest of each
// word has to be lowered too, not only the first letter raised.
export function formatEnum(value) {
  return value
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

// Artwork is found by convention: the enum value in lower case.
// EXERCISE_BIKE -> /equipment/exercise_bike.png, LOSE_WEIGHT -> /goals/lose_weight.png
// Drop a new file in with that name and the card picks it up; until then the
// card shows a placeholder.
export const imageFor = (folder, value) => `/${folder}/${value.toLowerCase()}.png`;
