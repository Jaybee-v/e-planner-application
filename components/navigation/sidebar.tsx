import { AuthM } from "@/models/Auth";
import { BookCheck, ChartLine, Cross } from "lucide-react";
import Link from "next/link";
import React from "react";
import { LiaHorseHeadSolid } from "react-icons/lia";
import { PiChalkboardTeacherBold } from "react-icons/pi";
interface Props {
  session: AuthM | null;
}

export const Sidebar = ({ session }: Props) => {
  if (!session) return null;

  if (session.role === "user") return null;

  return (
    <div className="max-lg:hidden sticky bg-white w-[15vw] shadow">
      <nav className="flex flex-col gap-4 py-4 px-8">
        <Link href="/" className="text-lg font-medium flex items-center gap-2">
          <ChartLine /> Dashboard
        </Link>
        <Link
          href="/lessons"
          className="text-lg font-medium flex items-center gap-2"
        >
          <BookCheck /> Les leçons
        </Link>
        <section className="ps-4">
          <Link
            href="/lessons/create"
            className="text-sm font-medium flex items-center gap-2"
          >
            <Cross size={15} /> Créer une leçon
          </Link>
        </section>
        <Link
          href="/instructors"
          className="text-lg font-medium flex items-center gap-2"
        >
          <PiChalkboardTeacherBold size={25} />
          Les moniteurs
        </Link>
        <section className="ps-4">
          <Link
            href="/instructors/create"
            className="text-sm font-medium flex items-center gap-2"
          >
            <Cross size={15} /> Ajouter un moniteur
          </Link>
        </section>
        <Link
          href="/users"
          className="text-lg font-medium flex items-center gap-2"
        >
          <LiaHorseHeadSolid size={25} /> Les cavaliers
        </Link>
      </nav>
    </div>
  );
};
