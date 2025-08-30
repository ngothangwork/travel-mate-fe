import React, { useState } from "react";
import { AddItineraryItemForm } from "./AddItineraryItemForm.jsx";
import { motion, AnimatePresence } from "framer-motion";

export function ItineraryItemCard({ item, onDelete, onMarkDone, onUpdate }) {
    const [showEditModal, setShowEditModal] = useState(false);

    return (
        <>
            <div className="bg-white shadow-md rounded-xl p-6 flex flex-col sm:flex-row justify-between items-start gap-4 hover:shadow-lg transition">
                <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-gray-600 mt-2">{item.description}</p>
                    <div className="mt-3 text-sm text-gray-500 space-y-1">
                        <p>📍 {item.location}</p>
                        <p>⏰ {item.startTime} - {item.endTime}</p>
                        <p>📅 {item.date}</p>
                    </div>
                    <span
                        className={`mt-3 inline-block font-medium ${
                            item.isDone ? "text-green-600" : "text-orange-500"
                        }`}
                    >
                        {item.isDone ? "✅ Hoàn thành" : "⏳ Chưa xong"}
                    </span>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 mt-4 sm:mt-0">
                    <button
                        onClick={() => onMarkDone(item)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition font-medium"
                    >
                        {item.isDone ? "Undo" : "Done"}
                    </button>
                    <button
                        onClick={() => setShowEditModal(true)}
                        className="px-4 py-2 bg-yellow-500 text-white rounded-lg text-sm hover:bg-yellow-600 transition font-medium"
                    >
                        Cập nhật
                    </button>
                    <button
                        onClick={() => onDelete(item.id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition font-medium"
                    >
                        Xóa
                    </button>
                </div>
            </div>

            {/* Modal Update */}
            <AnimatePresence>
                {showEditModal && (
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
                                Cập nhật hoạt động
                            </h2>
                            <AddItineraryItemForm
                                initialData={item}
                                onUpdate={(data) => {
                                    onUpdate(item.id, data);
                                    setShowEditModal(false);
                                }}
                                onCancel={() => setShowEditModal(false)}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
