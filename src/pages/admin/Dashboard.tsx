import React from 'react';

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-h2 font-bold mb-xl">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
        {[
          { label: 'Total Media', count: 0 },
          { label: 'Milestones', count: 0 },
          { label: 'Inquiries', count: 0 },
        ].map((stat) => (
          <div key={stat.label} className="bg-white dark:bg-background-dark-elevated p-xl rounded-xl shadow-sm border border-neutral-100 dark:border-neutral-800">
            <p className="text-small text-neutral-500 mb-xs">{stat.label}</p>
            <p className="text-h2 font-bold">{stat.count}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
