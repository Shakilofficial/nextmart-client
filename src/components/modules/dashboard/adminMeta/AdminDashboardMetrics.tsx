"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowUpRight,
  Building,
  StoreIcon as BuildingStore,
  CreditCard,
  DollarSign,
  Package,
  ShoppingBag,
  Store,
  Users,
} from "lucide-react"
import { RevenueChart } from "./RevenueChart"
import { PaymentStatusChart } from "./PaymentStatusChart"
import { OrdersChart } from "./OrdersChart"
import { ShopStatusChart } from "./ShopStatusChart"


interface AdminDashboardMetricsProps {
  data: {
    totalShops: number
    totalUsers: number
    totalOrders: number
    totalProducts: number
    totalRevenue: number
    totalPayments: number
    paymentStatusCounts: Array<{
      totalPayments: number
      status: string
    }>
    activeShops: number
    inactiveShops: number
  }
}

export function AdminDashboardMetrics({ data }: AdminDashboardMetricsProps) {
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  // Calculate percentages for stats
  const activeShopsPercentage = Math.round((data.activeShops / (data.activeShops + data.inactiveShops || 1)) * 100)

  const paidPaymentsCount = data.paymentStatusCounts.find((item) => item.status === "Paid")?.totalPayments || 0

  const paidPaymentsPercentage = Math.round((paidPaymentsCount / (data.totalPayments || 1)) * 100)

  // Mock data for charts (since we don't have time-series data)
  const mockRevenueData = [
    { month: "Jan", revenue: data.totalRevenue * 0.4 },
    { month: "Feb", revenue: data.totalRevenue * 0.5 },
    { month: "Mar", revenue: data.totalRevenue * 0.7 },
    { month: "Apr", revenue: data.totalRevenue * 0.6 },
    { month: "May", revenue: data.totalRevenue * 0.8 },
    { month: "Jun", revenue: data.totalRevenue * 0.9 },
    { month: "Jul", revenue: data.totalRevenue },
  ]

  const mockOrdersData = [
    { month: "Jan", orders: Math.round(data.totalOrders * 0.3) },
    { month: "Feb", orders: Math.round(data.totalOrders * 0.4) },
    { month: "Mar", orders: Math.round(data.totalOrders * 0.6) },
    { month: "Apr", orders: Math.round(data.totalOrders * 0.5) },
    { month: "May", orders: Math.round(data.totalOrders * 0.7) },
    { month: "Jun", orders: Math.round(data.totalOrders * 0.8) },
    { month: "Jul", orders: Math.round(data.totalOrders) },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">Overview of your application performance and analytics</p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Revenue */}
        <Card className="border-none shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-rose-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(data.totalRevenue)}</div>
            <div className="mt-1 flex items-center text-xs text-muted-foreground">
              <ArrowUpRight className="mr-1 h-3 w-3 text-rose-500" />
              <span>From {data.totalOrders} orders</span>
            </div>
          </CardContent>
        </Card>

        {/* Total Users */}
        <Card className="border-none shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-rose-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalUsers}</div>
            <div className="mt-1 flex items-center text-xs text-muted-foreground">
              <ArrowUpRight className="mr-1 h-3 w-3 text-rose-500" />
              <span>Active platform users</span>
            </div>
          </CardContent>
        </Card>

        {/* Total Shops */}
        <Card className="border-none shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Shops</CardTitle>
            <Store className="h-4 w-4 text-rose-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalShops}</div>
            <div className="mt-1 flex items-center text-xs text-muted-foreground">
              <ArrowUpRight className="mr-1 h-3 w-3 text-rose-500" />
              <span>{activeShopsPercentage}% active shops</span>
            </div>
          </CardContent>
        </Card>

        {/* Total Products */}
        <Card className="border-none shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-rose-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalProducts}</div>
            <div className="mt-1 flex items-center text-xs text-muted-foreground">
              <ArrowUpRight className="mr-1 h-3 w-3 text-rose-500" />
              <span>Across {data.totalShops} shops</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Total Orders */}
        <Card className="border-none shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-rose-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalOrders}</div>
            <div className="mt-1 flex items-center text-xs text-muted-foreground">
              <span>Average value: {formatCurrency(data.totalRevenue / data.totalOrders)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Total Payments */}
        <Card className="border-none shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Payments</CardTitle>
            <CreditCard className="h-4 w-4 text-rose-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalPayments}</div>
            <div className="mt-1 flex items-center text-xs text-muted-foreground">
              <span>{paidPaymentsPercentage}% payments completed</span>
            </div>
          </CardContent>
        </Card>

        {/* Shop Status */}
        <Card className="border-none shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Shop Status</CardTitle>
            <BuildingStore className="h-4 w-4 text-rose-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.activeShops} Active</div>
            <div className="mt-1 flex items-center text-xs text-muted-foreground">
              <span>{data.inactiveShops} Inactive shops</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-background border">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="shops">Shops</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
                <CardDescription>Monthly revenue performance</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <RevenueChart data={mockRevenueData} />
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle>Payment Status</CardTitle>
                <CardDescription>Distribution of payment statuses</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <PaymentStatusChart data={data.paymentStatusCounts} />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle>Orders Trend</CardTitle>
                <CardDescription>Monthly order volume</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <OrdersChart data={mockOrdersData} />
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle>Shop Status</CardTitle>
                <CardDescription>Active vs Inactive shops</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ShopStatusChart activeShops={data.activeShops} inactiveShops={data.inactiveShops} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Revenue Analysis</CardTitle>
              <CardDescription>Detailed view of revenue performance</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <RevenueChart data={mockRevenueData} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Orders Analysis</CardTitle>
              <CardDescription>Monthly order trends</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <OrdersChart data={mockOrdersData} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shops" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle>Shop Status</CardTitle>
                <CardDescription>Active vs Inactive shops</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ShopStatusChart activeShops={data.activeShops} inactiveShops={data.inactiveShops} />
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle>Shop Performance</CardTitle>
                <CardDescription>
                  Average products per shop: {Math.round(data.totalProducts / data.totalShops)}
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[400px] flex flex-col justify-center items-center">
                <Building className="h-16 w-16 text-rose-500 mb-4" />
                <div className="text-center">
                  <div className="text-2xl font-bold">{data.totalShops} Shops</div>
                  <div className="text-muted-foreground">Managing {data.totalProducts} products</div>
                  <div className="mt-4 text-sm">
                    <div className="flex justify-between mb-2">
                      <span>Active shops:</span>
                      <span className="font-medium">{data.activeShops}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Inactive shops:</span>
                      <span className="font-medium">{data.inactiveShops}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

