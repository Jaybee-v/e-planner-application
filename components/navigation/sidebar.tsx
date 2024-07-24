import { AuthM } from "@/models/Auth";
import React from "react";

interface Props {
  session: AuthM | null;
}

export const Sidebar = ({ session }: Props) => {
  if (!session) return null;

  if (session.role === "user") return null;

  return (
    <div className="max-lg:hidden sticky bg-white w-[15vw] shadow">Sidebar</div>
  );
};
