"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/UserContext";

const HomePage = () => {
  const user = useUser();
  console.log(user);
  return (
    <div>
      <h1>Welcome to the HomePage of Nexa</h1>
      <Button>Click me</Button>
    </div>
  );
};

export default HomePage;
