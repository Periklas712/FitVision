const BASE_URL = "http://localhost:8080/api";

async function handleResponse(response) {
    const body = await response.json().catch(() => null);
    if (!response.ok) {
        const error = new Error(body?.message ?? `Request failed (${response.status})`);
        error.status = response.status;
        throw error;
    }
    return body;
}

export async function createUser(data) {
    const response = await fetch(`${BASE_URL}/users/createUser`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data),
    });
    return handleResponse(response);
}

export async function updateUser(data) {
    const response = await fetch(`${BASE_URL}/users/updateUser`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data),
    });
    return handleResponse(response);
}

export async function createUserWorkoutPlanList(userId) {
    const response = await fetch(`${BASE_URL}/workoutPlans/createUserWorkoutPlanList?userId=${userId}`, {
        method: "POST",
    });
    return handleResponse(response);
}

// Every plan this user was ever given, oldest first. The backend serves repeat
// calls from its Redis cache and clears it whenever a plan is added or rated.
export async function getUserWorkoutPlanList(userId) {
    const response = await fetch(`${BASE_URL}/workoutPlans/getUserWorkoutPlanList?userId=${userId}`);
    return handleResponse(response);
}

export async function getEnums() {
    const response = await fetch(`${BASE_URL}/enums/allEnums`);
    return handleResponse(response);
}

// The controller reads everything with @RequestParam, so it all travels in the
// query string. URLSearchParams escapes it, so a comment with spaces or "&" is
// sent intact. `comment` must always be present, even empty, or Spring answers 400.
export async function rateWorkoutPlan({ workoutPlanId, stars, comment }) {
    const params = new URLSearchParams({ workoutPlanId, stars, comment });
    const response = await fetch(`${BASE_URL}/workoutPlans/rateWorkoutPlan?${params}`, {
        method: "PATCH",
    });
    return handleResponse(response);
}
