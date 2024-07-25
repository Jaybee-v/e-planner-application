import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { LessonM } from "@/models/Lesson";

interface Props {
  event: LessonM;
}

export const CalendarEvent = ({ event }: Props) => {
  const availablePlaces = event.maxParticipants - event.participants;
  const numberStart = parseInt(event.startTime);
  console.log("Number Start:", numberStart);
  const numberEnd = parseInt(event.endTime);
  const time = numberEnd - numberStart;
  console.log("Time:", time);

  return (
    <Popover>
      <PopoverTrigger>
        <div
          className={`shadow bg-white rounded-xl w-[94%] mx-auto hover:shadow-md transition ${
            time === 1 ? "h-20" : time === 2 ? "h-40" : ""
          }`}
        >
          <article className="">{event ? ` ${event.title}` : ""}</article>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <section>
          {new Date(event.date).toLocaleDateString("fr-FR")}
          <h2 className="text-center">
            {event.startTime} - {event.endTime}
          </h2>

          <p>
            Places disponibles: <span>{availablePlaces}</span>
          </p>
        </section>
      </PopoverContent>
    </Popover>
  );
};
