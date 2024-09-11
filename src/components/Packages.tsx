import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock } from 'lucide-react';
import TypewriterEffect from './TypewriterEffect';
import AnimatedBackground from './AnimatedBackground';
import { Service, SetCurrentSectionProps } from '@/types';

interface PackagesProps extends SetCurrentSectionProps {
    service: Service;
    setSelectedPackage: (packageName: string) => void;
}

const Packages: React.FC<PackagesProps> = ({ service, setCurrentSection, setSelectedPackage }) => {
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
                    <TypewriterEffect key={`${service.name}-title`} text={service.name} />
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 flex-grow">
                    {service.packages.map((pkg, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="flex"
                        >
                            <Card className="flex flex-col justify-between w-full bg-white shadow-lg">
                                <CardHeader>
                                    <CardTitle className="text-2xl font-bold">{pkg.name}</CardTitle>
                                </CardHeader>
                                <CardContent className="bg-white rounded-md p-6 flex-grow">
                                    <ul className="space-y-2 text-lg">
                                        {pkg.features.map((feature, i) => (
                                            <li key={i} className="text-gray-700 flex">
                                                <span className="mr-2">&bull;</span>
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardFooter>
                                    <Button
                                        onClick={() => { setSelectedPackage(`${service.name} - ${pkg.name}`); setCurrentSection('contact') }}
                                        className="w-full bg-black text-white hover:bg-gray-800 text-lg py-3"
                                    >
                                        {index === 2 ? <><Lock className="mr-2" /> Contactar</> : 'Seleccionar'}
                                    </Button>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </div>
                <div className="mt-12 text-center">
                    <Button onClick={() => setCurrentSection('services')} className="bg-black text-white hover:bg-gray-800 text-lg py-3 px-6">
                        Volver a Servicios
                    </Button>
                </div>
            </div>
        </motion.div>
    );
};

export default Packages;