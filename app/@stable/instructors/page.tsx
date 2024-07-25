import { AddBtn } from "@/components/button/add-btn";
import { InstructorListing } from "@/components/stable/instructor-listing";
import { InstructorM } from "@/models/Instructor";
import AuthService from "@/services/auth.service";
import InstructorService from "@/services/instructor.service";
import { Cross } from "lucide-react";
import Link from "next/link";
import React from "react";

const getData = async () => {
  const session = await new AuthService().getSession();
  console.log(session);
  const request = await new InstructorService().findByStableId(session.sub);
  console.log(request);
  return request.data as InstructorM[];
};

export default async function StableInstructorPage() {
  const instructors = await getData();
  return (
    <div>
      <article className="flex flex-col justify-center items-center gap-6 py-4">
        <h1 className="text-center">Gestion des Moniteurs</h1>
        <AddBtn url="/instructors/create" label="Ajouter un moniteur" />
      </article>
      <section className="bg-white rounded drop-shadow-md min-h-[40vh] p-6">
        {instructors.length === 0 ? (
          <article>
            <p className="text-center text-lg text-orange-400">
              Aucun moniteur enregistré
            </p>
            <AddBtn url="/instructors/create" label="Ajouter un moniteur" />
          </article>
        ) : (
          <InstructorListing receivedInstructors={instructors} />
        )}
      </section>
    </div>
  );
}
