"use client";
import { InstructorM } from "@/models/Instructor";
import InstructorService from "@/services/instructor.service";
import React, { useEffect } from "react";
import { Label } from "../ui/label";

interface Props {
  userID: string;
}

export const CalendarLegend = ({ userID }: Props) => {
  const [instructors, setInstructors] = React.useState<InstructorM[]>([]);

  useEffect(() => {
    const getData = async () => {
      const request = await new InstructorService().findByStableId(userID);
      if (request.status === "success") {
        setInstructors(request.data);
      }
    };
    getData();
  }, [userID]);

  return (
    <div className="border max-w-sm w-full grid gap-3 p-4 rounded-lg drop-shadow-md">
      <Label>Legende du calendrier</Label>
      {instructors.map((instructor) => (
        <article
          key={"instructor_legend_" + instructor.id}
          className="flex items-center justify-center max-w-sm w-full "
        >
          <p className="font-semibold h-8 tracking-wide text-center w-2/3">
            {instructor.name}
          </p>
          <div
            className={`${
              instructor.color === "default"
                ? "bg-white"
                : `${instructor.color} bg-opacity-30`
            } h-8 w-8 rounded-full inline-block`}
          ></div>
        </article>
      ))}
    </div>
  );
};
