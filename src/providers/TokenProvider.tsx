"use client";

import { useNewToken } from "@/hooks/useNewToken";
import { useEffect } from "react";

const TokenProvider = () => {
  const token = useNewToken();

  useEffect(() => {
    console.log("Token:", token);
  }, [token]);

  return null;
};

export default TokenProvider;
