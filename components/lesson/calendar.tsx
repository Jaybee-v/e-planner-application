"use client";
import { days as ListingDays } from "@/lib/dates";
import { LessonM } from "@/models/Lesson";
import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface Props {
  events: LessonM[];
}

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
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const days: { id: number; name: string }[] = ListingDays;
  const daysInMonth = new Date(2024, 7, 0).getDate();

  // Récupération du premier jour du mois (0 = dimanche, 1 = lundi, ...)
  const firstDayOfMonth = new Date("2024-07-01").getDay();

  // Création d'un tableau vide pour représenter les jours du mois
  const calendarDays = Array(daysInMonth + firstDayOfMonth).fill(null);

  // Ajout des événements dans le tableau en fonction de leur date
  events.forEach((event) => {
    const eventDate = new Date(event.date);
    const dayIndex = eventDate.getDate() + firstDayOfMonth - 1;
    calendarDays[dayIndex] = event;
  });

  const selectedEvents = events.filter(
    (e) => e.date.getDate() === date?.getDate()
  );

  const selectedDay = days.filter((d) => d.id === date?.getDay());
  console.log(selectedDay);

  return (
    <div className="w-full min-h-[20px] ">
      <section className="bg-white w-fit rounded-xl mx-auto mb-6">
        <Calendar
          mode="single"
          lang="fr"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
      </section>
      {!date ? (
        <section className="grid grid-cols-7">
          {days.map((d, i) => (
            <article
              key={d.id}
              className={`text-center  border-gray-600 ${
                i % 2 === 0 ? "border" : "border-b border-t"
              }`}
            >
              {d.name}
            </article>
          ))}
        </section>
      ) : (
        <section className="max-w-md mx-auto">
          <article className={`text-center  border-gray-600 border`}>
            {selectedDay[0].name}
          </article>
        </section>
      )}
      {!date ? (
        <section className="grid grid-cols-7 gap-4">
          {calendarDays.map((event, index) => (
            <article key={index} className="border p-2">
              {event
                ? `${event.date.toLocaleDateString()} - ${event.title}`
                : ""}
            </article>
          ))}
        </section>
      ) : (
        <section className="grid max-w-sm mx-auto gap-4">
          {selectedEvents.map((event, index) => (
            <Popover key={"event_" + event.id}>
              <PopoverTrigger>
                <div className="border border-gray-600">
                  <article className="">
                    {event ? ` ${event.title}` : ""}
                  </article>
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-80"></PopoverContent>
            </Popover>
          ))}
        </section>
      )}
    </div>
  );
};
