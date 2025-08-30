// utils/api/ItineraryItem/itineraryItem.js

const API_BASE = import.meta.env?.VITE_API_BASE_URL || "http://localhost:8080";

// Lấy token từ localStorage
const getToken = () => localStorage.getItem("accessToken");

// Tạo header JSON + Bearer token
const jsonHeaders = () => {
    const token = getToken();
    const headers = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;
    return headers;
};

// Xử lý response chung
const handleResponse = async (res) => {
    if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `HTTP ${res.status}`);
    }
    return res.json();
};

// ---------------- API Itinerary Item ----------------

// GET /itinerary-item?planId=xxx
export async function getItineraryItems(planId) {
    const res = await fetch(`${API_BASE}/itinerary-item?planId=${planId}`, {
        method: "GET",
        headers: jsonHeaders(),
    });
    return handleResponse(res);
}

// GET /itinerary-item/{id}
export async function getItineraryItemById(id) {
    const res = await fetch(`${API_BASE}/itinerary-item/${id}`, {
        method: "GET",
        headers: jsonHeaders(),
    });
    return handleResponse(res);
}

// POST /itinerary-item
export async function createItineraryItem(data) {
    const res = await fetch(`${API_BASE}/itinerary-item`, {
        method: "POST",
        headers: jsonHeaders(),
        body: JSON.stringify(data),
    });
    return handleResponse(res);
}

// PUT /itinerary-item/{id}
export async function updateItineraryItem(id, data) {
    const res = await fetch(`${API_BASE}/itinerary-item/${id}`, {
        method: "PUT",
        headers: jsonHeaders(),
        body: JSON.stringify(data),
    });
    return handleResponse(res);
}

// DELETE /itinerary-item/{id}
export async function deleteItineraryItem(id) {
    const res = await fetch(`${API_BASE}/itinerary-item/${id}`, {
        method: "DELETE",
        headers: jsonHeaders(),
    });
    return handleResponse(res);
}
