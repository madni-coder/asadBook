import React from "react";
import {
    Search,
    Plus,
    MoreVertical,
    Database,
    FileText,
    Users,
    Target,
    X,
} from "lucide-react";

const Sidebar = ({ isOpen, onClose }) => {
    const registers = [
        { id: 1, name: "Hazrat Tickets", icon: Database, active: true },
        { id: 2, name: "hazrat nov dec", icon: FileText, active: false },
        { id: 3, name: "Imama", icon: Users, active: false },
        { id: 4, name: "AI", icon: Target, active: false },
        { id: 5, name: "All Customers 😊", icon: Users, active: false },
        { id: 6, name: "All Customers 😊", icon: Users, active: false },
    ];

    return (
        <div
            className={`
            ${isOpen ? "translate-x-0" : "-translate-x-full"} 
            fixed lg:relative lg:translate-x-0 
            w-64 sm:w-72 lg:w-64 xl:w-72 bg-base-100 border-r border-base-300 flex flex-col 
            h-full z-30 transition-transform duration-300 ease-in-out
        `}
        >
            {/* App Header */}
            <div className="p-3 sm:p-4 border-b border-base-300">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 min-w-0 flex-1">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-primary-content text-xs sm:text-sm font-medium">
                                MB
                            </span>
                        </div>
                        <h1 className="text-base sm:text-lg font-medium text-base-content truncate">
                            My Business
                        </h1>
                    </div>
                    {/* Close button for mobile */}
                    <button
                        onClick={onClose}
                        className="lg:hidden btn btn-ghost btn-sm flex-shrink-0"
                    >
                        <X className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                </div>
            </div>

            {/* Search Box */}
            <div className="p-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search Register"
                        className="input input-bordered input-sm pl-10 w-full"
                    />
                </div>
            </div>

            {/* Add New Register Button */}
            <div className="px-3 sm:px-4 pb-3 sm:pb-4">
                <button className="btn btn-primary btn-sm w-full text-xs sm:text-sm">
                    <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="truncate">Add New Register</span>
                </button>
            </div>

            {/* Registers List */}
            <div className="flex-1 overflow-y-auto">
                <div className="px-3 sm:px-4 space-y-1">
                    {registers.map((register) => {
                        const IconComponent = register.icon;
                        return (
                            <div
                                key={register.id}
                                className={`flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-lg cursor-pointer transition-colors group ${
                                    register.active
                                        ? "bg-primary/10 border border-primary/20"
                                        : "hover:bg-base-200"
                                }`}
                            >
                                <div
                                    className={`p-1 sm:p-1.5 rounded flex-shrink-0 ${
                                        register.active
                                            ? "bg-primary text-primary-content"
                                            : "bg-base-300 text-base-content/70"
                                    }`}
                                >
                                    <IconComponent className="w-3 h-3 sm:w-4 sm:h-4" />
                                </div>
                                <span
                                    className={`flex-1 text-xs sm:text-sm truncate ${
                                        register.active
                                            ? "text-primary font-medium"
                                            : "text-base-content/80"
                                    }`}
                                    title={register.name}
                                >
                                    {register.name}
                                </span>
                                <button className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                                    <MoreVertical className="w-3 h-3 sm:w-4 sm:h-4 text-base-content/50 hover:text-base-content/80" />
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* My Tasks */}
            <div className="p-3 sm:p-4 border-t border-base-300">
                <div className="flex items-center space-x-2 sm:space-x-3 p-2 rounded-lg hover:bg-base-200 cursor-pointer">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-neutral rounded flex items-center justify-center flex-shrink-0">
                        <span className="text-neutral-content text-xs">⚡</span>
                    </div>
                    <span className="text-xs sm:text-sm text-base-content/80 truncate">
                        My Tasks 📋
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
