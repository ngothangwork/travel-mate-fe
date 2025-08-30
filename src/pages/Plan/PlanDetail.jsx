import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { getPlanById } from "../../utils/api/Plan/plan.js";
import {
    getPlanMembers,
    addPlanMember,
    removePlanMember,
} from "../../utils/api/PlanMember/planMember.js";
import {
    getItineraryItems,
    createItineraryItem,
    updateItineraryItem,
    deleteItineraryItem,
} from "../../utils/api/ItineraryItem/itineraryItem.js";
import { ItineraryItemCard } from "../../components/Itinerary/ItineraryItemCard.jsx";
import { AddItineraryItemForm } from "../../components/Itinerary/AddItineraryItemForm.jsx";
import { AddMemberForm } from "../../components/Member/AddMemberForm.jsx";
import { MemberList } from "../../components/Member/MemberList.jsx";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

function PlanDetail() {
    const { idSlug } = useParams();
    const { accessToken } = useAuth();

    const [plan, setPlan] = useState(null);
    const [members, setMembers] = useState([]);
    const [itinerary, setItinerary] = useState([]);
    const [loading, setLoading] = useState(true);

    const [activeTab, setActiveTab] = useState("itinerary");
    const [showAddModal, setShowAddModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const planRes = await getPlanById(idSlug, accessToken);
                setPlan(planRes.result);

                const membersRes = await getPlanMembers(planRes.result.id, accessToken);
                setMembers(membersRes.result);

                const itineraryRes = await getItineraryItems(planRes.result.id, accessToken);
                setItinerary(itineraryRes.result);
            } catch (err) {
                console.error("Lỗi khi load chi tiết kế hoạch:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [idSlug, accessToken]);

    // ---------- Itinerary ----------
    const handleAddItem = async (data) => {
        try {
            const res = await createItineraryItem(data, accessToken);
            setItinerary((prev) => [...prev, res.result]);
            setShowAddModal(false);
            toast.success("Thêm hoạt động thành công!");
        } catch (err) {
            console.error("Lỗi khi thêm hoạt động:", err);

            let msg = "Có lỗi xảy ra!";
            try {
                const parsed = JSON.parse(err.message);
                msg = parsed.message || msg;
            } catch (_) {}

            toast.error(msg);
        }
    };


    const handleUpdateItem = async (itemId, data) => {
        try {
            const res = await updateItineraryItem(itemId, data, accessToken);
            setItinerary((prev) =>
                prev.map((i) => (i.id === itemId ? res.result : i))
            );
        } catch (err) {
            console.error("Lỗi khi cập nhật hoạt động:", err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteItineraryItem(id, accessToken);
            setItinerary((prev) => prev.filter((i) => i.id !== id));
        } catch (err) {
            console.error("Lỗi khi xóa hoạt động:", err);
        }
    };

    const handleMarkDone = async (item) => {
        try {
            const res = await updateItineraryItem(item.id, { isDone: !item.isDone }, accessToken);
            setItinerary((prev) =>
                prev.map((i) => (i.id === item.id ? res.result : i))
            );
        } catch (err) {
            console.error("Lỗi khi cập nhật trạng thái hoạt động:", err);
        }
    };

    // ---------- Members ----------
    const handleAddMember = async ({ planId, email, role }) => {
        try {
            const res = await addPlanMember({ planId, email, role });
            setMembers((prev) => [...prev, res.result]);
        } catch (err) {
            console.error("Lỗi khi thêm thành viên:", err);
        }
    };

    const handleRemoveMember = async (memberId) => {
        try {
            await removePlanMember(plan.id, memberId);
            setMembers((prev) => prev.filter((m) => m.userId !== memberId));
        } catch (err) {
            console.error("Lỗi khi xoá thành viên:", err);
        }
    };

    // ---------- Render ----------
    if (loading) return <p className="text-center text-gray-600">Đang tải...</p>;
    if (!plan) return <p className="text-center text-gray-600">Không tìm thấy kế hoạch</p>;

    return (
        <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-900">{plan.name}</h1>
            <p className="text-gray-600">{plan.startDate} - {plan.endDate}</p>
            <p className="text-gray-600">📍 {plan.location}</p>
            <p className="text-gray-600">{plan.description}</p>

            {/* Tabs */}
            <div className="flex space-x-4 mt-4">
                <button
                    onClick={() => setActiveTab("itinerary")}
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                        activeTab === "itinerary"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                >
                    📅 Quá trình
                </button>
                <button
                    onClick={() => setActiveTab("members")}
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                        activeTab === "members"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                >
                    👥 Thành viên
                </button>
            </div>

            {activeTab === "itinerary" && (
                <section className="mt-6 space-y-4">
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                    >
                        ➕ Thêm hoạt động
                    </button>

                    <div className="mt-4 space-y-6">
                        {itinerary.length === 0 ? (
                            <p className="text-gray-600">Chưa có hoạt động nào</p>
                        ) : (
                            // Nhóm theo ngày
                            Object.entries(
                                itinerary.reduce((groups, item) => {
                                    const date = item.date?.split("T")[0];
                                    if (!groups[date]) groups[date] = [];
                                    groups[date].push(item);
                                    return groups;
                                }, {})
                            ).map(([date, items]) => (
                                <div key={date} className="space-y-2">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        📅 {new Date(date).toLocaleDateString("vi-VN")}
                                    </h3>
                                    <div className="space-y-3 pl-4 border-l-2 border-blue-500">
                                        {items.map((item) => (
                                            <ItineraryItemCard
                                                key={item.id}
                                                item={item}
                                                onDelete={handleDelete}
                                                onMarkDone={handleMarkDone}
                                                onUpdate={handleUpdateItem}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <AnimatePresence>
                        {showAddModal && (
                            <motion.div
                                className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <motion.div
                                    className="bg-white p-6 rounded-xl w-full max-w-lg shadow-lg"
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.9, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                                        Thêm hoạt động
                                    </h2>
                                    <AddItineraryItemForm
                                        planId={plan.id}
                                        createdBy={members[0]?.userId}
                                        onAdd={handleAddItem}
                                        onCancel={() => setShowAddModal(false)}
                                    />
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </section>
            )}


            {activeTab === "members" && (
                <section className="mt-6 space-y-6">
                    <AddMemberForm onAdd={handleAddMember} planId={plan.id} />
                    <MemberList members={members} onRemove={handleRemoveMember} />
                </section>
            )}
        </div>
    );
}

export default PlanDetail;
