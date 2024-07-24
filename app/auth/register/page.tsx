import { UserForm } from "@/components/form/user-form";
import Link from "next/link";
import React from "react";

export default function RegisterPage() {
  return (
    <div className="max-w-2xl w-full max-lg:px-4">
      <section className="bg-white py-2 px-4 rounded drop-shadow-md">
        <h1 className="text-center">
          Bienvenue sur{" "}
          <span className="font-black tracking-wide">Equita-planner</span>
        </h1>
        <section>
          <Link
            href="/auth/login"
            className=" cursor-pointer hover:font-medium transition"
          >
            Déjà inscrit ? Connectez-vous
          </Link>
        </section>
        <UserForm />
      </section>
    </div>
  );
}
