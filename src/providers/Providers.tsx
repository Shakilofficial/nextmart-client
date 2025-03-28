"use client";

import UserProvider from "@/contexts/UserContext";
import { Toaster } from "sonner";
import StoreProvider from "./StoreProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <UserProvider>
        <Toaster richColors position="top-center" duration={3000} />
        {children}
      </UserProvider>
    </StoreProvider>
  );
};

export default Providers;
