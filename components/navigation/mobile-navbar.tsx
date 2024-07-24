"use client";
import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { AuthM } from "@/models/Auth";
import Link from "next/link";
import { Menu } from "lucide-react";
import { LogoutBtn } from "../button/logout-btn";
import { useRouter } from "next/navigation";
import { Logo } from "../ui/logo";

interface Props {
  session: AuthM | null;
}

export const MobileNavbar = ({ session }: Props) => {
  const router = useRouter();
  return (
    <div className="lg:hidden flex items-center justify-between h-16 px-8 bg-white sticky top-0">
      <Logo />
      <Drawer>
        <DrawerTrigger>
          <Menu color="black" size={30} />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerFooter>
            {session ? (
              <>
                <DrawerClose>
                  <Button
                    variant="outline"
                    className="w-3/4 mx-auto"
                    onClick={() => router.push("/")}
                  >
                    Dashboard
                  </Button>
                </DrawerClose>
                <DrawerClose>
                  <Button
                    variant="outline"
                    className="w-3/4 mx-auto"
                    onClick={() => router.push("/lessons")}
                  >
                    Les leçons
                  </Button>
                </DrawerClose>
                <DrawerClose>
                  <Button
                    variant="outline"
                    className="w-3/4 mx-auto"
                    onClick={() => router.push("/instructors")}
                  >
                    Les moniteurs
                  </Button>
                </DrawerClose>
                <DrawerClose>
                  <Button
                    variant="outline"
                    className="w-3/4 mx-auto"
                    onClick={() => router.push("/users")}
                  >
                    Les cavaliers
                  </Button>
                </DrawerClose>
                <DrawerClose>
                  <LogoutBtn />
                </DrawerClose>
              </>
            ) : (
              <DrawerClose>
                <Button
                  variant="outline"
                  onClick={() => router.push("/auth/login")}
                >
                  Se connecter
                </Button>
              </DrawerClose>
            )}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
