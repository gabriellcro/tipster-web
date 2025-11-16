"use client";

import * as React from "react";
import {
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  useReactTable,
  ColumnDef,
} from "@tanstack/react-table";
import { TopAssistResponse } from "@/schemas/players-top-assists";
import { DataTableToolbar } from "@/components/data-table-toolbar";
import { DataTableContent } from "@/components/data-table-content";
import { DataTablePagination } from "@/components/data-table-pagination";

interface PlayersTopAssistsTableProps {
  data: TopAssistResponse[];
  columns: ColumnDef<TopAssistResponse>[];
}

export function PlayersTopAssistsTable({
  data,
  columns,
}: PlayersTopAssistsTableProps) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="space-y-4">
      <DataTableToolbar
        table={table}
        searchColumn="playerName"
        searchPlaceholder="Pesquisar jogador..."
        showCount
      />
      <DataTableContent table={table} columns={columns} />
      <DataTablePagination table={table} />
    </div>
  );
}
