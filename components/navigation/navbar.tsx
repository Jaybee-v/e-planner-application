import { AuthM } from "@/models/Auth";
import Link from "next/link";
import React from "react";
import { LogoutBtn } from "../button/logout-btn";
import { MobileNavbar } from "./mobile-navbar";
import { Logo } from "../ui/logo";

interface Props {
  session: AuthM | null;
}

export const Navbar = ({ session }: Props) => {
  return (
    <div className="w-full bg-white">
      <section className="flex max-lg:hidden justify-between px-12 items-center h-20 sticky top-0 w-full">
        <Logo />
        {session ? (
          <nav>
            <Link href={`/${session.role}`}>Mon espace</Link>
            <LogoutBtn />
          </nav>
        ) : (
          <nav className="flex gap-6">
            <Link href="/auth/register">S&apos;inscrire</Link>
            <Link href="/auth/login">Se connecter</Link>
          </nav>
        )}
      </section>
      <MobileNavbar session={session} />
    </div>
  );
};
