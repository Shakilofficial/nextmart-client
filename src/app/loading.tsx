import { cn } from "@/lib/utils";
import { ShoppingBag } from "lucide-react";

interface LoadingProps {
  message?: string;
  size?: "small" | "medium" | "large";
  showProgress?: boolean;
}

const Loading = ({
  message = "Please wait while we prepare your content...",
  size = "medium",
  showProgress = true,
}: LoadingProps) => {
  const sizeClasses = {
    small: {
      container: "min-h-[30vh]",
      wrapper: "w-20 h-20",
      icon: "h-8 w-8",
      title: "text-lg",
      progressWidth: "w-36",
    },
    medium: {
      container: "min-h-[50vh]",
      wrapper: "w-28 h-28",
      icon: "h-10 w-10",
      title: "text-2xl",
      progressWidth: "w-48",
    },
    large: {
      container: "min-h-[70vh]",
      wrapper: "w-36 h-36",
      icon: "h-12 w-12",
      title: "text-3xl",
      progressWidth: "w-64",
    },
  };

  return (
    <div
      className={`flex flex-col items-center justify-center w-full ${sizeClasses[size].container}`}
    >
      <div className="relative">
        <div className="absolute -inset-8 bg-primary/5 rounded-full blur-3xl" />

        <div className={cn("relative", sizeClasses[size].wrapper)}>
          <div className="absolute inset-0 rounded-full border-4 border-primary/10 animate-[spin_8s_linear_infinite]" />

          <div className="absolute inset-[15%] rounded-full bg-gradient-to-tr from-primary/20 via-primary/10 to-transparent animate-[pulse_3s_ease-in-out_infinite]" />

          <div className="absolute inset-[10%] rounded-full border-2 border-dashed border-primary/30 animate-[spin_12s_linear_infinite_reverse]" />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 flex items-center justify-center animate-[fadeIn_0.5s_ease-out]">
                <div className="relative">
                  <ShoppingBag
                    className={cn(
                      "text-primary/80 absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2",
                      sizeClasses[size].icon
                    )}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 h-3 w-3 bg-primary rounded-full animate-[orbit_3s_linear_infinite]" />
        </div>
      </div>

      <div className="mt-10 space-y-3 text-center max-w-sm">
        <h3
          className={cn(
            sizeClasses[size].title,
            "font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
          )}
        >
          Just a moment
        </h3>
        <p className="text-muted-foreground">{message || "Loading..."}</p>
      </div>

      {showProgress && (
        <div className="mt-10 flex justify-center">
          <div
            className={cn(
              "h-1.5 bg-muted rounded-full overflow-hidden",
              sizeClasses[size].progressWidth
            )}
          >
            <div className="h-full bg-gradient-to-r from-primary/60 via-primary to-primary/60 rounded-full animate-shimmer" />
          </div>
        </div>
      )}

      <div className="mt-4 flex items-center justify-center gap-1.5">
        <div
          className="h-1.5 w-1.5 rounded-full bg-primary animate-[bounce_1.4s_ease-in-out_infinite]"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="h-1.5 w-1.5 rounded-full bg-primary animate-[bounce_1.4s_ease-in-out_infinite]"
          style={{ animationDelay: "0.2s" }}
        />
        <div
          className="h-1.5 w-1.5 rounded-full bg-primary animate-[bounce_1.4s_ease-in-out_infinite]"
          style={{ animationDelay: "0.4s" }}
        />
      </div>
    </div>
  );
};

export default Loading;
