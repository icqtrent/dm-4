

"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import Logo from "./logo";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const components: { title: string; description: string }[] = [
  {
    title: "Confección TE1 Express",
    description:
      "Listos en minutos, el + económico, actualizados a la nueva normativa, beneficios adicionales.",
  },
  {
    title: "Confección TE1 estándar",
    description:
      "Listos entre 1 a 4 días, valores en función de las particularidades del plano, actualizados a la nueva normativa, beneficios adicionales.",
  },
  {
    title: "Memorias lumínicas",
    description:
      "Listos entre 1 a 4 días, incluye memoria y reporte lumínico, actualizados a la normativa vigente, beneficios adicionales.",
  },
  {
    title: "Cálculo y cubicación",
    description: "Tiempos establecidos previamente, valores flexibles, actualizados a la normativa vigente, beneficios adicionales.",
  },
  {
    title: "Modelos BIM",
    description:
      "Obtenga sus modelados 3D, Tiempos de entrega a convenir, actualizados a la normativa vigente, beneficios adicionales.",
  },
  {
    title: "Otros",
    description:
      "Consulte por nuestro servicios personalizados, sin compromiso, actualizados a la normativa vigente, beneficios adicionales.",
  },
  {
    title: "Chatbot DM",
    description:
      "Chatbot gratuito enfocado en responder consultas técnicas de electricistas en Chile.",
  },
  {
    title: "Comunidad DM",
    description:
      "Únase a nuestro foro de consultas técnicas gratuitamente, gane puntos y obtenga beneficios .",
  },
];

export function NavigationBar() {
  return (
    <NavigationMenu aria-label="dropdown-menu">
      <NavigationMenuList aria-label="dropdown-menu-list" className="p-6 hidden md:flex md:space-x-3">
        <NavigationMenuItem>
          <NavigationMenuTrigger>¿Que ofrecemos?</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="#secondsectionB"
                    >
                    <Logo />
                    <div className="mb-2 mt-4 text-lg font-medium">
                      DrawingsMachines
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Primer conjunto de herramientas que ofrecen soluciones rápidas para instaladores eléctricos en Chile.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem title="Chatbot DM" href="#secondsectionB">
                Chatbot enfocado en responder consultas técnicas de electricistas en Chile.
              </ListItem>
              <ListItem title="Comunidad DM" href="#secondsectionB">
                Únase a nuestro foro de consultas y gane puntos.
              </ListItem>
              <ListItem title="Planos y estudios" href="#secondsectionB">
                Prueba &quot;Confección TE1 Express&quot; y demás servicios y asesorías.
               
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Servicios</NavigationMenuTrigger>
          <NavigationMenuContent>
            
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components?.map((component) => (
                <ListItem key={component.title} title={component.title} href="#secondsectionB">
                  {component.description}
                </ListItem>
              ))}
            </ul>
            
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              ¿Quienes somos?
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
