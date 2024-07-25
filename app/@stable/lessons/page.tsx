import { AddBtn } from "@/components/button/add-btn";
import { MyCalendar } from "@/components/lesson/calendar";
import { LessonM } from "@/models/Lesson";
import AuthService from "@/services/auth.service";
import LessonService from "@/services/lesson.service";
import React from "react";

const getData = async (): Promise<LessonM[]> => {
  const session = await new AuthService().getSession();
  const userID = session?.sub;
  console.log(userID);
  const request = await new LessonService().findByHostId(userID);
  console.log(request);

  return request.data;
};

export default async function LessonsStablePage() {
  const events = await getData();

  console.log(events);

  return (
    <div>
      <article className="flex flex-col justify-center items-center gap-6 py-4">
        <h1>Gérer vos leçons</h1>
        <AddBtn url="/lessons/create" label="Créer une leçon" />
      </article>
      {events ? <MyCalendar events={events} /> : null}
    </div>
  );
}
