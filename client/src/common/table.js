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
    Typography,
} from "@mui/material";

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
        return (
            <Box
                sx={{
                    gridArea: "main",
                    margin: "auto"
                }}
            >
                <Typography variant="h4">no record(s) has been found.</Typography>
            </Box>
        );
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
                        .map((row) => {
                            prepareRow(row);
                            return (
                                <TableRow
                                    key={row.index}
                                    hover={true}
                                    onClick={() =>
                                        history.push(path + data[row.index]._id)
                                    }
                                    sx={{cursor: "pointer"}}
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
