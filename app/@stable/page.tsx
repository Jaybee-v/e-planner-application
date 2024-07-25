import { FirstLoginStableForm } from "@/components/form/first-login-stable-form";
import { AuthM } from "@/models/Auth";
import { StableM } from "@/models/Stable";
import AuthService from "@/services/auth.service";
import StableService from "@/services/stable.service";
import React from "react";

const getData = async (): Promise<StableM | string | null> => {
  const session: AuthM | null = await new AuthService().getSession();
  console.log(session);

  if (session && session.role !== "stable") return null;

  if (!session) return null;

  const request = await new StableService().findStableById(session.sub);
  console.log(request);

  if (request.status === "success") {
    const stable = request.data;
    return stable as StableM;
  } else {
    return session.sub as string;
  }
};

export default async function StableHome() {
  const stable = await getData();

  if (typeof stable === "string") {
    return <FirstLoginStableForm userID={stable} />;
  }

  return <div className="">StableHome</div>;
}
