import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import TypewriterEffect from './TypewriterEffect';
import AnimatedBackground from './AnimatedBackground';
import { Service, SetCurrentSectionProps } from '@/types';

interface ServicesProps extends SetCurrentSectionProps {
    services: Service[];
}

const Services: React.FC<ServicesProps> = ({ services, setCurrentSection }) => {
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
                                <CardHeader>
                                    <CardTitle className="text-2xl font-bold">{service.name}</CardTitle>
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