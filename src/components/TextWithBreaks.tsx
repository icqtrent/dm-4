import { PageWrapper } from "@/components/PageWrapper";
import React from "react";

import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogHeader} from "@/components/ui/dialog";
import { Info } from "lucide-react";

interface TextWithBreaksProps {
    texts: { title: string; text: string }[];
  }
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


  const TextWithBreaks: React.FC<TextWithBreaksProps> = ({  }) => {
    return (
    <>
        {exampleTexts.map((item, index) => {
          return (
            <Dialog key={index}>
              <DialogTrigger><Info /></DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{item.title}</DialogTitle>
                  <hr className="border-t-2 border-gray-200 mt-2 mb-4" />
                  <DialogDescription>
                    <PageWrapper>
                      <div>
                        {item.text.split("\n").map((line, index) => (
                          <React.Fragment key={index}>
                            {line}
                            <br />
                          </React.Fragment>
                        ))}
                      </div>
                    </PageWrapper>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          );
        })}     
      </>
    );
  };
  
  export default TextWithBreaks;