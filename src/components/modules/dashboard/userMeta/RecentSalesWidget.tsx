"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

interface RecentSalesWidgetProps {
  data: Array<{ totalSales: number; date: string }>;
  isLoading?: boolean;
}

export function RecentSalesWidget({
  data,
  isLoading = false,
}: RecentSalesWidgetProps) {
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const recentSales = data
    .slice(-5)
    .map((item, index) => {
      const names = [
        "Alex Thompson",
        "Sophia Chen",
        "Marcus Johnson",
        "Olivia Rodriguez",
        "Ethan Williams",
        "Isabella Kim",
        "Noah Garcia",
        "Emma Davis",
      ];

      const randomName = names[Math.floor(Math.random() * names.length)];
      const initials = randomName
        .split(" ")
        .map((n) => n[0])
        .join("");

      return {
        id: index,
        name: randomName,
        initials,
        email: `${randomName.toLowerCase().replace(" ", ".")}@example.com`,
        amount: item.totalSales,
        date: new Date(item.date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      };
    })
    .reverse(); // Show most recent first

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[150px]" />
              <Skeleton className="h-4 w-[100px]" />
            </div>
            <Skeleton className="ml-auto h-4 w-[80px]" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {recentSales.map((sale) => (
        <div key={sale.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-primary/10 text-primary">
              {sale.initials}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium">{sale.name}</p>
            <p className="text-xs text-muted-foreground">{sale.email}</p>
          </div>
          <div className="ml-auto text-sm font-medium">
            {formatCurrency(sale.amount)}
          </div>
        </div>
      ))}
    </div>
  );
}
