import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';

interface Column {
  header: string;
  accessor: string;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  onEdit: (item: any) => void;
  onDelete: (id: string) => void;
}

export default function DataTable({ columns, data, onEdit, onDelete }: DataTableProps) {
  return (
    <div className="overflow-x-auto bg-white dark:bg-background-dark-elevated rounded-xl shadow-sm border border-neutral-100 dark:border-neutral-800">
      <table className="w-full text-left">
        <thead className="bg-neutral-50 dark:bg-neutral-800/50">
          <tr>
            {columns.map((col) => (
              <th key={col.accessor} className="px-lg py-md text-small font-semibold text-neutral-600 dark:text-neutral-400">
                {col.header}
              </th>
            ))}
            <th className="px-lg py-md text-small font-semibold text-neutral-600 dark:text-neutral-400 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/20 transition-colors">
              {columns.map((col) => (
                <td key={col.accessor} className="px-lg py-md text-body text-neutral-700 dark:text-neutral-300">
                  {Array.isArray(item[col.accessor]) ? item[col.accessor].length + ' items' : item[col.accessor]}
                </td>
              ))}
              <td className="px-lg py-md text-right space-x-2">
                <button
                  onClick={() => onEdit(item)}
                  className="p-xs text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/10 rounded"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className="p-xs text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded"
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
