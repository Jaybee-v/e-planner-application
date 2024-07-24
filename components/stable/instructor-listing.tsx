"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { InstructorM } from "@/models/Instructor";
import { CalendarPlus, Edit, Hammer, Phone } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

interface Props {
  receivedInstructors: InstructorM[];
}

export const InstructorListing = ({ receivedInstructors }: Props) => {
  const router = useRouter();
  const [instructors, setInstructors] =
    React.useState<InstructorM[]>(receivedInstructors);
  return (
    <div className="">
      <Table className=" ">
        <TableHeader>
          <TableRow>
            {/* <TableHead>Nom</TableHead> */}
            <TableHead>Prénom</TableHead>
            <TableHead className="">
              <Phone size={24} className="text-right" />
            </TableHead>
            <TableHead className="w-[150px]">
              <Hammer size={24} className="text-right" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="">
          {instructors.map((instructor) => (
            <TableRow key={"insrtuctor_" + instructor.id}>
              {/* <TableCell>{instructor.lastname}</TableCell> */}
              <TableCell>{instructor.name}</TableCell>
              <TableCell>{instructor.phone}</TableCell>
              <TableCell className="w-[150px]">
                <section className="flex max-lg:flex-col justify-center gap-2">
                  <Button
                    className="bg-green-600 hover:bg-green-600/80"
                    type="button"
                  >
                    <CalendarPlus />
                  </Button>
                  <Button
                    type="button"
                    variant={"outline"}
                    onClick={() =>
                      router.push(
                        "/instructors/create?instructor=" + instructor.id
                      )
                    }
                    className="border-orange-400 text-orange-400 hover:text-white hover:bg-orange-400"
                  >
                    <Edit />
                  </Button>
                </section>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
