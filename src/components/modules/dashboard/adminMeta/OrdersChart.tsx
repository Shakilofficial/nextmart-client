"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface OrdersChartProps {
  data: Array<{
    month: string
    orders: number
  }>
}

export function OrdersChart({ data }: OrdersChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
        <XAxis dataKey="month" tick={{ fontSize: 12 }} tickLine={false} axisLine={{ stroke: "hsl(var(--border))" }} />
        <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={{ stroke: "hsl(var(--border))" }} />
        <Tooltip
          formatter={(value: number) => [`${value} orders`, "Orders"]}
          contentStyle={{
            backgroundColor: "hsl(var(--background))",
            borderColor: "hsl(var(--border))",
            borderRadius: "0.5rem",
            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
          }}
        />
        <Bar dataKey="orders" fill="#f43f5e" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

