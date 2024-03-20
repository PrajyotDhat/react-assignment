import { nanoid } from "@reduxjs/toolkit";
import {
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";

export default function TableComponent({ data = [], columns, customwidths, customeClass = "max-h-[56vh]", isLoading, customeClassAction, ...props }) {

	const [sorting, setSorting] = useState([]);

	const table = useReactTable({
		data,
		columns,
		state: {
			sorting: sorting,
		},
		onSortingChange: props.isSort && setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		debugTable: true,
	});
	if (!data) return;

	return (
		<table className="w-full border-separate border-spacing-y-2 rounded-2xl py-3 block">
			<thead className="block">
				{table.getHeaderGroups().map((headerGroup) => (
					<tr key={headerGroup.id} className="flex">
						{headerGroup.headers.map((header, index) => (
							<th
								scope="col"
								className={`${customwidths && customwidths[index] ? customwidths[index] : ""
									} 2xl:text-lg text-base text-left pl-4 font-inter-bold ${props.isActionColumnTable && index === headerGroup.headers.length - 1 ? "text-end pr-[7.25rem]" : ""} ${customeClassAction}`}
								key={nanoid()}
								onClick={header.column.getToggleSortingHandler()}
							>
								{header.isPlaceholder ? null : (
									<div className="mb-3 flex gap-2">
										{flexRender(header.column.columnDef.header, header.getContext())}
										{header.column.getIsSorted() === 'asc' ? <BsArrowUp className="h-4 self-center" /> : header.column.getIsSorted() === 'desc' && <BsArrowDown className="h-4 self-center" />}
									</div>
								)}
							</th>
						))}
					</tr>
				))}
			</thead>
			{data.length > 0 && (
				<tbody className={`overflow-y-auto pb-2 block table-body-height ${customeClass}`}>
					{table.getRowModel().rows.map((row) => (
						<tr key={row.id} className="flex">
							{row.getVisibleCells().map((cell, index) => {
								return (

									<td
										key={nanoid()}
										className={`${customwidths && customwidths[index] ? customwidths[index] : ""
											} ${(cell?.row?.original?.isActive || cell?.row?.original?.isActive == undefined) ? "" : "bg-[#F2F2F2] opacity-70"} px-2 py-4 my-1 2xl:text-base text-sm font-inter-medium text-[#333333] pl-4 items-center flex`}
									>
										{isLoading ? <span className="skeleton block"></span> : flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								)
							})}
						</tr>
					))}
				</tbody>
			)}
			{data.length <= 0 && (
				<tbody className="overflow-y-auto max-h-[65vh] block">
					<div className="flex justify-center pt-16">
						{isLoading ? <span className="skeleton block"></span> : <label>No Data Found</label>}
					</div>
				</tbody>
			)}
		</table>
	);
}