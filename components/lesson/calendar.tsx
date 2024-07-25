"use client";
import { days as ListingDays } from "@/lib/dates";
import { LessonM } from "@/models/Lesson";
import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { CalendarEvent } from "./calendar-event";
import { Button } from "../ui/button";
import { getDay, parseISO } from "date-fns";

interface Props {
  events: LessonM[];
}

const groupEventsByDay = (events: LessonM[]) => {
  const daysOfWeek: LessonM[][] = Array.from({ length: 7 }, () => []);

  events.forEach((event) => {
    const eventDate = parseISO(event.date.toString());
    const dayIndex = getDay(eventDate);
    // Ajustement pour que le jour commence par lundi (0 pour lundi, 6 pour dimanche)
    const adjustedDayIndex = (dayIndex + 6) % 7;
    console.log("Adjusted Day Index:", adjustedDayIndex);
    daysOfWeek[adjustedDayIndex].push(event);
  });

  return daysOfWeek;
};

const lang = [
  {
    fr: {
      week: "La semaine",
      work_week: "Semaine de travail",
      day: "Jour",
      month: "Mois",
      previous: "Antérieur",
      next: "Prochain",
      today: `Aujourd'hui`,
      agenda: "Ordre du jour",

      showMore: (total: number) => `+${total} plus`,
    },
  },
];
export const MyCalendar = ({ events }: Props) => {
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const days: { id: number; name: string }[] = ListingDays;
  const daysInMonth = new Date(2024, 7, 0).getDate();

  // Récupération du premier jour du mois (0 = dimanche, 1 = lundi, ...)
  const firstDayOfMonth = new Date("2024-07-01").getDay();

  // Création d'un tableau vide pour représenter les jours du mois
  let calendarDays = Array(daysInMonth + firstDayOfMonth).fill(null);

  // Ajout des événements dans le tableau en fonction de leur date
  events &&
    events.forEach((event) => {
      const eventDate = new Date(event.date);
      const dayIndex = eventDate.getDate() + firstDayOfMonth - 1;
      calendarDays[dayIndex] = event;
    });

  const eventsByDay = groupEventsByDay(events);

  const selectedDay = days.filter((d) => d.id === date?.getDay());
  console.log(selectedDay);

  return (
    <div className="w-full min-h-[20px] bg-white py-4 ">
      <section className="flex max-lg:flex-col-reverse items-center justify-center gap-6">
        <section className="bg-white w-fit rounded-xl mb-6 shadow">
          <Calendar
            mode="single"
            lang="fr"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </section>
        <article className="max-w-md grid gap-2 max-lg:px-4">
          <h4 className="font-semibold">
            Sélectionnez le jour que vous souhaitez visualiser
          </h4>
          <p className="max-lg:hidden">
            Vous pouvez sélectionner un jour <br /> Visualiser entre deux dates
          </p>
          <Button
            type="button"
            onClick={() => setDate(undefined)}
            variant={"outline"}
            className="max-lg:hidden"
          >
            Visualiser la semaine en cours
          </Button>
        </article>
      </section>

      <section className="grid lg:grid-cols-7 bg-gray-100 pt-4">
        {days.map((d, i) => (
          <article key={d.id} className={`text-center font-semibold  `}>
            {d.name}
          </article>
        ))}
      </section>

      <section className="grid lg:grid-cols-7 gap-2 bg-gray-100 py-4">
        {eventsByDay.map((dayEvents, dayIndex) => (
          <div key={dayIndex} className="w-full  grid gap-2">
            {dayEvents.map((event, index) => (
              <CalendarEvent key={index} event={event} />
            ))}
          </div>
        ))}
      </section>
    </div>
  );
};
