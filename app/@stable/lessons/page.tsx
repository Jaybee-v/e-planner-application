import { AddBtn } from "@/components/button/add-btn";
import { MyCalendar } from "@/components/lesson/calendar";
import { LessonM } from "@/models/Lesson";
import React from "react";

const EVENTS: LessonM[] = [
  {
    id: "82d0f8f6-8555-4e80-ae5d-b2b448841ee6",
    hostId: "9cb58c30-723c-4f08-8460-747a9abcd429",
    title: "Equestrian Lesson",
    type: "Group",
    description: "A lesson to improve riding skills.",
    date: new Date("2024-07-14T23:49:02.415157"),
    instructorId: "d7373933-c573-4b72-a83c-7c6135165ce7",
    maxParticipants: 10,
    startTime: "2024-07-14T10:00:00",
    endTime: "2024-07-14T12:00:00",
    levelRequired: 1,
    createdAt: new Date("2024-07-24T23:49:02.415189"),
    updatedAt: new Date("2024-07-24T23:49:02.415193"),
  },
  // More events with same structure and same hostId, but between today and the 14 july and today and the 30 july please generate
  // 1 event per day
  {
    id: "82d0f8f6-8555-4e80-ae5d-b2b448841ee7",
    hostId: "9cb58c30-723c-4f08-8460-747a9abcd429",
    title: "Equestrian Lesson",
    type: "Group",
    description: "A lesson to improve riding skills.",
    date: new Date("2024-07-15T23:49:02.415157"),
    instructorId: "d7373933-c573-4b72-a83c-7c6135165ce7",
    maxParticipants: 10,
    startTime: "2024-07-15T10:00:00",
    endTime: "2024-07-15T12:00:00",
    levelRequired: 1,
    createdAt: new Date("2024-07-24T23:49:02.415189"),
    updatedAt: new Date("2024-07-24T23:49:02.415193"),
  },
  {
    id: "82d0f8f6-8555-4e80-ae5d-b2b448841ee8",
    hostId: "9cb58c30-723c-4f08-8460-747a9abcd429",
    title: "Equestrian Lesson",
    type: "Group",
    description: "A lesson to improve riding skills.",
    date: new Date("2024-07-16T23:49:02.415157"),
    instructorId: "d7373933-c573-4b72-a83c-7c6135165ce7",
    maxParticipants: 10,
    startTime: "2024-07-16T10:00:00",
    endTime: "2024-07-16T12:00:00",
    levelRequired: 1,
    createdAt: new Date("2024-07-24T23:49:02.415189"),
    updatedAt: new Date("2024-07-24T23:49:02.415193"),
  },
  {
    id: "82d0f8f6-8555-4e80-ae5d-b2b448841ee9",
    hostId: "9cb58c30-723c-4f08-8460-747a9abcd429", // Same hostId
    title: "Equestrian Lesson",
    type: "Group",
    description: "A lesson to improve riding skills.",
    date: new Date("2024-07-17T23:49:02.415157"),
    instructorId: "d7373933-c573-4b72-a83c-7c6135165ce7",
    maxParticipants: 10,
    startTime: "2024-07-17T10:00:00",
    endTime: "2024-07-17T12:00:00",
    levelRequired: 1,
    createdAt: new Date("2024-07-24T23:49:02.415189"),
    updatedAt: new Date("2024-07-24T23:49:02.415193"),
  },
  {
    id: "82d0f8f6-8555-4e80-ae5d-b2b448841ee9",
    hostId: "9cb58c30-723c-4f08-8460-747a9abcd429", // Same hostId
    title: "Equestrian Lesson",
    type: "Group",
    description: "A lesson to improve riding skills.",
    date: new Date("2024-07-18T23:49:02.415157"),
    instructorId: "d7373933-c573-4b72-a83c-7c6135165ce7",
    maxParticipants: 10,
    startTime: "2024-07-17T10:00:00",
    endTime: "2024-07-17T12:00:00",
    levelRequired: 1,
    createdAt: new Date("2024-07-24T23:49:02.415189"),
    updatedAt: new Date("2024-07-24T23:49:02.415193"),
  },
  {
    id: "82d0f8f6-8555-4e80-ae5d-b2b448841ee9",
    hostId: "9cb58c30-723c-4f08-8460-747a9abcd429", // Same hostId
    title: "Equestrian Lesson",
    type: "Group",
    description: "A lesson to improve riding skills.",
    date: new Date("2024-07-18T16:49:02.415157"),
    instructorId: "d7373933-c573-4b72-a83c-7c6135165ce7",
    maxParticipants: 10,
    startTime: "2024-07-17T10:00:00",
    endTime: "2024-07-17T11:00:00",
    levelRequired: 1,
    createdAt: new Date("2024-07-24T23:49:02.415189"),
    updatedAt: new Date("2024-07-24T23:49:02.415193"),
  },
  {
    id: "82d0f8f6-8555-4e80-ae5d-b2b448841ee9",
    hostId: "9cb58c30-723c-4f08-8460-747a9abcd429", // Same hostId
    title: "Equestrian Lesson",
    type: "Group",
    description: "A lesson to improve riding skills.",
    date: new Date("2024-07-18T21:49:02.415157"),
    instructorId: "d7373933-c573-4b72-a83c-7c6135165ce7",
    maxParticipants: 10,
    startTime: "2024-07-17T11:00:00",
    endTime: "2024-07-17T12:00:00",
    levelRequired: 1,
    createdAt: new Date("2024-07-24T23:49:02.415189"),
    updatedAt: new Date("2024-07-24T23:49:02.415193"),
  },
  // More events with same structure and same hostId, but between today and the 14 july and today and the 30 july please generate
];

export default async function LessonsStablePage() {
  const currentDate = new Date("2024-07-28T21:49:02.415157").getUTCDay();
  console.log(currentDate);

  // const currentDateLessons = EVENTS.filter(
  //   (event) => new Date(event.date).getDate() === currentDate
  // );
  // console.log(currentDateLessons.length);

  return (
    <div>
      <article className="flex flex-col justify-center items-center gap-6 py-4">
        <h1>Gérer vos leçons</h1>
        <AddBtn url="/lessons/create" label="Créer une leçon" />
      </article>
      <MyCalendar events={EVENTS} />
    </div>
  );
}
