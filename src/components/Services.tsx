import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import TypewriterEffect from './TypewriterEffect';
import AnimatedBackground from './AnimatedBackground';
import { Service, SetCurrentSectionProps } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { InfoIcon } from 'lucide-react';

interface ServicesProps extends SetCurrentSectionProps {
    services: Service[];
}

const Services: React.FC<ServicesProps> = ({ services, setCurrentSection }) => {
    const [openModal, setOpenModal] = useState<string | null>(null);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative min-h-screen w-full overflow-hidden"
        >
            <AnimatedBackground />
            <div className="relative z-10 container mx-auto px-4 py-8 flex flex-col min-h-screen">
                <h2 className="text-4xl font-bold mb-12 text-center text-white">
                    <TypewriterEffect text="Nuestros Servicios" />
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 flex-grow">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="flex"
                        >
                            <Card className="flex flex-col justify-between w-full bg-white shadow-lg">
                                <CardHeader className="flex flex-row justify-between items-center">
                                    <CardTitle className="text-2xl font-bold">{service.name}</CardTitle>
                                    <Dialog open={openModal === service.name} onOpenChange={(isOpen) => setOpenModal(isOpen ? service.name : null)}>
                                        <DialogTrigger asChild>
                                            <Button variant="ghost" size="sm">
                                                <InfoIcon className="h-5 w-5" />
                                                <span className="sr-only">Más información sobre {service.name}</span>
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>{service.name}</DialogTitle>
                                            </DialogHeader>
                                            <div className="mt-4">
                                                <h3 className="font-semibold text-lg mb-2">¿Qué es?</h3>
                                                <p className="mb-4">{service.description?.what || 'Información no disponible'}</p>
                                                <h3 className="font-semibold text-lg mb-2">¿Cómo funciona?</h3>
                                                <p className="mb-4">{service.description?.how || 'Información no disponible'}</p>
                                                <h3 className="font-semibold text-lg mb-2">Beneficio principal</h3>
                                                <p>{service.description?.benefit || 'Información no disponible'}</p>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </CardHeader>
                                <CardContent className="bg-white rounded-md p-6 flex-grow">
                                    <ul className="space-y-2 text-lg">
                                        {service.packages[1].features.map((feature, i) => (
                                            <li key={i} className="text-gray-700 flex">
                                                <span className="mr-2">&bull;</span>
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardFooter>
                                    <Button
                                        onClick={() => setCurrentSection(service.name)}
                                        className="w-full bg-black text-white hover:bg-gray-800 text-lg py-3"
                                    >
                                        Ver Paquetes
                                    </Button>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default Services;