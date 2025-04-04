"use client"

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface RevenueChartProps {
  data: Array<{
    month: string
    revenue: number
  }>
}

export function RevenueChart({ data }: RevenueChartProps) {
  // Format currency for tooltip
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="month" tick={{ fontSize: 12 }} tickLine={false} axisLine={{ stroke: "hsl(var(--border))" }} />
        <YAxis
          tickFormatter={(value) => `${value / 1000}k`}
          tick={{ fontSize: 12 }}
          tickLine={false}
          axisLine={{ stroke: "hsl(var(--border))" }}
        />
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
        <Tooltip
          formatter={(value: number) => [formatCurrency(value), "Revenue"]}
          contentStyle={{
            backgroundColor: "hsl(var(--background))",
            borderColor: "hsl(var(--border))",
            borderRadius: "0.5rem",
            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
          }}
        />
        <Area type="monotone" dataKey="revenue" stroke="#f43f5e" fillOpacity={1} fill="url(#colorRevenue)" />
      </AreaChart>
    </ResponsiveContainer>
  )
}

