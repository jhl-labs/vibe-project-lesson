import React, { useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
  type SortingState,
  type ColumnDef,
} from '@tanstack/react-table';
import { ArrowUpDown, ArrowUp, ArrowDown, Search } from 'lucide-react';

interface DataTableProps<T extends Record<string, unknown>> {
  columns: { key: string; header: string; width?: string }[];
  data: T[];
  title?: string;
  searchable?: boolean;
  pageSize?: number;
}

export function DataTable<T extends Record<string, unknown>>({
  columns: columnDefs,
  data,
  title,
  searchable = false,
  pageSize = 10,
}: DataTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const columns = useMemo<ColumnDef<T, unknown>[]>(() => {
    const helper = createColumnHelper<T>();
    return columnDefs.map((col) =>
      helper.accessor((row) => row[col.key] as unknown, {
        id: col.key,
        header: col.header,
        size: col.width ? parseInt(col.width) : undefined,
      }),
    );
  }, [columnDefs]);

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize } },
  });

  const SortIcon = ({ isSorted }: { isSorted: false | 'asc' | 'desc' }) => {
    if (isSorted === 'asc') return <ArrowUp size={14} />;
    if (isSorted === 'desc') return <ArrowDown size={14} />;
    return <ArrowUpDown size={14} style={{ opacity: 0.4 }} />;
  };

  return (
    <div style={{
      margin: '16px 0',
      border: '1px solid #334155',
      borderRadius: '8px',
      overflow: 'hidden',
    }}>
      {(title || searchable) && (
        <div style={{
          padding: '12px 16px',
          background: '#1e293b',
          borderBottom: '1px solid #334155',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
        }}>
          {title && (
            <span style={{ color: '#e2e8f0', fontWeight: 600, fontSize: '14px' }}>
              {title}
            </span>
          )}
          {searchable && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: '#0f172a',
              border: '1px solid #475569',
              borderRadius: '6px',
              padding: '4px 10px',
            }}>
              <Search size={14} color="#94a3b8" />
              <input
                type="text"
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                placeholder="검색..."
                style={{
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#f1f5f9',
                  fontSize: '13px',
                  fontFamily: "'Pretendard Variable', sans-serif",
                  width: '140px',
                }}
              />
            </div>
          )}
        </div>
      )}
      <div style={{ overflowX: 'auto' }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '13px',
        }}>
          <thead>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    style={{
                      padding: '10px 16px',
                      background: '#1e293b',
                      color: '#a5b4fc',
                      fontWeight: 600,
                      textAlign: 'left',
                      borderBottom: '1px solid #334155',
                      whiteSpace: 'nowrap',
                      cursor: 'pointer',
                      userSelect: 'none',
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      <SortIcon isSorted={header.column.getIsSorted()} />
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} style={{
                    padding: '10px 16px',
                    color: '#cbd5e1',
                    borderBottom: '1px solid #1e293b',
                  }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {table.getPageCount() > 1 && (
        <div style={{
          padding: '8px 16px',
          background: '#1e293b',
          borderTop: '1px solid #334155',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
        }}>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            style={{
              background: 'transparent',
              border: '1px solid #475569',
              borderRadius: '4px',
              color: table.getCanPreviousPage() ? '#f1f5f9' : '#475569',
              padding: '4px 12px',
              cursor: table.getCanPreviousPage() ? 'pointer' : 'default',
              fontSize: '12px',
            }}
          >
            이전
          </button>
          <span style={{ color: '#94a3b8', fontSize: '12px' }}>
            {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
          </span>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            style={{
              background: 'transparent',
              border: '1px solid #475569',
              borderRadius: '4px',
              color: table.getCanNextPage() ? '#f1f5f9' : '#475569',
              padding: '4px 12px',
              cursor: table.getCanNextPage() ? 'pointer' : 'default',
              fontSize: '12px',
            }}
          >
            다음
          </button>
        </div>
      )}
    </div>
  );
}
