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
            w-64 bg-base-100 border-r border-base-300 flex flex-col 
            h-full z-30 transition-transform duration-300 ease-in-out
        `}
        >
            {/* App Header */}
            <div className="p-4 border-b border-base-300">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                            <span className="text-primary-content text-sm font-medium">
                                MB
                            </span>
                        </div>
                        <h1 className="text-lg font-medium text-base-content">
                            My Business
                        </h1>
                    </div>
                    {/* Close button for mobile */}
                    <button
                        onClick={onClose}
                        className="lg:hidden btn btn-ghost btn-sm"
                    >
                        <X className="w-5 h-5" />
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
            <div className="px-4 pb-4">
                <button className="btn btn-primary btn-sm w-full">
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">Add New Register</span>
                    <span className="sm:hidden">Add Register</span>
                </button>
            </div>

            {/* Registers List */}
            <div className="flex-1 overflow-y-auto">
                <div className="px-4 space-y-1">
                    {registers.map((register) => {
                        const IconComponent = register.icon;
                        return (
                            <div
                                key={register.id}
                                className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors group ${
                                    register.active
                                        ? "bg-primary/10 border border-primary/20"
                                        : "hover:bg-base-200"
                                }`}
                            >
                                <div
                                    className={`p-1.5 rounded ${
                                        register.active
                                            ? "bg-primary text-primary-content"
                                            : "bg-base-300 text-base-content/70"
                                    }`}
                                >
                                    <IconComponent className="w-4 h-4" />
                                </div>
                                <span
                                    className={`flex-1 text-sm ${
                                        register.active
                                            ? "text-primary font-medium"
                                            : "text-base-content/80"
                                    }`}
                                >
                                    {register.name}
                                </span>
                                <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                                    <MoreVertical className="w-4 h-4 text-base-content/50 hover:text-base-content/80" />
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* My Tasks */}
            <div className="p-4 border-t border-base-300">
                <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-base-200 cursor-pointer">
                    <div className="w-6 h-6 bg-neutral rounded flex items-center justify-center">
                        <span className="text-neutral-content text-xs">⚡</span>
                    </div>
                    <span className="text-sm text-base-content/80">
                        My Tasks 📋
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
