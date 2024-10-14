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

import { useState } from "react";
import data from '../../regionesDataset.json';



const formSchema = z.object({
  nombreInstalador: z.string().min(3, "Los nombres del instalador deben tener al menos 3 caracteres").max(50, "Los nombres del instalador no deben tener más de 30 caracteres"),
  apellidoInstalador: z.string().min(3, "Los apellidos del instalador deben tener al menos 3 caracteres").max(50, "Los apellidos del instalador no deben tener más de 30 caracteres"),
  folioInstalador: z.string().min(5, "El folio o rut del instalador deben tener al menos 5 caracteres").max(50, "El folio o rut del instalador no deben tener más de 30 caracteres"),
  
  nombrePropietario: z.string().min(3, "El folio o rut del instalador deben tener al menos 3 caracteres"),
  apellidoPropietario: z.string().min(3, "El apellido del propietario deben tener al menos 3 caracteres"),
  rut: z.string().refine((val) => {
    const regex = /^\d{1,8}-[\dkK]$/;
    return regex.test(val);
  }, {
    message: "RUT debe tener el formato '12345678-9'."
  }),
  direccionPropietario: z.string().min(3, "La direccion del propietario deben tener al menos 3 caracteres"),
  comuna: z.string().min(1, "Debe seleccionar la comuna "),
  region: z.string().min(1, "Debe seleccionar la region "),
  //region: z.enum(["Arica y Parinacota", "Tarapacá", "Antofagasta", "Atacama", "Coquimbo", "Valparaíso", "Región del Libertador Gral. Bernardo OHiggins", "Región del Maule", "Región de Ñuble", "Región del Biobío", "Región de la Araucanía", "Región de Los Ríos", "Región de Los Lagos", "Región Aisén del Gral. Carlos Ibáñez del Campo", "Región de Magallanes y de la Antártica Chilena", "Región Metropolitana de Santiago"]),
  coordenadas: z.string().min(3, "La coordenadas del propietario deben tener al menos 3 caracteres"),
  destinoPropiedad: z.string().min(3, "La direccion del propietario deben tener al menos 3 caracteres"),
  largoAlimentador: z
    .string()
    .refine(value => {
      const num = Number(value);
      return num >= 1 && num <= 99;
    }, {
      message: "El valor debe estar entre 1 y 99"
    })
    .transform(value => Number(value)),
  tipoCable: z.string().min(3, "La direccion del propietario deben tener al menos 3 caracteres"),
  aislacionCable: z.string().min(3, "La direccion del propietario deben tener al menos 3 caracteres"),
  calibreAlimentador: z.string().min(3, "La direccion del propietario deben tener al menos 3 caracteres"),
  um: z.string().min(3, "La direccion del propietario deben tener al menos 3 caracteres"),
  canalizacion: z.string().min(3, "La direccion del propietario deben tener al menos 3 caracteres"),
  spt: z.string().min(3, "La direccion del propietario deben tener al menos 3 caracteres"),
  enlaceUrl: z.string().min(3, "La direccion del propietario deben tener al menos 3 caracteres"),
  ohmnimetro: z.string().min(3, "La direccion del propietario deben tener al menos 3 caracteres"),
  password: z.string().min(4, "La contraseña debe tener al menos 4 caracteres"),
  passwordConfirm: z.string().min(4, "La contraseña debe tener al menos 4 caracteres"),
  accountType: z.enum(["personal", "company"]),
  companyName: z.string().optional()
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

  const { formState: { errors } } = useForm();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombreInstalador: "",
      apellidoInstalador: "",
      folioInstalador: "",
      nombrePropietario: "",
      apellidoPropietario: "",
      rut: "",
      direccionPropietario: "",
      comuna: "",
      coordenadas: "",
      destinoPropiedad: "",
      largoAlimentador: parseInt(""),
      tipoCable: "",
      aislacionCable: "",
      calibreAlimentador: "",
      um: "",
      canalizacion: "",
      spt: "",
      enlaceUrl: "",
      ohmnimetro: "",
      password: "",
      passwordConfirm: "",
      companyName: "",
    },
  });



  const region = form.watch("region");

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const formattedRut = formatearRut(values.rut);
    console.log({ values });
  };


  const { control, watch, setValue } = useForm();
  const [comunas, setComunas] = useState([]);

  const regiones = data.regiones.map(region => region.region);

  const handleRegionChange = (selectedRegion: any) => {
    const selectedData: any = data.regiones.find(region => region.region === selectedRegion);
    setComunas(selectedData ? selectedData.comunas : []);
    setValue('comuna', ''); // Clear the comuna field when region changes
    console.log('Selected Region:', typeof selectedRegion); // Log the selected region
    console.log('Available Comunas:', selectedData ? selectedData.comunas : []); // Log the available comunas for the selected region
  };

  const selectedRegion = form.watch('region');

  const handleComunaChange = (selectedComuna: string) => {
    console.log('Selected Comuna:', typeof selectedComuna);
  };


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
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
                      placeholder="Nombre Instalador"
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
                      placeholder="Apellido Instalador"
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
            name="folioInstalador"
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
                      placeholder="Nombre Propietario"
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
                      placeholder="Apellido Propietario"
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
            name="region"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Region</FormLabel>
                <Select onValueChange={(value) => {
                  field.onChange(value);
                  handleRegionChange(value);
                }}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona a region" />
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

          {selectedRegion && (
            <FormField
              control={form.control}
              name="comuna"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comuna</FormLabel>
                  <Select onValueChange={(value) => {
                    field.onChange(value);
                    handleComunaChange(value);
                  }}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una comuna" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {comunas.map((comuna, index) => (
                        <SelectItem key={index} value={comuna}>{comuna}</SelectItem>
                      ))}

                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="direccionPropietario"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Direccion Propietario</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Direccion Propietario"
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
                <FormItem>
                  <FormLabel>Coordenadas</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Coordenadas"
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
            name="destinoPropiedad"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Destino Propiedad</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Destino Propiedad"
                      type="text"
                      {...field}
                    />
                  </FormControl>
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
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Tipo Cable</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Tipo Cable"
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
            name="aislacionCable"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Aislacion Cable</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Aislacion Cable"
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
                  <FormLabel>UM</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="UM"
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
            name="canalizacion"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Canalizacion</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Canalizacion"
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
            name="spt"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>SPT</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="SPT"
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
                <FormItem>
                  <FormLabel>Enlace Url</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enlace Url"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />


          <Button type="submit" className="md:col-span-2">
            Enviar
          </Button>
        </form>
      </Form>
    </main>
  );
}



