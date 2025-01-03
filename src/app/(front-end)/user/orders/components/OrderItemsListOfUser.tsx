"use client"

import * as React from "react";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardFooter
} from "@/components/ui/molecules";
import DropDownMenuOfItem from "./DropDownMenuOfItem";
import { IOrder } from "@/types/order";
import { orderData } from "@/constants/data/order";
import { formatDateTime } from "@/lib/formats";
import Toolbar from "./Toolbar";
import Pagination from "./Pagination";

//lib
import { formatToCurrency } from "@/lib/formats"

// Table Columns
export const columns: ColumnDef<IOrder>[] = [
    {
        accessorKey: "user",
        header: "Full Name",
        cell: ({ row }) => {
            const { user } = row.original
            return (
                <div className="capitalize">{user?.name}</div>
            )
        }
    },
    {
        accessorKey: "totalPrice",
        header: "Total Price",
        cell: ({ row }) => (
            <div className="capitalize">{formatToCurrency(row.getValue("totalPrice"))}</div>
        ),
    },
    {
        accessorKey: "shippingPrice",
        header: "Shipping Price",
        cell: ({ row }) => (
            <div className="capitalize">{formatToCurrency(row.getValue("shippingPrice"))}</div>
        ),
    },
    {
        accessorKey: "taxPrice",
        header: "Tax Price",
        cell: ({ row }) => (
            <div className="capitalize">{formatToCurrency(row.getValue("taxPrice"))}</div>
        ),
    },
    {
        accessorKey: "createdAt",
        header: "Create At",
        cell: ({ row }) => (
            <div className="capitalize">{formatDateTime(row.getValue("createdAt"))}</div>
        ),
    },
    {
        accessorKey: "deliveredAt",
        header: "Delivered At",
        cell: ({ row }) => (
            <div className="capitalize">{formatDateTime(row.getValue("deliveredAt"))}</div>
        ),
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const order = row.original;

            return <DropDownMenuOfItem order={order} />
        },
    },
];

// Main Component
export default function OrderItemsListOfUser() {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    );
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    const table = useReactTable<IOrder>({
        data: orderData as IOrder[],
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    return (
        <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between py-0">
                <CardTitle>
                    Order History List
                </CardTitle>
                <Toolbar table={table} />
            </CardHeader>
            <CardContent className="rounded-md">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter className="py-0">
                <Pagination table={table} />
            </CardFooter>
        </Card>
    );
}
