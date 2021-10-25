import { useTable, useRowSelect } from "react-table";

import { useEffect, useState } from "react";
import React from "react";
import { useHistory } from "react-router-dom";

import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TablePagination,
} from "@mui/material";

/**
 * Add checkbox column to allow user to select multiple records
 */
const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
        const defaultRef = React.useRef();
        const resolvedRef = ref || defaultRef;

        useEffect(() => {
            resolvedRef.current.indeterminate = indeterminate;
        }, [resolvedRef, indeterminate]);

        return (
            <>
                <input type="checkbox" ref={resolvedRef} {...rest} />
            </>
        );
    }
);

/**
 * Table which allow user to select multiple records, with select-all options.
 * If no record has been found, table will show user that no records are available.
 * Tab specify whether the table display contact/meeting records, either "contact" or "meeting"
 * data is simply array of records, option can only be "delete" or "export",
 * no option will shown for invalid option.
 */
const TestTable = ({ tab, data, option }) => {
    const [col, setCol] = useState(
        tab === "contact"
            ? [
                  {
                      Header: "Name",
                      accessor: (row) => row.FirstName + " " + row.LastName,
                  },
                  {
                      Header: "Phone number",
                      accessor: "MobileNo",
                  },
                  {
                      Header: "Email",
                      accessor: "Email",
                  },
              ]
            : [
                  {
                      Header: "Meeting Name",
                      accessor: "Title",
                  },
                  {
                      Header: "Location",
                      accessor: "Location",
                  },
                  {
                      Header: "Date",
                      accessor: (row) =>
                          row.StartTime && row.StartTime.slice(0, 10),
                  },
              ]
    );
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        selectedFlatRows,
        toggleHideColumn,
    } = useTable(
        {
            columns: col,
            data,
            initialState: {
                hiddenColumns: ["selection"],
                pageSize: 20,
            },
        },
        useRowSelect,
        (hooks) => {
            hooks.visibleColumns.push((columns) => [
                // Let's make a column for selection
                {
                    id: "selection",
                    // The header can use the table's getToggleAllRowsSelectedProps method
                    // to render a checkbox
                    Header: ({ getToggleAllRowsSelectedProps }) => (
                        <div>
                            <IndeterminateCheckbox
                                {...getToggleAllRowsSelectedProps()}
                            />
                        </div>
                    ),
                    // The cell can use the individual row's getToggleRowSelectedProps method
                    // to the render a checkbox
                    Cell: ({ row }) => (
                        <div>
                            <IndeterminateCheckbox
                                {...row.getToggleRowSelectedProps()}
                            />
                        </div>
                    ),
                },
                ...columns,
            ]);
        }
    );

    const [selected, setSelected] = useState([]);
    const [showSelect, setShowSelect] = useState(false);
    let history = useHistory();

    const onSelectHandler = () => {
        setShowSelect(!showSelect);
        toggleHideColumn("selection", showSelect);
    };

    const onOptionHandler = () => {
        if (option === "delete") {
            console.log("delete");
        } else {
            console.log("export");
        }
        console.log(selected);
    };

    useEffect(() => {
        setSelected(selectedFlatRows.map((d) => data[d.index]._id));
    }, [data, selectedFlatRows]);

    // Render the UI for your table
    return (
        <div className="content">
            {data.length ? (
                <>
                    <input
                        type="button"
                        value={showSelect ? "cancel" : "select"}
                        onClick={onSelectHandler}
                    />
                    <input
                        type="button"
                        value={option}
                        onClick={onOptionHandler}
                        hidden={!showSelect}
                    />
                    <table className="contact-list" {...getTableProps()}>
                        <thead>
                            {headerGroups.map((headerGroup) => (
                                <tr
                                    className="contact-list-head"
                                    {...headerGroup.getHeaderGroupProps()}
                                >
                                    {headerGroup.headers.map((column) => (
                                        <th {...column.getHeaderProps()}>
                                            {column.render("Header")}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {rows.map((row, i) => {
                                prepareRow(row);
                                return (
                                    <tr
                                        className="contact-list-record"
                                        {...row.getRowProps()}
                                        onClick={() => {
                                            !showSelect &&
                                                history.push(
                                                    `/${tab}/${
                                                        data[row.index]._id
                                                    }`
                                                );
                                        }}
                                    >
                                        {row.cells.map((cell) => {
                                            return (
                                                <td {...cell.getCellProps()}>
                                                    {cell.render("Cell")}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </>
            ) : (
                <p>no record found.</p>
            )}
        </div>
    );
};

/**
 * Basic table that simply display data and redirect to record detail when
 * a record has been clicked.
 * @param columns define header for table and accessor for access data
 * @param data data that display in table
 * @param path redirect to 'path + _id' when a row has been clicked
 * @returns table that display data based on column
 */
export const BaseTable = ({ columns, data, path }) => {
    let history = useHistory();
    const [page, setPage] = useState(0);
    const rowsPerPage = 10;

    const { getTableProps, headerGroups, rows, prepareRow } = useTable({
        columns,
        data,
    });

    const emptyRows = Math.max(0, (1 + page) * rowsPerPage - rows.length);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    if (!rows.length) {
        return <Box>no record(s) has been found.</Box>;
    }

    return (
        <Box
            sx={{
                gridArea: "main",
            }}
        >
            <Table {...getTableProps()}>
                {columns.length === 3 && (
                    <colgroup>
                        <col width="40%" />
                        <col width="30%" />
                        <col width="30%" />
                    </colgroup>
                )}
                {columns.length === 2 && (
                    <colgroup>
                        <col width="50%" />
                        <col width="50%" />
                    </colgroup>
                )}
                <TableHead sx={{ backgroundColor: "primary.light" }}>
                    {headerGroups.map((headerGroup) => (
                        <TableRow {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <TableCell
                                    sx={{ fontSize: 20 }}
                                    {...column.getHeaderProps()}
                                >
                                    {column.render("Header")}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableHead>
                <TableBody>
                    {rows
                        .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                        )
                        .map((row, i) => {
                            prepareRow(row);
                            return (
                                <TableRow
                                    key={i}
                                    hover={true}
                                    onClick={() =>
                                        history.push(path + data[i]._id)
                                    }
                                    {...row.getRowProps()}
                                >
                                    {row.cells.map((cell) => {
                                        return (
                                            <TableCell {...cell.getCellProps()}>
                                                {cell.render("Cell")}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    {emptyRows > 0 && (
                        <TableRow
                            style={{
                                height: 53 * emptyRows,
                            }}
                        >
                            <TableCell colSpan={3} />
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
            />
        </Box>
    );
};

export default Table;
