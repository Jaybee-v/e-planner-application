import { LogoutBtn } from "@/components/button/logout-btn";
import { RiderForm } from "@/components/form/rider-form";
import { AuthM } from "@/models/Auth";
import { RiderM } from "@/models/Rider";
import AuthService from "@/services/auth.service";
import RiderService from "@/services/rider.service";
import React from "react";

const getData = async (): Promise<RiderM | string | null> => {
  const session: AuthM = await new AuthService().getSession();

  console.log(session);
  if (session.role !== "user") return null;

  const request = await new RiderService().getRider(session.sub);
  console.log(request);

  if (request.status === "success") {
    console.log(request);

    const rider = request.data;
    console.log(rider);
    return rider as RiderM;
  }
  console.log(session);

  return session.sub as string;
};

export default async function RiderHome() {
  const rider: RiderM | string | null = await getData();

  if (rider === null) return null;

  console.log(typeof rider);
  console.log(rider);

  if (typeof rider === "string")
    return (
      <div className="w-full max-w-2xl">
        <h1>Encore une étape à franchir !</h1>
        <p>Complétez avec vos informations personnelles.</p>
        <RiderForm userID={rider} />
      </div>
    );

  return (
    <div className="text-white">
      <section>
        <LogoutBtn />
      </section>
      {JSON.stringify(rider)}
    </div>
  );
}
