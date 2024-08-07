import { AddBtn } from "@/components/button/add-btn";
import { MyCalendar } from "@/components/lesson/calendar";
import { LessonM, LessonTableM } from "@/models/Lesson";
import AuthService from "@/services/auth.service";
import LessonService from "@/services/lesson.service";
import React from "react";

const getData = async (): Promise<{
  events: LessonTableM[];
  userID: string;
}> => {
  const session = await new AuthService().getSession();

  const userID = session?.sub;

  console.log(userID);
  const today = new Date().toString();
  const request = await new LessonService().findByHostId(userID, today);
  console.log(request);

  return { events: request.data, userID: userID };
};

export default async function LessonsStablePage() {
  const { events, userID } = await getData();

  console.log(events);

  return (
    <div>
      <article className="flex flex-col justify-center items-center gap-6 py-4">
        <h1>Gérer vos leçons</h1>
        <AddBtn url="/lessons/create" label="Créer une leçon" />
      </article>
      {events ? <MyCalendar events={events} userID={userID} /> : null}
    </div>
  );
}
