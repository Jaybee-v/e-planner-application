import { AuthM } from "@/models/Auth";
import AuthService from "@/services/auth.service";
import React from "react";

const getData = async (): Promise<AuthM | null> => {
  const session = await new AuthService().getSession();
  console.log(session);

  return session && session.role === "stable" ? session : null;
};

export default async function StableLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getData();
  if (!session || session.role !== "stable") return <div>OK</div>;

  return <div>{children}</div>;
}
