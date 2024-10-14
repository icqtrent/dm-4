"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";





interface SecondsectionBProps {
  id?: string;
}

const features = [
  {
    name: "Confección TE1 Express",
    description: [
      "Listos en minutos",
      "El más económico",
      "Actualizados a la nueva normativa",
      "Beneficios adicionales",
    ],
    image: "/images/icon-cloud.png",
    alt: "Confección TE1 Express",
    color: "blue",
    href: "/register",
  },
  {
    name: "Confección TE1 estándar",
    description:
      [
        "Listos entre 1 a 4 días",
        "Valores en función de las particularidades del plano",
        "Actualizados a la nueva normativa",
        "Beneficios adicionales",
      ],
    image: "/images/icon-fast.png",
    alt: "Confección TE1 estándar",
    href: "/register",
  },
  {
    name: "Reportes y memorias lumínicas",
    description:
      [
        "Listos entre 1 a 4 días",
        "Incluye memoria y reporte lumínico",
        "Actualizados a la nueva normativa",
        "Beneficios adicionales",
      ],
    image: "/images/icon-journey.png",
    alt: "Reportes y memorias lumínicas",
    href: "/register",
  },
  {
    name: "Otros",
    description:
      [
        "Cálculo y cubicación",
        "Modelos BIM",
        "Personalizados",
        "Beneficios adicionales",
      ],
    image: "/images/icon-layer.png",
    alt: "Otros",
    href: "/register",
  },
  {
    name: "Comunidad DM",
    description:
      [
        "Únase a nuestra comunidad y comparta con otros colegas",
        "Gratuito",
        "Libere espacio de su celular y deje de recibir constantes notificaciones consultando en nuestro foro",
        "Beneficios a los usuarios con las respuestas mejor valoradas"

      ],
    image: "/images/icon-location.png",
    alt: "Comunidad DM",
    href: "/register",
  },
  {
    name: "Chatbot DM",
    image: "/images/icon-support-1.png",
    description:
      [
        "Realice sus consultas técnicas",
        "Gratuito",
        "Alto nivel de confiabilidad en las respuestas",
        "Basado en Pliegos Tecnicos RIC y reglamentaciones de distribuidoras",
      ],
    alt: "Chatbot DM",
    href: "/register",
  },
];

const SecondSectionB: React.FC<SecondsectionBProps> = ({ id }) => {
  return (

    <div id={id} className="scroll-mt-20">


      <div className="flex-col items-center justify-center">

        <div className=" text-3xl flex justify-center md:text-5xl font-bold pt-5 pb-10 bg-gradient-to-r  from-purple-400  to-blue-800 bg-clip-text text-transparent">
          Nuestros servicios
        </div>


        <div className="grid grid-cols-1 p-4 md:grid md:grid-cols-3 gap-4 md:px-40">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex-col space-y-6 pb-10 border
                        p-8 rounded-xl items-center justify-center w-full hover:scale-105 transform transition-all duration-500 ease-in-out"
            >
              <div className="text-gray-600 text-3xl font-bold">
                <Image
                  src={feature.image}
                  alt={feature.alt}
                  width={300}
                  height={300}
                  className="object-contain h-20 w-20 items-center justify-center flex mb-10"
                />
                <div>
                  <div className="text-2xl pb-4 bg-gradient-to-t  from-black  to-gray-400 bg-clip-text text-transparent ">
                    {feature.name}
                  </div>

                  <ul className="list-disc list-inside">
                    {feature.description.map((item, index) => (
                      <li key={index} className="text-sm">
                        {item}
                      </li>
                    ))}
                  </ul >
                  <div className="mt-10">
                    <Link href={feature.href}><Button className="absolute bottom-5">Consultar</Button></Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

  );
};

export default SecondSectionB;
