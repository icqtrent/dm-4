import { cn } from "@/lib/utils";
import { LucideIcon, Info } from "lucide-react";
import React from "react";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TextWithBreaks from "./TextWithBreaks";
import Link from "next/link";
import { Card as CardPrimitive } from "@/components/ui/card";

export type CardProps = {
  label: string;
  icon: LucideIcon;
  amount: string;
  description: string;
  link: string;
  arrow: LucideIcon;
  info: React.ReactNode;
};



export default function Card(props: CardProps) {
  return (
    <div>
      <CardPrimitive>
        <CardContent>
          <section className="flex justify-between gap-2">
            {/*label*/}

            <p className="text-3x1 font-semibold">{props.label} </p>

            {/*icon*/}

            <props.icon className="h-4 w-4 text-gray-400" />
          </section>
          <section>
            <h2 className="text-sm text-gray-700">{props.amount} </h2>
            <p className="text-xs text-gray-500">{props.description}</p>
            <a href={props.link}></a>
            <div className="flex items-center mt-2">
              <Dialog>
                <DialogTrigger><Info /></DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <div className=" pt-2" />
                    <DialogTitle className="pb-4">{props.label}</DialogTitle>
                    <hr className="border-t-2 border-gray-200 pt-4" />
                    <DialogDescription>
                      {props.info}
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>

              <p className="text-xs text-gray-500 ml-auto">


                <Link href={props.link}><Button size="sm">Acceder</Button></Link></p>

            </div>
          </section>
        </CardContent>
      </CardPrimitive>
    </div>
  );
}

export function CardContent(props: React.HtmlHTMLAttributes<HTMLDivElement>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      storageKey="dashboard-theme"
    >
      <div

        {...props}
        className={cn(
          "flex w-full flex-col gap-3 p-5 shadow",
          props.className
        )}

      />
    </ThemeProvider>
  );
}
