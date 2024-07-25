import { AuthM } from "@/models/Auth";
import React from "react";
import { MobileNavbar } from "./mobile-navbar";
import { DesktopNavbar } from "./desktop-navbar";

interface Props {
  session: AuthM | null;
}

export const Navbar = ({ session }: Props) => {
  return (
    <div className="w-full bg-white">
      <DesktopNavbar session={session} />
      <MobileNavbar session={session} />
    </div>
  );
};
