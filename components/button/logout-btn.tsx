"use client";
import { disconnect } from "@/lib/cookies-store";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";

export const LogoutBtn = () => {
  const router = useRouter();

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    await disconnect();
    router.push(process.env.NEXT_PUBLIC_LP_URL as string);
  };

  return (
    <div>
      <form onSubmit={(e) => handleLogout(e)}>
        <Button type="submit">Logout</Button>
      </form>
    </div>
  );
};
