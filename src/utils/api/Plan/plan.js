const API_BASE = import.meta.env?.VITE_API_BASE_URL || "http://localhost:8080";

const getToken = () => localStorage.getItem("accessToken");

const jsonHeaders = () => {
    const token = getToken();
    const headers = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;
    return headers;
};

const handleResponse = async (res) => {
    if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `HTTP ${res.status}`);
    }
    return res.json();
};

// GET /plans
export async function getPlans() {
    const res = await fetch(`${API_BASE}/plans`, {
        method: "GET",
        headers: jsonHeaders(),
    });
    return handleResponse(res);
}

// GET /plans/{id}-{slug}
export async function getPlanById(idSlug) {
    const res = await fetch(`${API_BASE}/plans/${idSlug}`, {
        method: "GET",
        headers: jsonHeaders(),
    });
    return handleResponse(res);
}

// POST /plans
export async function createPlan(planRequest) {
    const res = await fetch(`${API_BASE}/plans`, {
        method: "POST",
        headers: jsonHeaders(),
        body: JSON.stringify(planRequest),
    });
    return handleResponse(res);
}

// PUT /plans/{id}
export async function updatePlan(id, planRequest) {
    const res = await fetch(`${API_BASE}/plans/${id}`, {
        method: "PUT",
        headers: jsonHeaders(),
        body: JSON.stringify(planRequest),
    });
    return handleResponse(res);
}

// DELETE /plans/{id}
export async function deletePlan(id) {
    const res = await fetch(`${API_BASE}/plans/${id}`, {
        method: "DELETE",
        headers: jsonHeaders(),
    });
    if (res.status === 204) return { success: true };
    return handleResponse(res);
}
