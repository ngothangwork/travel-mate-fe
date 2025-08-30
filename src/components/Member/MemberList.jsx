import React from "react";

export function MemberList({ members, onRemove }) {
    return (
        <ul className="space-y-3">
            {members.map((m) => (
                <li
                    key={m.userId}
                    className="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm"
                >
                    <div className="flex items-center space-x-3">
                        <img
                            src={m.avatar}
                            alt={m.name}
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                            <span className="font-medium text-gray-900">{m.name}</span>
                            <span className="text-sm text-gray-500 ml-2">({m.role})</span>
                        </div>
                    </div>
                    <button
                        onClick={() => onRemove(m.userId)}
                        className="text-red-500 hover:text-red-700"
                    >
                        ❌
                    </button>
                </li>
            ))}
        </ul>
    );
}
