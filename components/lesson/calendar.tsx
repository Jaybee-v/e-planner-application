"use client";
import { days as ListingDays } from "@/lib/dates";
import { LessonTableM } from "@/models/Lesson";
import React, { useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { CalendarEvent } from "./calendar-event";
import { Button } from "../ui/button";
import { getDay, parseISO } from "date-fns";
import LessonService from "@/services/lesson.service";
import { CalendarLegend } from "./calendar-legend";

interface Props {
  events: LessonTableM[];
  userID: string;
}

const groupEventsByDay = (events: LessonTableM[]) => {
  const daysOfWeek: LessonTableM[][] = Array.from({ length: 7 }, () => []);

  // need to sort event by date and startTime
  events = events.sort((a, b) => {
    const dateA = parseISO(a.date.toString());
    const dateB = parseISO(b.date.toString());

    if (dateA < dateB) return -1;
    if (dateA > dateB) return 1;

    return 0;
  });

  events.forEach((event) => {
    const eventDate = parseISO(event.date.toString());
    const dayIndex = getDay(eventDate);
    // Ajustement pour que le jour commence par lundi (0 pour lundi, 6 pour dimanche)
    const adjustedDayIndex = (dayIndex + 6) % 7;
    console.log("Adjusted Day Index:", adjustedDayIndex);
    daysOfWeek[adjustedDayIndex].push(event);
  });
  console.log("Days of Week:", daysOfWeek);

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
export const MyCalendar = ({ events, userID }: Props) => {
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const days: { id: number; name: string }[] = ListingDays;
  const daysInMonth = new Date(2024, 7, 0).getDate();

  const [eventsByDay, setEventsByDay] = React.useState<LessonTableM[][]>([]);

  // Récupération du premier jour du mois (0 = dimanche, 1 = lundi, ...)
  const firstDayOfMonth = new Date("2024-07-01").getDay();

  useEffect(() => {
    document.title = `Calendrier - Equita-planner`;
    const getData = async () => {
      if (date) {
        console.log(date);

        const request = await new LessonService().findByHostId(
          userID,
          date.toString()
        );
        console.log(request);
        setEventsByDay(groupEventsByDay(request.data));
      } else {
        setEventsByDay(groupEventsByDay(events));
      }
    };
    getData();
  }, [date, userID, events]);

  // Création d'un tableau vide pour représenter les jours du mois
  let calendarDays = Array(daysInMonth + firstDayOfMonth).fill(null);

  // Ajout des événements dans le tableau en fonction de leur date
  events &&
    events.forEach((event) => {
      const eventDate = new Date(event.date);
      const dayIndex = eventDate.getDate() + firstDayOfMonth - 1;
      calendarDays[dayIndex] = event;
    });

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
            onSelect={(e) => setDate(e)}
            className="rounded-md border bg-white"
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
            onClick={() => setDate(new Date())}
            variant={"outline"}
            className="max-lg:hidden"
          >
            Visualiser la semaine en cours
          </Button>
        </article>
      </section>
      <section className="p-4">
        <CalendarLegend userID={userID} />
      </section>

      <>
        {/* Desktop Header */}
        <section className="lg:grid lg:grid-cols-7 bg-gray-100 pt-4 hidden">
          {days.map((d, i) => (
            <article key={d.id} className="text-center font-semibold">
              {d.name}
            </article>
          ))}
        </section>

        {/* Mobile and Desktop Content */}
        {eventsByDay.some((dayEvents) => dayEvents.length > 0) ? (
          <>
            {/* Mobile View */}
            <section className="lg:hidden bg-gray-100 py-4">
              {eventsByDay.map((dayEvents, dayIndex) => (
                <div key={dayIndex} className="mb-4">
                  <h4 className="text-center font-semibold mb-2">
                    {days[dayIndex].name}
                  </h4>
                  <div className="grid gap-2">
                    {dayEvents.map((event, index) => (
                      <CalendarEvent key={index} event={event} />
                    ))}
                  </div>
                </div>
              ))}
            </section>

            {/* Desktop View */}
            <section className="hidden lg:grid lg:grid-cols-7 gap-2 bg-gray-100 py-4">
              {eventsByDay.map((dayEvents, dayIndex) => (
                <div key={dayIndex} className="w-full grid gap-1">
                  {dayEvents.map((event, index) => (
                    <CalendarEvent key={index} event={event} />
                  ))}
                </div>
              ))}
            </section>
          </>
        ) : (
          <section className="bg-gray-100 py-4 min-h-96 flex justify-center items-center">
            <h5 className="font-semibold text-orange-500 tracking-wide border h-fit border-orange-500 rounded-xl py-2 px-8">
              Vous n&apos;avez aucune leçon ou activité programmée cette semaine
            </h5>
          </section>
        )}
      </>
    </div>
  );
};
