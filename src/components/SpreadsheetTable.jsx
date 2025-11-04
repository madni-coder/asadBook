import React from "react";
import { Plus, ChevronDown } from "lucide-react";

const SpreadsheetTable = () => {
    // Generate 8 empty rows
    const rows = Array.from({ length: 8 }, (_, index) => ({
        id: index + 1,
        sNo: index + 1,
        column1: "",
        column2: "",
        column3: "",
        column4: "",
    }));

    const columns = [
        { key: "sNo", label: "S. No.", width: "w-16 sm:w-20", sortable: false },
        {
            key: "column1",
            label: "FROM & TO",
            width: "w-32 sm:w-48",
            sortable: true,
        },
        {
            key: "column2",
            label: "Amount",
            width: "w-24 sm:w-32",
            sortable: true,
        },
        {
            key: "column3",
            label: "Remarks",
            width: "w-32 sm:w-48",
            sortable: true,
        },
        {
            key: "column4",
            label: "Text",
            width: "w-24 sm:w-32",
            sortable: true,
        },
        {
            key: "column5",
            label: "Text",
            width: "w-24 sm:w-32",
            sortable: true,
        },
        {
            key: "column6",
            label: "Text",
            width: "w-24 sm:w-32",
            sortable: true,
        },
    ];

    return (
        <div className="bg-base-100 rounded-lg shadow-sm border border-base-300 overflow-hidden h-full flex flex-col">
            {/* Table Container */}
            <div className="overflow-auto flex-1">
                <table className="table table-pin-rows w-full min-w-[800px]">
                    {/* Table Header */}
                    <thead className="bg-base-200 border-b border-base-300">
                        <tr>
                            {columns.map((column, index) => (
                                <th
                                    key={column.key}
                                    className={`${column.width} px-2 sm:px-4 py-3 text-left text-xs font-medium text-base-content/70 uppercase tracking-wider border-r border-base-300 last:border-r-0`}
                                >
                                    <div className="flex items-center space-x-1 sm:space-x-2">
                                        <span className="truncate">
                                            {column.label}
                                        </span>
                                        {column.sortable && (
                                            <button className="text-base-content/40 hover:text-base-content/70 flex-shrink-0">
                                                <ChevronDown className="w-3 h-3" />
                                            </button>
                                        )}
                                    </div>
                                </th>
                            ))}
                            {/* Add Column Button */}
                            <th className="w-12 sm:w-16 px-2 sm:px-4 py-3 text-center">
                                <button className="btn btn-primary btn-xs">
                                    <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                                </button>
                            </th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody className="bg-base-100 divide-y divide-base-300">
                        {rows.map((row, rowIndex) => (
                            <tr
                                key={row.id}
                                className="hover:bg-base-200 transition-colors"
                            >
                                {/* S. No. Column */}
                                <td className="px-2 sm:px-4 py-3 sm:py-4 whitespace-nowrap text-sm text-base-content border-r border-base-300 font-medium">
                                    {row.sNo}
                                </td>

                                {/* Data Columns */}
                                {columns.slice(1).map((column, colIndex) => (
                                    <td
                                        key={column.key}
                                        className="px-2 sm:px-4 py-3 sm:py-4 border-r border-base-300 last:border-r-0"
                                    >
                                        <input
                                            type="text"
                                            className="input input-ghost input-sm w-full text-sm min-w-0"
                                            placeholder=""
                                        />
                                    </td>
                                ))}

                                {/* Empty cell for add column button alignment */}
                                <td className="w-12 sm:w-16"></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Table Footer - Add Row Button */}
            <div className="border-t border-base-300 px-2 sm:px-4 py-3 flex-shrink-0">
                <button className="btn btn-ghost btn-sm text-primary">
                    <Plus className="w-4 h-4" />
                    <span>Add row</span>
                </button>
            </div>
        </div>
    );
};

export default SpreadsheetTable;
