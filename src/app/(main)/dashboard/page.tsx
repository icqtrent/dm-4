"use client";

import BarChar from "@/components/BarChar";
import Card, { CardContent, CardProps } from "@/components/Card";
import PageTitle from "@/components/PageTitle";

import SalesCard, { SalesProps } from "@/components/SalesCard";



import {
  Users,
  CreditCard,
  Activity,
  NotebookPen,
  SquarePen,
  Lightbulb,
  ChevronRight,
  Info,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useState, useContext  } from "react";


import ProtectedRoute from "@/components/ProtectedRoute";
import { PageWrapper } from "@/components/PageWrapper";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogHeader} from "@/components/ui/dialog";
import { text } from "stream/consumers";
import UserRanking from '@/components/UserRanking';
import QuestionList from '@/components/QuestionList2';
import { AskQuestionForm } from "@/components/AskQuestionForm";
import QuestionListContent from "@/components/QuestionListContent";



//export default function Home() {
const Home: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState(-1);


  const exampleTexts = [
    {
      title: "Confección TE1 Express",
      text: "Consiste en la confección de planos eléctricos con el formato necesario para ser aprobados por la SEC.\r\n\r\
      \nIncluye:\n-Instalaciones de hasta 120m2 con un tope de 8 circuitos.\n\nExcluye:\n-La documentación adicional requerida en caso de instalaciones especiales o locales de reunión de personas.\n-Instalaciones con subalimentadores o multitableros.\n-No considera circuitos con cargas mixtas.\n-No considera la inscripción, la cual debe ser realizada desde la platafoma SEC del instalador solicitante.",
    },
    {
      title: "Confección TE1 Convencional",
      text: "Consiste en la confección de planos eléctricos con el formato necesario para ser aprobados por la SEC.\r\n\r\
      \nIncluye:\n-Todos los planos con las características no cubiertas por TE1 Express.\n\nExcluye:\n-No considera la inscripción, la cual debe ser realizada desde la platafoma SEC del instalador solicitante.",
    },
    {
      title: "Memorias y reportes lumínicos",
      text: "Consiste en la generación de los reportes y memorias lumínicas necesaria para la obtención para TE2 o TE1 de instalaciones especiales.\n\nExcluye:\n-No considera la inscripción, la cual debe ser realizada desde la platafoma SEC del instalador solicitante."
    },
    {
      title: "Otros",
      text: "Cotice la variedad de servicios que ofrecemos, como modelos BIM, cubicaciones, planos con características específicas, modelos mecánicos de tableros, proyecciones MT, etc",
    },
  ];

 
  const textWithBreaks = exampleTexts.map((item, index) => (
    <PageWrapper key={index}> 
    <div key={index}>
      {item.text.split("\n").map((line, index) => (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      ))}
    </div>
    </PageWrapper>
  )
  
  );
 

 /*
const TextWithBreaks: React.FC = () => {
  return (
    <>
      {exampleTexts.map((item, index) => (
        <PageWrapper key={index}> 
          <div key={index}>
            {item.text.split("\n").map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </div>
        </PageWrapper>
      ))}
    </>
  );
};

   */

const cardData: CardProps[] = [
  {
    label: "TE1 Express",
    amount: "$9.999",
    description: "50% de descuento",
    icon: NotebookPen,
    link: "/formularioTE1Express",
    arrow: ChevronRight,
    info: textWithBreaks[1],
  },
  {
    label: "TE1 Convencional",
    amount: "A convenir",
    description: "A convenir",
    icon: SquarePen,
    link: "/formularioTE1Convencional",
    arrow: ChevronRight,
    info: textWithBreaks[2],
  },
  {
    label: "Memorias lumínicas",
    amount: "A convenir",
    description: "A convenir",
    icon: Lightbulb,
    link: "/memoLuminicas",
    arrow: ChevronRight,
    info: textWithBreaks[3],
  },
  {
    label: "Otros",
    amount: "A convenir",
    description: "A convenir",
    icon: Activity,
    link: "https://api.whatsapp.com/send/?phone=56937432951&text=Hola%2C%20me%20comunico%20para%20consultar%20sobre%20el%20siguiente%20proyecto%3A",
    arrow: ChevronRight,
    info: textWithBreaks[0],
  },
];



  return (
   <ProtectedRoute>
    
      <div className="flex flex-col gap-5 w-full">
        <PageTitle title="Servicios" />
        <section className="grid w-full h-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4">
          {cardData.map((d, i) => (

            <div
              key={i}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(-1)}
              className="hover:scale-105 transform transition-all duration-500 ease-in-out"
            
            >             
             
                <Card
                  key={i}
                  description={d.description}
                  amount={d.amount}
                  icon={d.icon}
                  label={d.label}
                  link={d.link}
                  arrow={d.arrow}                  
                  info={textWithBreaks ? textWithBreaks[i] : ""}
                />                 
             
            </div>
          ))}
         
        </section>
      
        <section className="grid grid-cols-1 gap-4 transition-opacity duration-1500 ease-in-out opacity-100">
  <div className="flex flex-col md:flex-row gap-8 w-full ">
    <Link className="flex flex-col items-center w-full hover:scale-105 transform transition-all duration-500 ease-in-out" href="/foro">
      <QuestionList />
    </Link>
    <div className="hover:scale-105 transform transition-all duration-500 ease-in-out">   
    <UserRanking />
    </div>
  </div>
</section>
      </div>
    
      </ProtectedRoute>
   
  );
}

export default Home;


