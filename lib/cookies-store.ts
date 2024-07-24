"use server";

import { cookies } from "next/headers";

export const getCookieValue = (name: string): string | undefined => {
  const cookie = cookies().get(name);
  return cookie ? cookie.value : undefined;
};

export const setCookie = (name: string, value: string) => {
  if (name === "session") {
    const expires = new Date(Date.now() + 2 * 60 * 60 * 1000);
    cookies().set(name, value, {
      httpOnly: true,
      expires,
    });
  }
  cookies().set(name, value);
};

export const getSession = async () => {
  const cookie = cookies().get("session");
  console.log(cookie);
  return cookie;
};

export const authorizationHeader = () => {
  const session = cookies().get("session");
  const headers = {
    Authorization: session ? `Bearer ${session.value}` : "",
    "Content-Type": "application/json",
  };
  return headers;
};

export const getAuthorizationHeader = () => {
  const session = cookies().get("session");
  return session ? `Bearer ${session.value}` : "";
};

export const disconnect = async () => {
  cookies().delete("session");
};
