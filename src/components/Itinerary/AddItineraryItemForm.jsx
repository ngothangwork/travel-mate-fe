import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

export function AddItineraryItemForm({ planId, createdBy, onAdd, onUpdate, initialData, onCancel }) {
    const [form, setForm] = useState({
        title: "",
        description: "",
        location: "",
        date: "",
        startTime: "",
        endTime: "",
    });

    useEffect(() => {
        if (initialData) {
            setForm({
                title: initialData.title || "",
                description: initialData.description || "",
                location: initialData.location || "",
                date: initialData.date || "",
                startTime: initialData.startTime || "",
                endTime: initialData.endTime || "",
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onUpdate && initialData) {
            onUpdate({ ...form });
            toast.success("Cập nhật hoạt động thành công 🎉");
        } else {
            onAdd({
                ...form,
                planId,
                createdBy,
                isDone: false,
            });
            toast.success("Thêm hoạt động mới thành công ✅");

            setForm({
                title: "",
                description: "",
                location: "",
                date: "",
                startTime: "",
                endTime: "",
            });
        }
        if (onCancel) onCancel();
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md space-y-4">
            <input
                type="text"
                name="title"
                placeholder="Tiêu đề"
                value={form.title}
                onChange={handleChange}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                required
            />
            <input
                type="text"
                name="location"
                placeholder="Địa điểm"
                value={form.location}
                onChange={handleChange}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
            <textarea
                name="description"
                placeholder="Mô tả"
                value={form.description}
                onChange={handleChange}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none h-24"
            />
            <div className="flex flex-col sm:flex-row gap-3">
                <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    className="flex-1 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    required
                />
                <input
                    type="time"
                    name="startTime"
                    value={form.startTime}
                    onChange={handleChange}
                    className="flex-1 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
                <input
                    type="time"
                    name="endTime"
                    value={form.endTime}
                    onChange={handleChange}
                    className="flex-1 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
                <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium"
                >
                    {initialData ? "Cập nhật hoạt động" : "➕ Thêm hoạt động"}
                </button>
                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition font-medium"
                    >
                        Hủy
                    </button>
                )}
            </div>
        </form>
    );
}
