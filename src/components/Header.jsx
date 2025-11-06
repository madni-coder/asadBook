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
    const [sheets, setSheets] = useState([
        { id: 1, name: "Sheet 1", active: true },
    ]);
    const [nextSheetId, setNextSheetId] = useState(2);

    const handleAddSheet = () => {
        const newSheet = {
            id: nextSheetId,
            name: `Sheet ${nextSheetId}`,
            active: false,
        };
        setSheets([...sheets, newSheet]);
        setNextSheetId(nextSheetId + 1);
    };

    const handleSheetClick = (clickedId) => {
        setSheets(
            sheets.map((sheet) => ({
                ...sheet,
                active: sheet.id === clickedId,
            }))
        );
    };

    return (
        <div className="bg-base-100 border-b border-base-300">
            {/* Top Header */}
            <div className="bg-primary px-3 sm:px-4 md:px-6 py-3 sm:py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 flex-1 min-w-0">
                        {/* Mobile menu button */}
                        <button
                            onClick={onToggleSidebar}
                            className="lg:hidden p-1 rounded-md hover:bg-white/10 transition-colors flex-shrink-0"
                        >
                            <Menu className="w-5 h-5 text-primary-content" />
                        </button>
                        <h2 className="text-primary-content text-base sm:text-lg md:text-xl font-medium truncate">
                            <span className="hidden xs:inline">📊</span>{" "}
                            {sheets.find((sheet) => sheet.active)?.name ||
                                "Sheet 1"}
                        </h2>
                    </div>
                    <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3 flex-shrink-0">
                        {/* Desktop buttons */}
                        <div className="hidden md:flex items-center space-x-2 lg:space-x-3">
                            <button className="btn btn-ghost btn-sm text-primary-content">
                                <Download className="w-4 h-4" />
                                <span className="text-sm font-medium hidden lg:inline">
                                    Download
                                </span>
                                <span className="text-xs hidden xl:inline">
                                    ⬇
                                </span>
                            </button>
                            <button className="btn btn-ghost btn-sm text-primary-content">
                                <Share2 className="w-4 h-4" />
                                <span className="text-sm font-medium hidden lg:inline">
                                    Share
                                </span>
                                <span className="text-xs hidden xl:inline">
                                    🔗
                                </span>
                            </button>
                        </div>
                        {/* Mobile more button */}
                        <button className="btn btn-ghost btn-sm md:hidden text-primary-content">
                            <MoreHorizontal className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Tabs Section */}
            <div className="px-3 sm:px-4 md:px-6 py-0 bg-base-100">
                <div className="flex items-center space-x-1 border-b border-base-300 overflow-x-auto scrollbar-hide">
                    <div className="flex items-center space-x-1 flex-shrink-0">
                        {sheets.map((sheet, index) => (
                            <button
                                key={sheet.id}
                                onClick={() => handleSheetClick(sheet.id)}
                                className={`px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                                    sheet.active
                                        ? "border-primary text-primary bg-primary/10"
                                        : "border-transparent text-base-content/70 hover:text-base-content hover:bg-base-200"
                                } ${index > 2 ? "hidden sm:block" : "block"} ${
                                    index > 4 ? "hidden md:block" : ""
                                }`}
                            >
                                <span className="truncate max-w-[80px] sm:max-w-[120px] md:max-w-none">
                                    {sheet.name}
                                </span>
                            </button>
                        ))}
                        <button
                            onClick={handleAddSheet}
                            className="px-2 sm:px-3 py-2 sm:py-3 text-base-content/50 hover:text-base-content/80 transition-colors flex-shrink-0"
                            title="Add new sheet"
                        >
                            <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                    </div>
                    <button className="ml-auto px-2 sm:px-3 py-2 sm:py-3 text-base-content/50 hover:text-base-content/80 transition-colors flex-shrink-0">
                        <Settings className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                </div>
            </div>

            {/* Actions Row */}
            <div className="px-3 sm:px-4 md:px-6 py-3 sm:py-4 bg-base-100">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                    {/* Search - Desktop */}
                    <div className="hidden sm:block relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search Entry"
                            className="input input-bordered input-sm pl-10 w-40 md:w-48 lg:w-64 xl:w-80"
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

                    {/* Additional actions for larger screens */}
                    <div className="hidden md:flex items-center space-x-2">
                        <button className="btn btn-ghost btn-sm">
                            <Filter className="w-4 h-4" />
                            <span className="hidden lg:inline ml-1">
                                Filter
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
