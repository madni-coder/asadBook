import React, { useState } from "react";
import {
    Download,
    Share2,
    Plus,
    Filter,
    Search,
    Settings,
    Menu,
    MoreHorizontal,
} from "lucide-react";

const Header = ({ onToggleSidebar }) => {
    const [showMobileSearch, setShowMobileSearch] = useState(false);
    const tabs = [
        { id: 1, name: "Sep", active: false },
        { id: 2, name: "Aug", active: true },
        { id: 3, name: "July", active: false },
        { id: 4, name: "June", active: false },
        { id: 5, name: "MAY", active: false },
        { id: 6, name: "APR", active: false },
        { id: 7, name: "MAR", active: false },
        { id: 8, name: "FEB", active: false },
    ];

    return (
        <div className="bg-base-100 border-b border-base-300">
            {/* Top Header */}
            <div className="bg-primary px-3 sm:px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 sm:space-x-4">
                        {/* Mobile menu button */}
                        <button
                            onClick={onToggleSidebar}
                            className="lg:hidden p-1 rounded-md hover:bg-white/10 transition-colors"
                        >
                            <Menu className="w-5 h-5 text-primary-content" />
                        </button>
                        <h2 className="text-primary-content text-lg sm:text-xl font-medium truncate">
                            📊 Hazrat Tickets
                        </h2>
                    </div>
                    <div className="flex items-center space-x-2 sm:space-x-3">
                        {/* Desktop buttons */}
                        <div className="hidden sm:flex items-center space-x-3">
                            <button className="btn btn-ghost btn-sm text-primary-content">
                                <Download className="w-4 h-4" />
                                <span className="text-sm font-medium">
                                    Download
                                </span>
                                <span className="text-xs">⬇</span>
                            </button>
                            <button className="btn btn-ghost btn-sm text-primary-content">
                                <Share2 className="w-4 h-4" />
                                <span className="text-sm font-medium">
                                    Share
                                </span>
                                <span className="text-xs">🔗</span>
                            </button>
                        </div>
                        {/* Mobile more button */}
                        <button className="btn btn-ghost btn-sm sm:hidden text-primary-content">
                            <MoreHorizontal className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Tabs Section */}
            <div className="px-3 sm:px-6 py-0 bg-base-100">
                <div className="flex items-center space-x-1 border-b border-base-300 overflow-x-auto">
                    <div className="flex items-center space-x-1 flex-shrink-0">
                        {tabs.map((tab, index) => (
                            <button
                                key={tab.id}
                                className={`px-3 sm:px-4 py-3 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                                    tab.active
                                        ? "border-primary text-primary bg-primary/10"
                                        : "border-transparent text-base-content/70 hover:text-base-content hover:bg-base-200"
                                } ${index > 3 ? "hidden sm:block" : "block"}`}
                            >
                                <span className="hidden sm:inline">📅 </span>
                                {tab.name}
                            </button>
                        ))}
                        <button className="px-2 sm:px-3 py-3 text-base-content/50 hover:text-base-content/80 transition-colors flex-shrink-0">
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>
                    <button className="ml-auto px-2 sm:px-3 py-3 text-base-content/50 hover:text-base-content/80 transition-colors flex-shrink-0">
                        <Settings className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Actions Row */}
            <div className="px-3 sm:px-6 py-4 bg-base-100">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                    <div className="flex items-center space-x-2 sm:space-x-4">
                        <button className="btn btn-primary btn-sm">
                            <Plus className="w-4 h-4" />
                            <span className="text-sm font-medium">
                                Add entry
                            </span>
                        </button>
                        <button className="btn btn-outline btn-sm">
                            <Filter className="w-4 h-4" />
                            <span className="text-sm">Filter</span>
                        </button>
                    </div>
                    {/* Search - Desktop */}
                    <div className="hidden sm:block relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search Entry"
                            className="input input-bordered input-sm pl-10 w-48 lg:w-64"
                        />
                    </div>
                    {/* Search - Mobile */}
                    <div className="sm:hidden relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search Entry"
                            className="input input-bordered input-sm pl-10 w-full"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
