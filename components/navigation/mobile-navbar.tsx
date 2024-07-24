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

interface Props {
  session: AuthM | null;
}

export const MobileNavbar = ({ session }: Props) => {
  const router = useRouter();
  return (
    <div className="lg:hidden flex items-center justify-between h-16 px-8 bg-white sticky top-0">
      <Link href="/">
        <span>Equita-planner</span>
      </Link>
      <Drawer>
        <DrawerTrigger>
          <Menu color="black" size={30} />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
            {session ? (
              <DrawerClose>
                <LogoutBtn />
              </DrawerClose>
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
