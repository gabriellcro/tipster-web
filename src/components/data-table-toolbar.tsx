"use client";
import * as React from "react";
import { Search } from "lucide-react";
import { Table as TableType } from "@tanstack/react-table";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

interface DataTableToolbarProps<TData> {
  table: TableType<TData>;
  searchColumn: string;
  searchPlaceholder?: string;
  showCount?: boolean; // opcional: mostra número de resultados
}

export function DataTableToolbar<TData>({
  table,
  searchColumn,
  searchPlaceholder = "Pesquisar...",
  showCount = false,
}: DataTableToolbarProps<TData>) {
  const column = table.getColumn(searchColumn);
  const value = (column?.getFilterValue() as string) ?? "";

  return (
    <div className="flex items-center gap-3 p-1 flex-wrap">
      <InputGroup>
        <InputGroupInput
          placeholder={searchPlaceholder}
          value={value}
          onChange={(event) => column?.setFilterValue(event.target.value)}
          disabled={!column}
          aria-label={`Pesquisar na coluna ${searchColumn}`}
        />
        <InputGroupAddon>
          <Search className="text-muted-foreground" />
        </InputGroupAddon>
        {showCount && (
          <InputGroupAddon align="inline-end" aria-live="polite">
            {table.getFilteredRowModel().rows.length} resultado
            {table.getFilteredRowModel().rows.length !== 1 && "s"}
          </InputGroupAddon>
        )}
      </InputGroup>
    </div>
  );
}
