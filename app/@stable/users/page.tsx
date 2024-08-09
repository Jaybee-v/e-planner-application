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

const getData = async () => {
  const session = await new AuthService().getSession();
  if (!session) {
    return;
  }
  const response = await new OrganizationService().findByStableId(session.sub);

  return response.data;
};

export default async function UsersStablePage() {
  const data = await getData();
  const waitingForValidation: RiderForOrganisationM[] = data.waitingList;
  const riders: RiderForOrganisationM[] = data.riders;

  return (
    <div>
      <section className="grid lg:grid-cols-2 gap-6">
        <section className="bg-white p-4 drop-shadow rounded-md">
          <h2>Vos cavaliers</h2>

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
        <section className="bg-white p-4 drop-shadow rounded-md">
          <h2>Des cavaliers attendent votre approbation</h2>
          <Table className="border">
            <TableHeader>
              <TableRow>
                <TableHead className="">Nom - Prénom</TableHead>
                <TableHead>Niveau</TableHead>
                <TableHead className="text-right">Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {waitingForValidation.map((rider) => (
                <TableRow
                  key={`rider_waiting_${rider.id}`}
                  className="cursor-pointer"
                >
                  <TableCell className="font-medium">
                    {rider.lastname} {rider.name}
                  </TableCell>
                  <TableCell>
                    {rider.level > 0 ? `Galop  ${rider.level}` : "Débutant"}
                  </TableCell>
                  <TableCell className="text-right">
                    <span className="bg-orange-300 rounded-full px-2 py-1">
                      En attente
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      </section>
    </div>
  );
}
