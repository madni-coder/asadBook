import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import SpreadsheetTable from "./components/SpreadsheetTable";

function App() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-base-100" data-theme="cupcake">
            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
                <div className="flex-1 p-2 sm:p-3 md:p-4 lg:p-6 bg-base-200 overflow-hidden">
                    <SpreadsheetTable />
                </div>
            </div>
        </div>
    );
}

export default App;
