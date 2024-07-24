import { AuthM } from "@/models/Auth";
import Link from "next/link";
import React from "react";
import { LogoutBtn } from "../button/logout-btn";
import { MobileNavbar } from "./mobile-navbar";
import { Logo } from "../ui/logo";
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
