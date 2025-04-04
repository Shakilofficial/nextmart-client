"use client";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface PaymentStatusChartProps {
  data: Array<{
    totalPayments: number;
    status: string;
  }>;
}

export function PaymentStatusChart({ data }: PaymentStatusChartProps) {
  // Colors for different payment statuses
  const COLORS = {
    Paid: "#10b981", // green
    Pending: "#f59e0b", // amber
    Failed: "#ef4444", // red
    Refunded: "#6366f1", // indigo
  };

  // Format data for the pie chart
  const chartData = data.map((item) => ({
    name: item.status,
    value: item.totalPayments,
    color: COLORS[item.status as keyof typeof COLORS] || "#94a3b8", // default slate
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      {data.length > 0 ? (
        <PieChart>
          <Pie
            data={chartData}
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
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => [`${value} payments`, "Count"]}
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
            No payment data available
          </p>
        </div>
      )}
    </ResponsiveContainer>
  );
}
