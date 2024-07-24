import { LoginForm } from "@/components/form/login-form";
import AuthService from "@/services/auth.service";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const getData = async () => {
  const user = await new AuthService().getSession();

  return user;
};

export default async function LoginPage() {
  const user = await getData();

  if (user && user.role) {
    redirect("/");
  }

  return (
    <div className="w-full flex justify-center items-center">
      <section className="bg-white w-full flex flex-col justify-center items-center p-4 rounded drop-shadow-md max-w-md">
        <LoginForm />
        <article className="w-full flex flex-col justify-center items-center px-4 mt-4 gap-6">
          <Link
            href="/auth/register"
            className="cursor-pointer text-center hover:font-medium transition w-full border rounded py-1 hover:border-gray-600"
          >
            Pas encore inscrit ? Inscrivez-vous
          </Link>
          <Link
            href="/auth/register?user=Cavalier"
            className="cursor-pointer text-center hover:font-medium transition w-full border rounded py-1 hover:border-gray-600"
          >
            Vous êtes Cavalier ? C&apos;est par ici
          </Link>
          <Link
            href="/auth/register?user=Centre équestre"
            className="cursor-pointer text-center hover:font-medium transition w-full border rounded py-1 hover:border-gray-600"
          >
            Vous gérez des écuries / un centre équestre ? C&apos;est par ici
          </Link>
        </article>
      </section>
    </div>
  );
}
