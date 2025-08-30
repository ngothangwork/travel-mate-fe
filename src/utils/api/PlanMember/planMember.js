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

export async function getPlanMembers(planId) {
    const res = await fetch(`${API_BASE}/plan-member/${planId}`, {
        method: "GET",
        headers: jsonHeaders(),
    });
    return handleResponse(res);
}

export async function addPlanMember({ planId, role, email }) {
    const res = await fetch(`${API_BASE}/plan-member`, {
        method: "POST",
        headers: jsonHeaders(),
        body: JSON.stringify({ planId, role, email }),
    });
    return handleResponse(res);
}

export async function removePlanMember(planId, memberId) {
    const res = await fetch(`${API_BASE}/plan-member/${planId}/members/${memberId}`, {
        method: "DELETE",
        headers: jsonHeaders(),
    });
    return handleResponse(res);
}
