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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { FaUserGear } from "react-icons/fa6";
import { AuthM } from "@/models/Auth";

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
        <section className="bg-white p-4 drop-shadow rounded-md">
          <h2 className="text-center font-bold text-lg">
            Des cavaliers attendent votre approbation
          </h2>
          <p className="text-gray-600 py-2">
            Voici la liste des cavaliers en attente de validation pour rejoindre
            votre club. En tant qu&apos;administrateur, vous avez la possibilité
            de valider ou refuser leur inscription. <br /> Veuillez examiner
            chaque demande attentivement, car votre décision aura un impact
            direct sur leur accès aux services et activités de votre centre
            équestre.
          </p>
          <Table className="border">
            <TableHeader>
              <TableRow>
                <TableHead className="">Nom - Prénom</TableHead>
                <TableHead>Niveau</TableHead>

                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {waitingForValidation.map((rider) => (
                <TableRow
                  className=" cursor-default w-full "
                  key={`rider_waiting_${rider.id}`}
                >
                  <TableCell className="font-medium">
                    {rider.lastname} {rider.name}
                  </TableCell>
                  <TableCell>
                    {rider.level > 0 ? `Galop  ${rider.level}` : "Débutant"}
                  </TableCell>

                  <TableCell className="text-right">
                    {" "}
                    <AlertDialog>
                      <AlertDialogTrigger className="border p-4 border-primary rounded text-primary hover:bg-primary/40 group hover:text-white hover:border-primary/40">
                        <FaUserGear className="h-5 w-5 group-hover:scale-110" />
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            {rider.name} fait-il parti de vos cavaliers ?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Vous êtes sur le point de valider ou refuser
                            l&apos;adhésion de {rider.name} à votre club. <br />{" "}
                            Une fois cette action effectuée, le cavalier sera
                            soit ajouté à la liste de vos membres, soit son
                            inscription sera refusée. <br />
                            <span className="font-bold">
                              Assurez-vous de prendre la bonne décision, car
                              celle-ci ne pourra pas être modifiée par la suite.
                            </span>
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Annuler</AlertDialogCancel>
                          <AlertDialogAction className="bg-red-500 hover:bg-red-400">
                            Refuser
                          </AlertDialogAction>
                          <AlertDialogAction>Accepter</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
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
