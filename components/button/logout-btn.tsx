"use client";
import { disconnect } from "@/lib/cookies-store";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import { PowerOff } from "lucide-react";

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
        <Button
          variant={"destructiveOutline"}
          className=" items-center gap-2"
          type="submit"
          size={"xs"}
        >
          <PowerOff size={15} />
          Se déconnecter
        </Button>
      </form>
    </div>
  );
};
