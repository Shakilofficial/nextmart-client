"use client";

import { useEffect, useState } from "react";

export const useNewToken = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API}/auth/refresh-token`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization:
                document.cookie
                  .split("; ")
                  .find((row) => row.startsWith("refreshToken="))
                  ?.split("=")[1] || "",
            },
          }
        );
        const data = await res.json();
        setToken(data);
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };

    fetchToken();
  }, []);

  return token;
};
