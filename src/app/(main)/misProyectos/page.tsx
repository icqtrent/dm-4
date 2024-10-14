"use client";

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { app } from "../../firebase";
import { useAuth } from "@/context/AuthContext";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"

interface Archivo {
    nombre: string;
    url: string;
}

interface ArchivosObj {
    [key: string]: Archivo[];
}

interface Service {
    title: string;
    folder: string;
}

function SimpleCards() {
    const { user } = useAuth();
    const [archivos, setArchivos] = useState<ArchivosObj>({});
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState<Service | null>(null);

    const services: Service[] = [
        { title: "Confección TE1 Express", folder: "TE1Express" },
        { title: "Confección TE1 Convencional", folder: "TE1Convencional" },
        { title: "Memorias lumínicas", folder: "Memlum" },
        { title: "Otros proyectos realizados", folder: "Otros" },
    ]

    useEffect(() => {
        const obtenerArchivos = async (serviceFolder: string) => {
            const storageRef = app.storage().ref();
            const carpetaRef = storageRef.child(`${user.email}/${serviceFolder}/`);
            const listaArchivos = await carpetaRef.listAll();
            const urlsPromesas = listaArchivos.items.map(item => item.getDownloadURL());
            const urls = await Promise.all(urlsPromesas);
            const archivosData = listaArchivos.items.map((item, index) => {
                return {
                    nombre: item.name,
                    url: urls[index]
                };
            });
            return archivosData;
        };

        const cargarTodosLosArchivos = async () => {
            const archivosObj: ArchivosObj = {};
            for (const service of services) {
                archivosObj[service.folder] = await obtenerArchivos(service.folder);
            }
            setArchivos(archivosObj);
        };

        if (user && user.email) {
            cargarTodosLosArchivos();
        }
    }, [user]);

    const handleAcceder = (service: Service) => {
        setSelectedService(service);
        setModalOpen(true);
    };

    return (
        <>
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="max-w-4xl w-full">
                <div className="mb-6">
                        <h2 className="text-xl font-semibold">
                            Mis Proyectos
                        </h2>
                        <hr className="border-t-2 border-gray-200 mt-2 mb-4" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {services.map((service, index) => (
                        <Card key={index} className="w-[200px] h-[300px] ">
                            <CardHeader>
                                <CardTitle className="text-center text-xl font-semibold">{service.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                Haz click en <b>Mostrar</b> para visualizar los proyectos realizados.
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full" onClick={() => handleAcceder(service)}>
                                    Mostrar
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
                </div>
           

            <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{selectedService?.title}</DialogTitle>
                        <DialogDescription>
                            Lista de archivos disponibles:
                        </DialogDescription>
                    </DialogHeader>
                    <div className="mt-4">
                        {selectedService && archivos[selectedService.folder]?.map((archivo, index) => (
                            <div key={index} className="mb-2">
                                <a href={archivo.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                    {archivo.nombre}
                                </a>
                            </div>
                        ))}
                        {selectedService && archivos[selectedService.folder]?.length === 0 && (
                            <p>No hay archivos disponibles en esta carpeta.</p>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </main >
        </>
    )
}

export default SimpleCards