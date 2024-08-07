import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { LessonM, LessonTableM } from "@/models/Lesson";

interface Props {
  event: LessonTableM;
}

export const CalendarEvent = ({ event }: Props) => {
  console.log("Event:", event.instructor.color);

  return (
    <Popover>
      <PopoverTrigger>
        <div
          className={`shadow  ${
            event.instructor.color === "default"
              ? "bg-white"
              : ` ${event.instructor.color}  bg-opacity-30`
          } rounded-xl w-full mx-auto p-4 flex flex-col justify-evenly hover:shadow-md transition h-40`}
        >
          <article className="font-black tracking-wider">
            {event ? ` ${event.type}` : ""}
          </article>
          <p>
            {event.startTime} - {event.endTime}
          </p>
          <p className="text-right text-sm">
            Places :{" "}
            {event.maxParticipants - event.participantsIdentity.length > 1
              ? event.maxParticipants -
                event.participantsIdentity.length +
                " libres"
              : event.maxParticipants - event.participantsIdentity.length === 1
              ? event.maxParticipants -
                event.participantsIdentity.length +
                " libre"
              : "Plein"}
          </p>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <section>
          {new Date(event.date).toLocaleDateString("fr-FR")}
          <h2 className="text-center">
            {event.startTime} - {event.endTime}
          </h2>
          <section>
            {event.participantsIdentity.length > 0 ? (
              <div>
                {event.participantsIdentity.map((participant, index) => (
                  <article key={`participant_${event.hostId}_${index}`}>
                    {participant.name}
                  </article>
                ))}
              </div>
            ) : (
              <article>Aucun participant inscrit</article>
            )}
          </section>
        </section>
      </PopoverContent>
    </Popover>
  );
};
