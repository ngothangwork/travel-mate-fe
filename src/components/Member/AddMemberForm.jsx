import React from "react";
import toast from "react-hot-toast";

export function AddMemberForm({ onAdd, planId }) {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get("email");
        const role = formData.get("role");

        if (!email) {
            toast.error("Vui lòng nhập email!");
            return;
        }

        try {
            await onAdd({ planId, email, role });
            toast.success(`Đã thêm thành viên ${email} với vai trò ${role}`);
            e.target.reset();
        } catch (error) {
            toast.error("Không thể thêm thành viên. Vui lòng thử lại!");
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow"
        >
            <input
                type="email"
                name="email"
                placeholder="Nhập email thành viên"
                required
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
                name="role"
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="OWNER">Owner</option>
                <option value="VIEWER">Viewer</option>
                <option value="EDITOR">Editor</option>
            </select>
            <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
                ➕ Thêm
            </button>
        </form>
    );
}
