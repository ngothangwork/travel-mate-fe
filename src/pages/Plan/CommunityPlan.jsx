import React, { useEffect, useState } from "react";
import { getPlans } from "../../utils/api/Plan/plan.js";
import { PlanCard } from "../../components/common/PlanCard/PlanCard.jsx";

function CommunityPlan() {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const response = await getPlans();
                setPlans(response.result);
            } catch (err) {
                console.error("Lỗi khi lấy danh sách kế hoạch:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPlans();
    }, []);

    if (loading) return <p className="text-center text-gray-600">Đang tải...</p>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-gray-50">
            {plans.map(plan => (
                <PlanCard key={plan.id} plan={plan} />
            ))}
        </div>
    );
}

export default CommunityPlan;