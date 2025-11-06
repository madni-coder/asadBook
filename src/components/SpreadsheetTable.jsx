import React, { useState, useRef, useEffect } from "react";
import {
    Plus,
    ChevronDown,
    Filter,
    Edit3,
    ArrowUpDown,
    MoreVertical,
    X,
    Check,
    ArrowUp,
    ArrowDown,
    Type,
    Hash,
    Calendar,
    Link,
    ChevronRight,
} from "lucide-react";

const SpreadsheetTable = () => {
    // Generate 8 empty rows with more realistic data
    const [rows, setRows] = useState(
        Array.from({ length: 8 }, (_, index) => ({
            id: index + 1,
            sNo: index + 1,
            columnA:
                index === 0 ? "Sample Data" : index === 1 ? "Test Entry" : "",
            columnB: index === 0 ? "Value 1" : index === 1 ? "Value 2" : "",
            columnC: index === 0 ? "Info A" : index === 1 ? "Info B" : "",
        }))
    );

    const [dropdownOpen, setDropdownOpen] = useState(null);
    const [typeDropdownOpen, setTypeDropdownOpen] = useState(null);
    const [editingColumn, setEditingColumn] = useState(null);
    const [tempColumnName, setTempColumnName] = useState("");
    const [contextMenu, setContextMenu] = useState(null);
    const dropdownRef = useRef(null);
    const typeDropdownRef = useRef(null);
    const editInputRef = useRef(null);

    const [columns, setColumns] = useState([
        {
            key: "sNo",
            label: "S. No.",
            width: "w-8 sm:w-10",
            sortable: false,
            type: "text",
        },
        {
            key: "columnA",
            label: "Column A",
            width: "w-28 sm:w-36 md:w-44 lg:w-52",
            sortable: true,
            type: "text",
        },
        {
            key: "columnB",
            label: "Column B",
            width: "w-28 sm:w-36 md:w-44 lg:w-52",
            sortable: true,
            type: "text",
        },
        {
            key: "columnC",
            label: "Column C",
            width: "w-28 sm:w-36 md:w-44 lg:w-52",
            sortable: true,
            type: "text",
        },
    ]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target) &&
                typeDropdownRef.current &&
                !typeDropdownRef.current.contains(event.target)
            ) {
                setDropdownOpen(null);
                setTypeDropdownOpen(null);
            }
            if (
                !event.target.closest(".context-menu") &&
                !event.target.closest(".row-menu-trigger")
            ) {
                setContextMenu(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [dropdownOpen, typeDropdownOpen]); // Add both dropdowns as dependencies

    // Focus input when editing
    useEffect(() => {
        if (editingColumn && editInputRef.current) {
            editInputRef.current.focus();
            editInputRef.current.select();
        }
    }, [editingColumn]);

    const handleDropdownToggle = (columnKey) => {
        const newState = dropdownOpen === columnKey ? null : columnKey;
        setDropdownOpen(newState);
        setTypeDropdownOpen(null); // Close type dropdown when main dropdown toggles
    };

    const handleTypeDropdownToggle = (columnKey) => {
        setTypeDropdownOpen(typeDropdownOpen === columnKey ? null : columnKey);
    };

    const handleColumnTypeChange = (columnKey, newType) => {
        setColumns(
            columns.map((col) =>
                col.key === columnKey ? { ...col, type: newType } : col
            )
        );
        setTypeDropdownOpen(null);
        setDropdownOpen(null);
    };

    const handleEditColumn = (columnKey) => {
        const column = columns.find((col) => col.key === columnKey);
        setEditingColumn(columnKey);
        setTempColumnName(column.label);
        setDropdownOpen(null);
    };

    const handleSaveColumnName = () => {
        if (tempColumnName.trim()) {
            setColumns(
                columns.map((col) =>
                    col.key === editingColumn
                        ? { ...col, label: tempColumnName.trim() }
                        : col
                )
            );
        }
        setEditingColumn(null);
        setTempColumnName("");
    };

    const handleCancelEdit = () => {
        setEditingColumn(null);
        setTempColumnName("");
    };

    const handleDeleteColumn = (columnKey) => {
        // Don't allow deleting the S. No. column
        if (columnKey === "sNo") return;

        // Remove column from columns array
        const updatedColumns = columns.filter((col) => col.key !== columnKey);
        setColumns(updatedColumns);

        // Remove column data from all rows
        const updatedRows = rows.map((row) => {
            const { [columnKey]: deleted, ...rest } = row;
            return rest;
        });
        setRows(updatedRows);

        setDropdownOpen(null);
    };

    const handleSort = (columnKey, direction = "asc") => {
        const sortedRows = [...rows].sort((a, b) => {
            const aVal = a[columnKey] || "";
            const bVal = b[columnKey] || "";

            if (direction === "asc") {
                return aVal.localeCompare(bVal);
            } else {
                return bVal.localeCompare(aVal);
            }
        });

        setRows(sortedRows);
        setDropdownOpen(null);
    };

    const handleAddRowAbove = (rowIndex) => {
        const newRow = {
            id: Date.now(),
            sNo: 0, // Will be updated after insertion
            columnA: "",
            columnB: "",
            columnC: "",
        };

        const newRows = [...rows];
        newRows.splice(rowIndex, 0, newRow);

        // Update serial numbers
        const updatedRows = newRows.map((row, index) => ({
            ...row,
            sNo: index + 1,
        }));

        setRows(updatedRows);
        setContextMenu(null);
    };

    const handleAddRowBelow = (rowIndex) => {
        const newRow = {
            id: Date.now(),
            sNo: 0, // Will be updated after insertion
            columnA: "",
            columnB: "",
            columnC: "",
        };

        const newRows = [...rows];
        newRows.splice(rowIndex + 1, 0, newRow);

        // Update serial numbers
        const updatedRows = newRows.map((row, index) => ({
            ...row,
            sNo: index + 1,
        }));

        setRows(updatedRows);
        setContextMenu(null);
    };

    const handleCellChange = (rowId, columnKey, value) => {
        setRows(
            rows.map((row) =>
                row.id === rowId ? { ...row, [columnKey]: value } : row
            )
        );
    };

    const handleRowContextMenu = (e, rowIndex) => {
        e.preventDefault();
        setContextMenu({
            x: e.clientX,
            y: e.clientY,
            rowIndex,
        });
    };

    return (
        <>
            <div className="bg-base-100 rounded-lg shadow-sm border border-base-300 overflow-hidden h-full flex flex-col">
                {/* Table Container */}
                <div className="overflow-auto flex-1 relative">
                    <table className="table table-pin-rows w-full min-w-[450px] lg:min-w-[650px]">
                        {/* Table Header */}
                        <thead className="bg-base-200 border-b border-base-300">
                            <tr>
                                {columns.map((column, index) => (
                                    <th
                                        key={column.key}
                                        className={`${column.width} px-2 sm:px-3 md:px-4 py-3 text-left text-xs font-medium text-base-content/70 uppercase tracking-wider border-r border-base-300 last:border-r-0 relative z-10`}
                                    >
                                        <div className="flex items-center justify-between">
                                            {editingColumn === column.key ? (
                                                <div className="flex items-center space-x-2 flex-1">
                                                    <input
                                                        ref={editInputRef}
                                                        type="text"
                                                        value={tempColumnName}
                                                        onChange={(e) =>
                                                            setTempColumnName(
                                                                e.target.value
                                                            )
                                                        }
                                                        onKeyDown={(e) => {
                                                            if (
                                                                e.key ===
                                                                "Enter"
                                                            )
                                                                handleSaveColumnName();
                                                            if (
                                                                e.key ===
                                                                "Escape"
                                                            )
                                                                handleCancelEdit();
                                                        }}
                                                        className="input input-xs bg-base-100 border-primary text-xs flex-1 min-w-0"
                                                    />
                                                    <div className="flex space-x-1">
                                                        <button
                                                            onClick={
                                                                handleSaveColumnName
                                                            }
                                                            className="btn btn-xs btn-primary"
                                                        >
                                                            <Check className="w-3 h-3" />
                                                        </button>
                                                        <button
                                                            onClick={
                                                                handleCancelEdit
                                                            }
                                                            className="btn btn-xs btn-ghost"
                                                        >
                                                            <X className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <>
                                                    <div className="flex items-center flex-1 pr-2 min-w-0">
                                                        <span className="truncate">
                                                            {column.label}
                                                        </span>
                                                        {/* Type indicator */}
                                                        <span className="ml-1 flex-shrink-0">
                                                            {column.type ===
                                                                "text" && (
                                                                <Type className="w-3 h-3 text-base-content/40" />
                                                            )}
                                                            {column.type ===
                                                                "number" && (
                                                                <Hash className="w-3 h-3 text-base-content/40" />
                                                            )}
                                                            {column.type ===
                                                                "date" && (
                                                                <Calendar className="w-3 h-3 text-base-content/40" />
                                                            )}
                                                            {column.type ===
                                                                "url" && (
                                                                <Link className="w-3 h-3 text-base-content/40" />
                                                            )}
                                                        </span>
                                                    </div>
                                                    {column.sortable && (
                                                        <div
                                                            className="relative z-50"
                                                            ref={
                                                                dropdownOpen ===
                                                                column.key
                                                                    ? dropdownRef
                                                                    : null
                                                            }
                                                        >
                                                            <button
                                                                className="text-base-content/40 hover:text-base-content/70 flex-shrink-0 p-1 rounded hover:bg-base-100"
                                                                onClick={(
                                                                    e
                                                                ) => {
                                                                    e.stopPropagation();
                                                                    handleDropdownToggle(
                                                                        column.key
                                                                    );
                                                                }}
                                                            >
                                                                <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
                                                            </button>

                                                            {/* Dropdown Menu */}
                                                            {dropdownOpen ===
                                                                column.key && (
                                                                <div
                                                                    className="absolute top-full right-0 mt-1 bg-base-100 border border-base-300 rounded-lg shadow-xl z-[100] min-w-[160px] sm:min-w-[180px]"
                                                                    style={{
                                                                        boxShadow:
                                                                            "0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                                                                    }}
                                                                >
                                                                    <div
                                                                        className="relative"
                                                                        onMouseEnter={() =>
                                                                            setTypeDropdownOpen(
                                                                                column.key
                                                                            )
                                                                        }
                                                                        onMouseLeave={() =>
                                                                            setTypeDropdownOpen(
                                                                                null
                                                                            )
                                                                        }
                                                                    >
                                                                        <button className="flex items-center justify-between w-full px-3 py-2 text-sm text-left hover:bg-base-200 transition-colors">
                                                                            <div className="flex items-center">
                                                                                <Type className="w-4 h-4 mr-2" />
                                                                                Type
                                                                                Of
                                                                            </div>
                                                                            <ChevronRight className="w-3 h-3" />
                                                                        </button>

                                                                        {/* Type Dropdown Menu */}
                                                                        {typeDropdownOpen ===
                                                                            column.key && (
                                                                            <div
                                                                                ref={
                                                                                    typeDropdownRef
                                                                                }
                                                                                className="absolute top-0 left-full ml-1 bg-base-100 border border-base-300 rounded-lg shadow-xl z-[110] min-w-[140px]"
                                                                                style={{
                                                                                    boxShadow:
                                                                                        "0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                                                                                }}
                                                                            >
                                                                                <div className="py-1">
                                                                                    <button
                                                                                        onClick={() =>
                                                                                            handleColumnTypeChange(
                                                                                                column.key,
                                                                                                "text"
                                                                                            )
                                                                                        }
                                                                                        className={`flex items-center w-full px-3 py-2 text-sm text-left hover:bg-base-200 transition-colors ${
                                                                                            column.type ===
                                                                                            "text"
                                                                                                ? "bg-base-200 font-medium"
                                                                                                : ""
                                                                                        }`}
                                                                                    >
                                                                                        <Type className="w-4 h-4 mr-2" />
                                                                                        Text
                                                                                    </button>
                                                                                    <button
                                                                                        onClick={() =>
                                                                                            handleColumnTypeChange(
                                                                                                column.key,
                                                                                                "number"
                                                                                            )
                                                                                        }
                                                                                        className={`flex items-center w-full px-3 py-2 text-sm text-left hover:bg-base-200 transition-colors ${
                                                                                            column.type ===
                                                                                            "number"
                                                                                                ? "bg-base-200 font-medium"
                                                                                                : ""
                                                                                        }`}
                                                                                    >
                                                                                        <Hash className="w-4 h-4 mr-2" />
                                                                                        Number
                                                                                    </button>
                                                                                    <button
                                                                                        onClick={() =>
                                                                                            handleColumnTypeChange(
                                                                                                column.key,
                                                                                                "date"
                                                                                            )
                                                                                        }
                                                                                        className={`flex items-center w-full px-3 py-2 text-sm text-left hover:bg-base-200 transition-colors ${
                                                                                            column.type ===
                                                                                            "date"
                                                                                                ? "bg-base-200 font-medium"
                                                                                                : ""
                                                                                        }`}
                                                                                    >
                                                                                        <Calendar className="w-4 h-4 mr-2" />
                                                                                        Date
                                                                                    </button>
                                                                                    <button
                                                                                        onClick={() =>
                                                                                            handleColumnTypeChange(
                                                                                                column.key,
                                                                                                "url"
                                                                                            )
                                                                                        }
                                                                                        className={`flex items-center w-full px-3 py-2 text-sm text-left hover:bg-base-200 transition-colors ${
                                                                                            column.type ===
                                                                                            "url"
                                                                                                ? "bg-base-200 font-medium"
                                                                                                : ""
                                                                                        }`}
                                                                                    >
                                                                                        <Link className="w-4 h-4 mr-2" />
                                                                                        URL
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                    <div className="py-1">
                                                                        <button
                                                                            onClick={() =>
                                                                                handleSort(
                                                                                    column.key,
                                                                                    "asc"
                                                                                )
                                                                            }
                                                                            className="flex items-center w-full px-3 py-2 text-sm text-left hover:bg-base-200 transition-colors"
                                                                        >
                                                                            <ArrowUpDown className="w-4 h-4 mr-2 rotate-180" />
                                                                            Sort
                                                                            A →
                                                                            Z
                                                                        </button>
                                                                        <button
                                                                            onClick={() =>
                                                                                handleSort(
                                                                                    column.key,
                                                                                    "desc"
                                                                                )
                                                                            }
                                                                            className="flex items-center w-full px-3 py-2 text-sm text-left hover:bg-base-200 transition-colors"
                                                                        >
                                                                            <ArrowUpDown className="w-4 h-4 mr-2" />
                                                                            Sort
                                                                            Z →
                                                                            A
                                                                        </button>
                                                                        <hr className="my-1 border-base-300" />
                                                                        <button
                                                                            onClick={() =>
                                                                                handleEditColumn(
                                                                                    column.key
                                                                                )
                                                                            }
                                                                            className="flex items-center w-full px-3 py-2 text-sm text-left hover:bg-base-200 transition-colors"
                                                                        >
                                                                            <Edit3 className="w-4 h-4 mr-2" />
                                                                            Edit
                                                                            Column
                                                                        </button>

                                                                        {/* Type Of with nested dropdown */}

                                                                        <hr className="my-1 border-base-300" />
                                                                        <button
                                                                            onClick={() =>
                                                                                handleDeleteColumn(
                                                                                    column.key
                                                                                )
                                                                            }
                                                                            className="flex items-center w-full px-3 py-2 text-sm text-left hover:bg-red-50 hover:text-red-600 transition-colors"
                                                                        >
                                                                            <X className="w-4 h-4 mr-2" />
                                                                            Delete
                                                                            Column
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </th>
                                ))}
                                {/* Add Column Button */}
                                <th className="w-10 sm:w-12 px-1 sm:px-2 py-3 text-center">
                                    <button className="btn btn-primary btn-xs">
                                        <Plus className="w-3 h-3" />
                                    </button>
                                </th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody className="bg-base-100 divide-y divide-base-300">
                            {rows.map((row, rowIndex) => (
                                <tr
                                    key={row.id}
                                    className="hover:bg-base-200 transition-colors group"
                                    onContextMenu={(e) =>
                                        handleRowContextMenu(e, rowIndex)
                                    }
                                >
                                    {/* S. No. Column */}
                                    <td className="px-2 sm:px-3 md:px-4 py-3 sm:py-4 whitespace-nowrap text-sm text-base-content border-r border-base-300 font-medium relative">
                                        <div className="flex items-center justify-between">
                                            <span>{row.sNo}</span>
                                            <button
                                                className="row-menu-trigger opacity-0 group-hover:opacity-100 transition-opacity ml-1 p-1 rounded hover:bg-base-300"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    const rect =
                                                        e.currentTarget.getBoundingClientRect();
                                                    setContextMenu({
                                                        x: rect.right,
                                                        y: rect.top,
                                                        rowIndex,
                                                    });
                                                }}
                                            >
                                                <MoreVertical className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </td>

                                    {/* Data Columns */}
                                    {columns.slice(1).map((column) => (
                                        <td
                                            key={column.key}
                                            className="px-2 sm:px-3 md:px-4 py-3 sm:py-4 border-r border-base-300 last:border-r-0"
                                        >
                                            {column.type === "url" &&
                                            row[column.key] ? (
                                                // URL column with clickable link
                                                <div className="flex items-center space-x-2">
                                                    <input
                                                        type="text"
                                                        value={
                                                            row[column.key] ||
                                                            ""
                                                        }
                                                        onChange={(e) =>
                                                            handleCellChange(
                                                                row.id,
                                                                column.key,
                                                                e.target.value
                                                            )
                                                        }
                                                        className="input input-ghost input-sm flex-1 text-sm min-w-0 px-1 py-1 focus:bg-base-100 focus:border-primary"
                                                        placeholder="Enter URL"
                                                    />
                                                    {row[column.key] && (
                                                        <a
                                                            href={
                                                                row[
                                                                    column.key
                                                                ].startsWith(
                                                                    "http"
                                                                )
                                                                    ? row[
                                                                          column
                                                                              .key
                                                                      ]
                                                                    : `https://${
                                                                          row[
                                                                              column
                                                                                  .key
                                                                          ]
                                                                      }`
                                                            }
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-primary hover:text-primary-focus flex-shrink-0 p-1 rounded hover:bg-base-200"
                                                            title="Open link"
                                                        >
                                                            <Link className="w-3 h-3" />
                                                        </a>
                                                    )}
                                                </div>
                                            ) : (
                                                // Regular input for other column types
                                                <input
                                                    type={
                                                        column.type === "number"
                                                            ? "number"
                                                            : column.type ===
                                                              "date"
                                                            ? "date"
                                                            : "text"
                                                    }
                                                    value={
                                                        row[column.key] || ""
                                                    }
                                                    onChange={(e) =>
                                                        handleCellChange(
                                                            row.id,
                                                            column.key,
                                                            e.target.value
                                                        )
                                                    }
                                                    className="input input-ghost input-sm w-full text-sm min-w-0 px-1 py-1 focus:bg-base-100 focus:border-primary"
                                                    placeholder={`Enter ${
                                                        column.type === "url"
                                                            ? "URL"
                                                            : column.label.toLowerCase()
                                                    }`}
                                                />
                                            )}
                                        </td>
                                    ))}

                                    {/* Empty cell for add column button alignment */}
                                    <td className="w-10 sm:w-12"></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Table Footer - Add Row Button */}
                <div className="border-t border-base-300 px-2 sm:px-3 md:px-4 py-3 flex-shrink-0">
                    <button
                        className="btn btn-ghost btn-sm text-primary hover:bg-primary/10"
                        onClick={() => {
                            const newRow = {
                                id: Date.now(),
                                sNo: rows.length + 1,
                                columnA: "",
                                columnB: "",
                                columnC: "",
                            };
                            setRows([...rows, newRow]);
                        }}
                    >
                        <Plus className="w-4 h-4" />
                        <span className="hidden sm:inline">Add row</span>
                        <span className="sm:hidden">Add</span>
                    </button>
                </div>
            </div>

            {/* Context Menu */}
            {contextMenu && (
                <div
                    className="context-menu fixed bg-base-100 border border-base-300 rounded-lg shadow-lg z-50 min-w-[160px]"
                    style={{
                        left: `${contextMenu.x}px`,
                        top: `${contextMenu.y}px`,
                    }}
                >
                    <div className="py-1">
                        <button
                            onClick={() =>
                                handleAddRowAbove(contextMenu.rowIndex)
                            }
                            className="flex items-center w-full px-3 py-2 text-sm text-left hover:bg-base-200 transition-colors"
                        >
                            <ArrowUp className="w-4 h-4 mr-2" />
                            Add row above
                        </button>
                        <button
                            onClick={() =>
                                handleAddRowBelow(contextMenu.rowIndex)
                            }
                            className="flex items-center w-full px-3 py-2 text-sm text-left hover:bg-base-200 transition-colors"
                        >
                            <ArrowDown className="w-4 h-4 mr-2" />
                            Add row below
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default SpreadsheetTable;
