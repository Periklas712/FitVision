// What this browser remembers about the user between visits. There is no login,
// so localStorage is the only link between a visitor and their account.

// Step 1 stores name and email together as JSON. A missing or damaged entry
// reads as empty, so callers can treat it as "step 1 not done".
export function readSavedProfile() {
  let user = {};
  try {
    user = JSON.parse(localStorage.getItem("createUserData")) ?? {};
  } catch {
    // Damaged JSON is treated the same as no entry at all.
  }
  return { username: user.username ?? "", email: user.email ?? "" };
}

// The id is saved after the user is first created. localStorage only holds
// strings, so "4" comes back and has to become 4 again; anything that is not a
// positive whole number counts as "no user yet".
export function readSavedUserId() {
  const id = Number(localStorage.getItem("userId"));
  return Number.isInteger(id) && id > 0 ? id : null;
}
