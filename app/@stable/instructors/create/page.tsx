import { InstructorForm } from "@/components/form/instructor-form";
import AuthService from "@/services/auth.service";
import { ArrowLeft, Backpack } from "lucide-react";
import Link from "next/link";
import React from "react";

const getData = async (): Promise<string> => {
  const session = await new AuthService().getSession();
  const userID = session.sub;

  return userID;
};

export default async function CreateInstructorStablePage() {
  const stableID = await getData();
  return (
    <div className="w-full max-w-lg mx-auto bg-white drop-shadow-md p-6 rounded">
      <h1 className="text-center">Gestion des Moniteurs</h1>
      <Link
        className="flex items-center gap-2 border rounded-xl w-fit px-6 hover:bg-slate-50 group transition-all"
        href="/instructors"
      >
        <ArrowLeft className="group-hover:text-orange-400" size={15} /> Retour
        aux moniteurs
      </Link>
      <InstructorForm stableID={stableID} />
    </div>
  );
}
