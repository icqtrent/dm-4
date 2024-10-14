

/** @format */
"use client";

import { DataTable } from "@/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import PageTitle from "@/components/PageTitle";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch"
import ThemeToggler from "@/components/ThemeToggler";



type Props = {};

interface Setting {
  category: string;
  value: string | number | boolean;
}

const columns: ColumnDef<Setting>[] = [
  {
    accessorKey: "category",
    header: "Categoría"
  },
  {
    accessorKey: "value",
    header: "Valor",
    cell: ({ getValue }) => {
      const value = getValue<string | number | boolean>();
      if (value === "Dark") {
        return <ThemeToggler />
      }
      return <span>{String(value)}</span>;
    }
  }
];
const data: Setting[] = [
 /* {
    category: "Account",
    value: true
  },
  {
    category: "Notifications",
    value: false
  },
  */
  {
    category: "Idioma",
    value: "Español"
  },
  {
    category: "Tema",
    value: "Dark"
  }
];

export default function SettingsPage({}: Props) {
  return (
    <div className="flex flex-col gap-5  w-full">
      <PageTitle title="Settings" />
      <DataTable columns={columns} data={data} />
    
    </div>
  );
}