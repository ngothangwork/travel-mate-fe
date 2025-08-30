import React from "react";
import { useNavigate } from "react-router-dom";

export function PlanCard({ plan }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/plans/${plan.id}-${plan.slug}`);
    };

    return (
        <div
            onClick={handleClick}
            className="bg-white rounded-xl shadow-md p-6 cursor-pointer hover:shadow-lg transition-transform transform hover:-translate-y-1"
        >
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h2>
            <p className="text-sm text-gray-500 mb-2">{plan.startDate} - {plan.endDate}</p>
            <p className="text-gray-600 mb-2">📍 {plan.location}</p>
            <p className="text-gray-600 mb-2">👤 Chủ: {plan.owner?.name}</p>
            <p className="text-gray-600">👥 Thành viên: {plan.numberOfMembers}</p>
        </div>
    );
}