import { AuthM } from "@/models/Auth";
import Link from "next/link";
import React from "react";

interface Props {
  session: AuthM | null;
}

export const Sidebar = ({ session }: Props) => {
  if (!session) return null;

  if (session.role === "user") return null;

  return (
    <div className="max-lg:hidden sticky bg-white w-[15vw] shadow">
      <nav className="flex flex-col gap-4 py-4 px-8">
        <Link href="/" className="text-lg font-medium">
          Dashboard
        </Link>
        <Link href="/lessons" className="text-lg font-medium">
          Les leçons
        </Link>
        <Link href="/instructors" className="text-lg font-medium">
          Les moniteurs
        </Link>
        <a href="/users" className="text-lg font-medium">
          Les cavaliers
        </a>
      </nav>
    </div>
  );
};
