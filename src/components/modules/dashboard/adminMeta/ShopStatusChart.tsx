"use client";

import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface ShopStatusChartProps {
  activeShops: number;
  inactiveShops: number;
}

export function ShopStatusChart({
  activeShops,
  inactiveShops,
}: ShopStatusChartProps) {
  const data = [
    { name: "Active", value: activeShops, color: "#10b981" }, // green
    { name: "Inactive", value: inactiveShops, color: "#94a3b8" }, // slate
  ].filter((item) => item.value > 0); // Only include non-zero values

  return (
    <ResponsiveContainer width="100%" height="100%">
      {data.length > 0 ? (
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => [`${value} shops`, "Count"]}
            contentStyle={{
              backgroundColor: "hsl(var(--background))",
              borderColor: "hsl(var(--border))",
              borderRadius: "0.5rem",
              boxShadow:
                "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
            }}
          />
          <Legend />
        </PieChart>
      ) : (
        <div className="flex h-full items-center justify-center">
          <p className="text-sm text-muted-foreground">
            No shop data available
          </p>
        </div>
      )}
    </ResponsiveContainer>
  );
}
