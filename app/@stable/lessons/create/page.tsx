import { LessonForm } from "@/components/form/lesson-form";
import AuthService from "@/services/auth.service";
import React from "react";

const getData = async (): Promise<string> => {
  const session = await new AuthService().getSession();
  const hostID = session?.sub;
  console.log(session);

  return hostID as string;
};

export default async function CreateLessonStablePage() {
  const hostID = await getData();
  console.log("Host ID:", hostID);

  return (
    <div className="max-w-xl w-full mx-auto bg-white mt-6 p-4 rounded drop-shadow-md">
      <LessonForm hostID={hostID} />
    </div>
  );
}
