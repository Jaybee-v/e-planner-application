import { LoginForm } from "@/components/form/login-form";
import AuthService from "@/services/auth.service";
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
      <LoginForm />
    </div>
  );
}
