"use client";

import React, { useState, useEffect } from "react";
import { Nav } from "./ui/nav";
import {

  Clock3,
  LayoutDashboard,
 
  FolderKanban,
  Settings,
  ChevronRight,
  ChevronLeft,
  LogOut,
  CircleUserRound,
} from "lucide-react";
import { Button } from "./ui/button";
import { useAuth } from "@/context/AuthContext";

// Debounced values
import {
 
  useWindowWidth,
 
} from "@react-hook/window-size";
import Link from "next/link";

type Props = {};

//export default function SideNavbar
const SidebarNav: React.FC = ({}: Props) => {
  const { user, logOut } = useAuth();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isTextVisible, setIsTextVisible] = useState(true);

  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768;

  useEffect(() => {
    setIsTextVisible(!mobileWidth);
  }, [mobileWidth]);

  //const [iconRotation, setIconRotation] = useState(0);

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
    //setIconRotation((prevRotation) => (prevRotation === 180 ? 0 : 180));
    setIsTextVisible((prevState) => !prevState);
  }

  const handleSignOut = async () => {
    await logOut();
  };

  const getUserName = (email: any) => {
    if (email) {
      return email.split("@")[0];
    }
    return "";
  };

  return (
    <div className="relative min-w-[80px] border-r px-3 pb10 pt-24">
      {!mobileWidth && (
        <div className="absolute right-[-20px] top-7">
          <Button
            onClick={toggleSidebar}
            variant="secondary"
            className="rounded-full p-2 "
          >
            {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
            {/*<ChevronRight style={{ transform: `rotate(${iconRotation}deg)` }} />*/}
          </Button>
        </div>
      )}

      <Nav
        isCollapsed={mobileWidth ? true : isCollapsed}
        links={[
          {
            title: "Inicio",
            href: "/",
            icon: LayoutDashboard,
            variant: "default",
          },
          {
            title: "Tus proyectos",
            href: "/misProyectos",
            icon: FolderKanban,
            variant: "ghost",
          },
          {
            title: "Próximamente",
            href: "/orders",
            icon: Clock3,
            variant: "ghost",
          },
          {
            title: "Configuración",
            href: "/settings",
            icon: Settings,
            variant: "ghost",
          },
        ]}
      />

     
      <div className="absolute bottom-11 w-full">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "10vh",
          }}
        >
          <CircleUserRound size={32} />
        </div>
        <div className="flex justify-center items-center">
          <div className="text-center">
          {(!mobileWidth && isTextVisible) && (
                <>
                  Bienvenido<br />
                  {getUserName(user.email)}
                </>
              )}
          </div>
        </div>

        <div>
          <Link href="/register">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "10vh",
              }}
            >
              <Button variant="destructive" onClick={handleSignOut}>
                <LogOut />

                <div className={isTextVisible ? "px-6" : ""}>
                  {isTextVisible && "Salir"}
                </div>
              </Button>
            </div>
          </Link>
        </div>
      
      </div>
      {/*mobileWidth ? 'Salir' : null*/}
    </div>
  );
};

export default SidebarNav;
