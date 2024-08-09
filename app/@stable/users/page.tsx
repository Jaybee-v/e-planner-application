import AuthService from "@/services/auth.service";
import OrganizationService from "@/services/organization.service";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RiderForOrganisationM } from "@/models/Rider";

import { AuthM } from "@/models/Auth";
import { RiderWaitingList } from "@/components/stable/rider-waiting-list";

const getData = async (): Promise<{
  session: AuthM;
  dataset: {
    waitingList: RiderForOrganisationM[];
    riders: RiderForOrganisationM[];
  };
} | null> => {
  const session = await new AuthService().getSession();
  if (!session) {
    return null;
  }
  const response = await new OrganizationService().findByStableId(session.sub);

  return { session, dataset: response.data };
};

export default async function UsersStablePage() {
  const data = await getData();
  if (!data) return null;
  const waitingForValidation: RiderForOrganisationM[] =
    data.dataset.waitingList;
  const riders: RiderForOrganisationM[] = data.dataset.riders;

  return (
    <div>
      <section className="grid lg:grid-cols-2 gap-6">
        <section className="bg-white p-4 drop-shadow rounded-md">
          <h2 className="text-center font-bold text-lg">Vos cavaliers</h2>
          <Table className="border">
            <TableHeader>
              <TableRow>
                <TableHead className="">Nom - Prénom</TableHead>
                <TableHead>Niveau</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {riders.map((rider) => (
                <TableRow key={`rider_valid_${rider.id}`}>
                  <TableCell className="font-medium">
                    {rider.lastname} {rider.name}
                  </TableCell>
                  <TableCell>
                    {rider.level > 0 ? `Galop  ${rider.level}` : "Débutant"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
        <RiderWaitingList
          riders={waitingForValidation}
          userID={data.session.sub}
        />
      </section>
    </div>
  );
}
