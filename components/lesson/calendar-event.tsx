import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { LessonM } from "@/models/Lesson";

interface Props {
  event: LessonM;
}

export const CalendarEvent = ({ event }: Props) => {
  const availablePlaces = event.maxParticipants - event.participants;
  return (
    <Popover>
      <PopoverTrigger>
        <div className="border border-gray-600 w-full">
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
