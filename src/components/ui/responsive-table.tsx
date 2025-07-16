import * as React from 'react';
import { cn } from '@/lib/utils';

interface ResponsiveTableProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function ResponsiveTable({ children, className, ...props }: ResponsiveTableProps) {
  return (
    <div className={cn("w-full overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0", className)} {...props}>
      <div className="inline-block min-w-full align-middle">
        {children}
      </div>
    </div>
  );
}

interface TableCardProps {
  headers: string[];
  rows: (string | React.ReactNode)[][];
  className?: string;
}

export function TableCard({ headers, rows, className }: TableCardProps) {
  return (
    <>
      {/* Desktop Table View */}
      <div className="hidden md:block">
        <table className={cn("min-w-full divide-y divide-gray-200", className)}>
          <thead className="bg-gray-50">
            <tr>
              {headers.map((header, idx) => (
                <th
                  key={idx}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rows.map((row, rowIdx) => (
              <tr key={rowIdx}>
                {row.map((cell, cellIdx) => (
                  <td key={cellIdx} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {rows.map((row, rowIdx) => (
          <div key={rowIdx} className="bg-white p-4 rounded-lg shadow border border-gray-200">
            {row.map((cell, cellIdx) => (
              <div key={cellIdx} className="mb-2 last:mb-0">
                <span className="text-xs font-medium text-gray-500 uppercase">
                  {headers[cellIdx]}:
                </span>
                <div className="mt-1 text-sm text-gray-900">{cell}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

// Opening Hours Table Component
interface OpeningHoursTableProps {
  hours: Record<string, string>;
  className?: string;
}

export function OpeningHoursTable({ hours, className }: OpeningHoursTableProps) {
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const rows = days.map(day => [
    day.charAt(0).toUpperCase() + day.slice(1),
    hours[day] || 'Closed'
  ]);

  return <TableCard headers={['Day', 'Hours']} rows={rows} className={className} />;
}

// Menu Items Table Component
interface MenuTableProps {
  items: Array<{
    name: string;
    description?: string;
    price: string;
    dietary?: string[];
  }>;
  className?: string;
}

export function MenuTable({ items, className }: MenuTableProps) {
  const rows = items.map(item => [
    <div>
      <div className="font-medium">{item.name}</div>
      {item.description && (
        <div className="text-xs text-gray-500 mt-1">{item.description}</div>
      )}
      {item.dietary && item.dietary.length > 0 && (
        <div className="flex gap-1 mt-1">
          {item.dietary.map(tag => (
            <span key={tag} className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>,
    <div className="text-right font-medium">{item.price}</div>
  ]);

  return <TableCard headers={['Item', 'Price']} rows={rows} className={className} />;
}