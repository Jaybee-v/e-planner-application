import { OrganizationChoice } from "@/components/form/organization-choice";
import { RiderForm } from "@/components/form/rider-form";
import { MiniStableCard } from "@/components/stable/mini-stable-card";
import { AuthM } from "@/models/Auth";
import { RiderDataM, RiderM } from "@/models/Rider";
import { RiderAndStableM } from "@/models/Stable";
import AuthService from "@/services/auth.service";
import OrganizationService from "@/services/organization.service";
import RiderService from "@/services/rider.service";
import React from "react";

const getData = async (): Promise<RiderDataM | string | null> => {
  const session: AuthM | null = await new AuthService().getSession();

  console.log(session);
  if (session && session.role !== "user") return null;

  if (!session) return null;

  const request = await new RiderService().getRider(session.sub);
  console.log(request);

  if (request.status === "success") {
    console.log(request);

    const rider: RiderM = request.data;
    console.log(rider);
    const requestOrganizations = await new OrganizationService().findByRiderId(
      session.sub
    );
    console.log(requestOrganizations);
    const stables: RiderAndStableM[] = requestOrganizations.data;
    return { rider: rider, stable: stables };
  }
  console.log(session);

  return session.sub as string;
};

export default async function RiderHome() {
  const rider: RiderDataM | string | null = await getData();

  if (rider === null) return null;

  console.log(typeof rider);

  if (typeof rider === "string")
    return (
      <div className="w-full max-w-2xl">
        <h1>Encore une étape à franchir !</h1>
        <p>Complétez avec vos informations personnelles.</p>
        <RiderForm userID={rider} />
      </div>
    );

  console.log(rider.stable.length);
  return (
    <div className="">
      {rider && rider.stable.length === 0 ? (
        <>
          <OrganizationChoice userID={rider.rider.id} />
        </>
      ) : (
        <section>
          <MiniStableCard stables={rider.stable} />
        </section>
      )}
    </div>
  );
}
