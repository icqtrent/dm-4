"use client";

import React from "react";
import Image from "next/image";

interface SecondsectionProps {
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
    alt: "Customizable",
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
    alt: "Customizable",
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
    alt: "Customizable",
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
    alt: "Customizable",
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
    alt: "Customizable",
  },
];

const SecondSection: React.FC<SecondsectionProps> = ({ id }) => {
  return (
    <div id={id} className="">
      <div className=" md:flex-row flex-col items-center flex  justify-center pb-10">
        <div className="p-5 justify-center md:w-1/3">
          <div className=" bg-gradient-to-r  from-blue-800  to-green-300 bg-clip-text text-transparent text-4xl md:text-6xl font-bold pb-10 ">
            ¿Porqué elegirnos?
          </div>
          <div className="text-2xl mb-8">
            Integramos tecnología en nuestros procesos
            para acelerar tu trabajo, con una gran confiabilidad.
          </div>
          <button
            aria-label="Regístrate button"
            className="bg-blue-500 text-white p-4 justify-center flex md:w-1/3 rounded-lg hover:bg-blue-600"
          >
            Regístrate
          </button>
        </div>

        <video className="rounded-xl md:w-2/5 p-4 md:p-0 " autoPlay muted loop>
          <source src="/content/video-2.mp4" type="video/mp4" />
        </video>
      </div>

     
    </div>
  );
};

export default SecondSection;
