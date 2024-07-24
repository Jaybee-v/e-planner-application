"use client";
import React from "react";
import { Logo } from "../ui/logo";
import { AuthM } from "@/models/Auth";
import Link from "next/link";
import { LogoutBtn } from "../button/logout-btn";
import { usePathname } from "next/navigation";

interface Props {
  session: AuthM | null;
}

export const DesktopNavbar = ({ session }: Props) => {
  const path = usePathname();
  return (
    <section className="flex max-lg:hidden justify-between px-12 items-center h-20 sticky top-0 w-full">
      <Logo />
      {session ? (
        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className={`h-6 rounded-xl px-2 hover:text-primary ${
              path === "/" ? "text-primary font-medium" : ""
            } transition`}
          >
            Mon espace
          </Link>
          <Link
            href="/lessons"
            className={`h-6 rounded-xl px-2 hover:text-primary ${
              path === "/lessons" ? "text-primary font-medium" : ""
            } transition`}
          >
            Mes leçons
          </Link>
          <Link
            href="/instructors"
            className={`h-6 rounded-xl px-2 hover:text-primary ${
              path === "/instructors" ? "text-primary font-medium" : ""
            } transition`}
          >
            Mes moniteurs
          </Link>
          <LogoutBtn />
        </nav>
      ) : (
        <nav className="flex gap-6">
          <Link href="/auth/register">S&apos;inscrire</Link>
          <Link href="/auth/login">Se connecter</Link>
        </nav>
      )}
    </section>
  );
};
