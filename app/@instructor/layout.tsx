import { AuthM } from "@/models/Auth";
import AuthService from "@/services/auth.service";
import React from "react";

const getData = async (): Promise<AuthM | null> => {
  const session = await new AuthService().getSession();
  console.log(session);

  return session && session.role === "instructor" ? session : null;
};

export default async function StableLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getData();
  if (!session || session.role !== "instructor") return <div>OK</div>;

  return <div>{children}</div>;
}
