"use client";
import React from "react";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RiderForOrganisationM } from "@/models/Rider";
import OrganizationService from "@/services/organization.service";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";

interface Props {
  riders: RiderForOrganisationM[];
  userID: string;
}

export const RiderWaitingList = ({ riders, userID }: Props) => {
  const router = useRouter();
  const { toast } = useToast();
  const handleSubmit = async (value: number, riderId: string) => {
    const request = await new OrganizationService().updateByStable({
      value,
      riderID: riderId,
      stableID: userID,
    });
    if (request.status === "success") {
      console.log("success");
      toast({
        title: "Cavalier ajouté",
        description: request.message,
      });
      router.refresh();
    } else {
      console.log("error");
      toast({
        title: "Erreur",
        description: request.message,
        variant: "destructive",
      });
    }
  };

  return (
    <section className="bg-white p-4 drop-shadow rounded-md">
      <h2 className="text-center font-bold text-lg">
        Des cavaliers attendent votre approbation
      </h2>
      <p className="text-gray-600 py-2">
        Voici la liste des cavaliers en attente de validation pour rejoindre
        votre club. En tant qu&apos;administrateur, vous avez la possibilité de
        valider ou refuser leur inscription. <br /> Veuillez examiner chaque
        demande attentivement, car votre décision aura un impact direct sur leur
        accès aux services et activités de votre centre équestre.
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
          {riders.map((rider) => (
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
                        l&apos;adhésion de {rider.name} à votre club. <br /> Une
                        fois cette action effectuée, le cavalier sera soit
                        ajouté à la liste de vos membres, soit son inscription
                        sera refusée. <br />
                        <span className="font-bold">
                          Assurez-vous de prendre la bonne décision, car
                          celle-ci ne pourra pas être modifiée par la suite.
                        </span>
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Annuler</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-red-500 hover:bg-red-400"
                        onClick={() => handleSubmit(-1, rider.id)}
                      >
                        Refuser
                      </AlertDialogAction>
                      <AlertDialogAction
                        onClick={() => handleSubmit(1, rider.id)}
                      >
                        Accepter
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};
