"use client";
import * as z from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  Select,
} from "@/components/ui/select";
//import { validateRut } from "../rutUtils";
import { SetStateAction, useEffect, useState } from "react";
import data from '../../data.json';
import cablesData from '../../cablesData.json';
import regionesDataset from '../../regionesDataset.json';
import { Region, RegionesDataset } from '../../types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Info } from 'lucide-react';

import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { db, imgDb, app } from "../../firebase";
import { ref, uploadBytes } from "firebase/storage";
import firebase from "firebase/compat/app";
import ProtectedRoute from "@/components/ProtectedRoute";
import { FileUploaderTest } from "@/components/FileUploaderTest2";
import { useAuth } from "@/context/AuthContext";
type DocumentData = firebase.firestore.DocumentData;






const formSchema = z.object({
  nombreInstalador: z.string().min(3, "Los nombres del instalador deben tener al menos 3 caracteres").max(50, "Los nombres del instalador no deben tener más de 30 caracteres"),
  apellidoInstalador: z.string().min(3, "Los apellidos del instalador deben tener al menos 3 caracteres").max(50, "Los apellidos del instalador no deben tener más de 30 caracteres"),
  folio: z.string().min(5, "El folio o rut del instalador deben tener al menos 5 caracteres").max(50, "El folio o rut del instalador no deben tener más de 30 caracteres"),

  nombrePropietario: z.string().min(3, "El folio o rut del instalador deben tener al menos 3 caracteres"),
  apellidoPropietario: z.string().min(3, "Los apellidos del propietario deben tener al menos 3 caracteres"),
  rut: z.string().refine((val) => {
    const regex = /^\d{1,8}-[\dkK]$/;
    return regex.test(val);
  }, {
    message: "RUT debe tener el formato '12345678-9'."
  }),
  direccionPropietario: z.string().min(3, "La direccion del propietario deben tener al menos 3 caracteres"),
  comunaPropietario: z.string().min(1, "Debe seleccionar la comuna "),
  regionInstalacion: z.string().min(1, "Debe seleccionar la region "),
  //region: z.enum(["Arica y Parinacota", "Tarapacá", "Antofagasta", "Atacama", "Coquimbo", "Valparaíso", "Región del Libertador Gral. Bernardo OHiggins", "Región del Maule", "Región de Ñuble", "Región del Biobío", "Región de la Araucanía", "Región de Los Ríos", "Región de Los Lagos", "Región Aisén del Gral. Carlos Ibáñez del Campo", "Región de Magallanes y de la Antártica Chilena", "Región Metropolitana de Santiago"]),
  coordenadas: z.string().min(10, "La coordenadas del propietario deben tener al menos 10 caracteres"),
  destinoPropiedad: z.string().min(1, "Seleccione el destino de la propiedad"),
  largoAlimentador: z
    .string()
    .refine(value => {
      const num = Number(value);
      return num >= 1 && num <= 99;
    }, {
      message: "El valor debe estar entre 1 y 99"
    })
    .transform(value => Number(value)),
  tipoCable: z.string().min(1, "Debe seleccionar el tipo de cable"),
  aislacionCable: z.string().min(1, "Debe seleccionar la aislacion"),
  calibreAlimentador: z.string().refine(value => {
    const num = Number(value);
    return num >= 1 && num <= 14;
  }, {
    message: "El valor debe estar entre 1 y 14"
  })
    .transform(value => Number(value)),
  um: z.string().min(1, "Debe seleccionar calibre mm2/awg"),
  canalizacion: z.string().min(1),
  spt: z.string().refine(value => {
    const num = Number(value);
    return num >= 1 && num <= 80;
  }, {
    message: "El valor debe estar entre 1 y 80"
  })
    .transform(value => Number(value)),
  enlaceUrl: z.string().url(),
  //.refine((file: File) => file?.size !== 0, "File is required"),
  ohmnimetro: z.string().min(3, "Debe ingresar el modelo telurímetro"),

  interruptorGeneral: z.string().min(1, "Debe seleccionar el tipo de interruptor"),

 
})



const formatearRut = (rut: string): string => {
  const cleanRut = rut.replace(/\./g, '').replace(/-/g, '');
  const digitoVerificador = cleanRut.slice(-1);
  const numero = cleanRut.slice(0, -1);

  let numeroFormateado = '';
  for (let i = numero.length; i > 0; i -= 3) {
    const start = Math.max(i - 3, 0);
    const part = numero.slice(start, i);
    numeroFormateado = part + (numeroFormateado ? '.' + numeroFormateado : '');
  }

  return `${numeroFormateado}-${digitoVerificador}`;
}

export default function Home() {

  const { user, logOut } = useAuth();

  const [croquis, setCroquis] = useState<DocumentData[]>([]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      const archivo = e.target.files[0];
      const storageRef = app.storage().ref();
      const archivoPath = storageRef.child(archivo.name);
      try {
        await archivoPath.put(archivo);
        console.log("archivo cargado:", archivo.name);
        const enlaceUrl = await archivoPath.getDownloadURL();
        console.log(enlaceUrl);
        form.setValue('enlaceUrl', enlaceUrl);
      } catch (error) {
        console.error("Error subiendo archivo:", error);
      }
    }
  };
  /*
    useEffect(() => {
      async function fetchData() {
        const docusList = await firebase.firestore().collection(`${timestamp.toISOString()}`).get();
        setCroquis(docusList.docs.map((doc) => doc.data()))
        console.log(docusList.docs.map((doc) => doc.data()))
      }
      fetchData();
    }, []);
  */



  const timestamp = new Date();
  const formattedDat = timestamp.toISOString();
  const formattedDate = timestamp.toISOString().split("T")[0];

  const { register, handleSubmit, formState: { errors } } = useForm();



  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombreInstalador: "",
      apellidoInstalador: "",
      folio: "",
      nombrePropietario: "",
      apellidoPropietario: "",
      rut: "",
      direccionPropietario: "",
      comunaPropietario: "",
      regionInstalacion: "",
      coordenadas: "",
      destinoPropiedad: "",
      largoAlimentador: parseInt(""),
      tipoCable: "",
      aislacionCable: "",
      calibreAlimentador: parseInt(""),
      um: "",
      canalizacion: "",
      spt: parseInt(""),
      interruptorGeneral: "",
      ohmnimetro: "",
      enlaceUrl: "",
   

    },
  });



  const region = form.watch("regionInstalacion");


  const [error, setError] = useState('');



  /*const handleSubmit = (values: z.infer<typeof formSchema>) => {
    
    const result = formSchema.safeParse({ file });
    const formattedRut = formatearRut(values.rut);
    console.log({ values });

    if (!result.success) {
      setError(result.error.errors[0].message);
    } else {
      setError('');
      // Aquí puedes manejar el archivo subido
      console.log('Archivo subido:', file);
    }
  };*/

  const onSubmit = async (form: any) => {

    const response = await setDoc(
      doc(db, formattedDate+" - TE1Express", user.email+" - "+formattedDat),
      {
        form,
      }
    );

    console.log(response);

    try {
      const res = await fetch(
        "https://script.google.com/macros/s/AKfycbw2QOUQwcQ6y47fQ9NrVu9bfofRIEC8hf6-U0s7xKzsdCuo5qcyMJzDGm4Pj4YGNgUgbw/exec",
        {
          mode: "no-cors",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      if (res.ok) {
        console.log("datos enviados con  exito");
      }
    } catch (error) {
      console.log(error);
    }
  
  };




  const { control, watch, setValue } = useForm();
  const [comunas, setComunas] = useState([]);
  const [aislacionn, setAislacionn] = useState([]);


  const regiones = data.regiones.map(region => region.region);
  const cables = cablesData.cables.map(cable => cable.cable);

  const handleRegionChange = (selectedRegion: any) => {
    const selectedData: any = data.regiones.find(region => region.region === selectedRegion);
    setComunas(selectedData ? selectedData.comunas : []);
    setValue('comunna', ''); // Clear the comuna field when region changes
    console.log('Selected Region:', typeof selectedRegion); // Log the selected region
    console.log('Available Comunas:', selectedData ? selectedData.comunas : []); // Log the available comunas for the selected region
  };

  const handleCableChange = (selectedCable: any) => {
    const selectedDataCable: any = cablesData.cables.find(cable => cable.cable === selectedCable);
    setAislacionn(selectedDataCable ? selectedDataCable.aislacion : []);
    setValue('cable', ''); // Clear the comuna field when region changes
    console.log('Selected cable:', typeof selectedCable); // Log the selected region
    console.log('Available aislacion:', selectedDataCable ? selectedDataCable.cable : []); // Log the available comunas for the selected region
  };

  const selectedRegion = form.watch('regionInstalacion');
  const selectedCable = form.watch('tipoCable');


  const handleComunaChange = (selectedComuna: string) => {
    console.log('Selected Comuna:', typeof selectedComuna);
  };

  const handleAislacionChange = (selectedAislacion: string) => {
    console.log('Selected aislacion:', typeof selectedAislacion);
  };





  return (
    <ProtectedRoute>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}

            //className="max-w-md w-full flex flex-col gap-4"
            className="max-w-md w-full grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="md:col-span-2">
              <h2 className="text-xl font-semibold">Información del instalador</h2>
              <hr className="border-t-2 border-gray-200 mt-2 mb-4" />
            </div>
            <FormField
              control={form.control}
              name="nombreInstalador"

              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Nombres Instalador</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nombres Instalador"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="apellidoInstalador"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Apellidos Instalador</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Apellidos Instalador"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="folio"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Folio o Rut de Instalador</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Folio o rut instalador"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <div></div>
            <div className="md:col-span-2 mt-8">
              <h2 className="text-xl font-semibold">Información del propietario</h2>
              <hr className="border-t-2 border-gray-200 mt-2 mb-4" />
            </div>
            <FormField
              control={form.control}
              name="nombrePropietario"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Nombres Propietario</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nombres Propietario"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="apellidoPropietario"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Apellidos Propietario</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Apellidos Propietario"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField

              control={form.control}

              name="rut"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Rut Propietario</FormLabel>
                    <FormControl>
                      <Input

                        placeholder="Rut Propietario"
                        type="text"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                    {errors.rut && errors.rut.message && (
                      <FormMessage>{errors.rut.message.toString()}</FormMessage>
                    )}
                  </FormItem>
                );
              }}


            />



            <div className="md:col-span-2 mt-8">
              <h2 className="text-xl font-semibold">Información de la instalación</h2>
              <hr className="border-t-2 border-gray-200 mt-2 mb-4" />
            </div>



            <FormField
              control={form.control}
              name="regionInstalacion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Región de la instalación</FormLabel>
                  <Select onValueChange={(value) => {
                    field.onChange(value);
                    handleRegionChange(value);
                  }}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una region" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {regiones.map((region, index) => (
                        <SelectItem key={index} value={region}>{region}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />


            <FormField
              control={form.control}
              name="comunaPropietario"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comuna de la instalación</FormLabel>
                  <Select onValueChange={(value) => {
                    field.onChange(value);
                    handleComunaChange(value);
                  }} disabled={!selectedRegion}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una comuna" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {selectedRegion ? comunas.map((comuna, index) => (
                        <SelectItem key={index} value={comuna}>{comuna}</SelectItem>
                      )) : null}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="direccionPropietario"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Dirección Propietario</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Dirección Propietario"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />



            <FormField
              control={form.control}
              name="coordenadas"
              render={({ field }) => {
                return (
                  <FormItem >
                    <FormLabel>Coordenadas de la instalación</FormLabel>
                    <FormControl >
                      <div style={{ display: 'flex', alignItems: 'center' }}>

                        <Input
                          placeholder="Coordenadas de la instalación"
                          type="text"
                          {...field}
                        />

                        <Dialog>
                          <DialogTrigger><Info /></DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>¿Cómo seleccionar las coordenadas?</DialogTitle>
                              <hr className="border-t-2 border-gray-200 mt-2 mb-4" />
                              <DialogDescription>
                                <img src="https://firebasestorage.googleapis.com/v0/b/crud-react-d1e99.appspot.com/o/instructivo-coordenadas.gif?alt=media&token=d309fc4c-c8fa-49c4-9a2e-338e33d0f1a7" alt="Info" />
                              </DialogDescription>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />




            <FormField
              control={form.control}
              name="destinoPropiedad"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Destino de la instalación</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione el destino de la instalación" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>

                        <SelectItem value="Actividades Inmobiliarias Empresariales y de Alquiler">
                          Actividades Inmobiliarias empresariales y de alquiler
                        </SelectItem>
                        <SelectItem value="Adm. pública y defensa; Planes de Seg. Social, Afiliación Obligatoria">
                          Adm. pública y defensa; Planes de Seg. Social, Afiliación
                          obligatoria
                        </SelectItem>
                        <SelectItem value="Agricultura, Ganadería, Caza y Silvicultura">
                          Agricultura, Ganadería, Caza y Silvicultura
                        </SelectItem>
                        <SelectItem value="Comercio al Por Mayor y Menor; Rep.Vehículos Automotores/Enseres Domésticos.">
                          Comercio al Por Mayor y Menor; Rep. Vehículos Automotores/Enseres
                          Domésticos.
                        </SelectItem>
                        <SelectItem value="Consejo de Administración de Edificios y Condominios">
                          Consejo de Administración de Edificios y Condominios
                        </SelectItem>
                        <SelectItem value="Construcción">Construcción</SelectItem>
                        <SelectItem value="Enseñanza">Enseñanza</SelectItem>
                        <SelectItem value="Explotación de Minas y Canteras">
                          Explotación de Minas y Canteras
                        </SelectItem>
                        <SelectItem value="Habitacional">Habitacional</SelectItem>
                        <SelectItem value="Hoteles y Restaurantes">
                          Hoteles y Restaurantes
                        </SelectItem>
                        <SelectItem value="Industrias Manufactureras Metálicas">
                          Industrias Manufactureras Metálicas
                        </SelectItem>
                        <SelectItem value="Industrias Manufactureras No Metálicas">
                          Industrias Manufactureras No Metálicas
                        </SelectItem>
                        <SelectItem value="Intermediación Financiera">
                          Intermediación Financiera
                        </SelectItem>
                        <SelectItem value="Organizaciones y Órganos Extraterritoriales">
                          Organizaciones y Órganos Extraterritoriales
                        </SelectItem>
                        <SelectItem value="Otras Actividades de Servicios Comunitarias, Sociales y Personales">
                          Otras Actividades de Servicios Comunitarias, Sociales y Personales
                        </SelectItem>
                        <SelectItem value="Pesca">Pesca</SelectItem>
                        <SelectItem value="Servicios Sociales y de Salud">
                          Servicios Sociales y de Salud
                        </SelectItem>
                        <SelectItem value="Suministro de Electricidad, Gas y Agua">
                          Suministro de Electricidad, Gas y Agua
                        </SelectItem>
                        <SelectItem value="Transporte, Almacenamiento y Comunicaciones">
                          Transporte, Almacenamiento y Comunicaciones
                        </SelectItem>,

                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <div className="md:col-span-2 mt-8">
              <h2 className="text-xl font-semibold">Información técnica de la instalación</h2>
              <hr className="border-t-2 border-gray-200 mt-2 mb-4" />
            </div>


            <FormField
              control={form.control}
              name="interruptorGeneral"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Interruptor General</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione valor Interruptor General" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>

                        <SelectItem value="6">
                          6A
                        </SelectItem>

                        <SelectItem value="10">
                          10A
                        </SelectItem>
                        <SelectItem value="16">
                          16A
                        </SelectItem>
                        <SelectItem value="20">
                          20A
                        </SelectItem>
                        <SelectItem value="25">
                          25A
                        </SelectItem>
                        <SelectItem value="32">
                          32A
                        </SelectItem>
                        <SelectItem value="40">
                          40A
                        </SelectItem>




                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />


            <FormField
              control={form.control}
              name="largoAlimentador"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Longitud Alimentador (mts.)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Longitud Alimentador"
                        type="text"
                        {...field}
                        value={field.value || ""} // Asegura que el valor siempre sea una cadena
                        onChange={(e) => field.onChange(e.target.value)} // Maneja el evento de cambio
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="tipoCable"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cable alimentador</FormLabel>
                  <Select onValueChange={(value) => {
                    field.onChange(value);
                    handleCableChange(value);
                  }}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un tipo de cable" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {cables.map((cable, index) => (
                        <SelectItem key={index} value={cable}>{cable}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />


            <FormField
              control={form.control}
              name="aislacionCable"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Aislación cable alimentador</FormLabel>
                  <Select onValueChange={(value) => {
                    field.onChange(value);
                    handleAislacionChange(value);
                  }} disabled={!selectedCable}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona aislación" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {selectedCable ? aislacionn.map((aislacion, index) => (
                        <SelectItem key={index} value={aislacion}>{aislacion}</SelectItem>
                      )) : null}

                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="canalizacion"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Canalización alimentador</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione tipo de canalización" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>

                        <SelectItem value="a">
                          aérea
                        </SelectItem>
                        <SelectItem value="s">
                          subterránea
                        </SelectItem>


                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <div></div>

            <FormField
              control={form.control}
              name="calibreAlimentador"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Calibre Alimentador</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Calibre Alimentador"
                        type="text"
                        {...field}
                        value={field.value || ""} // Asegura que el valor siempre sea una cadena
                        onChange={(e) => field.onChange(e.target.value)} // Maneja el evento de cambio
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="um"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>mm2/awg</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione unidad de medida" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>

                        <SelectItem value="awg">
                          awg
                        </SelectItem>
                        <SelectItem value="mm2">
                          mm2
                        </SelectItem>


                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="spt"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Valor SPT (Ω)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="SPT"
                        type="text"
                        {...field}
                        value={field.value || ""} // Asegura que el valor siempre sea una cadena
                        onChange={(e) => field.onChange(e.target.value)} // Maneja el evento de cambio
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />


            <FormField
              control={form.control}
              name="ohmnimetro"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Modelo Telurímetro</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ingrese modelo telurímetro"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="enlaceUrl"
              render={({ field }) => {
                return (
                  <FormItem className="md:col-span-2" >
                    <FormLabel>Croquis de la instalación</FormLabel>
                    <FormControl>
                      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                        <FileUploaderTest control={form.control} setValue={form.setValue} name="enlaceUrl" />
                        <Dialog>
                          <DialogTrigger><Info /></DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>¿Cómo seleccionar las coordenadas?</DialogTitle>
                              <hr className="border-t-2 border-gray-200 mt-2 mb-4" />
                              <DialogDescription>
                                <img src="https://firebasestorage.googleapis.com/v0/b/crud-react-d1e99.appspot.com/o/instructivo-coordenadas.gif?alt=media&token=d309fc4c-c8fa-49c4-9a2e-338e33d0f1a7" alt="Info" />
                              </DialogDescription>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />



            <Button

              type="submit" className="md:col-span-2" >
              Enviar
            </Button>
          </form>
        </Form>
      </main>
    </ProtectedRoute>
  );
}



