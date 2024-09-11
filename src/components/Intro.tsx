import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import TypewriterEffect from './TypewriterEffect'
import AnimatedBackground from './AnimatedBackground'
import { SetCurrentSectionProps } from '@/types'

export default function Intro({ setCurrentSection }: SetCurrentSectionProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="relative flex flex-col items-center justify-center min-h-screen text-center p-4 overflow-hidden"
        >
            <AnimatedBackground />
            <div className="relative z-10">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
                    <TypewriterEffect key="intro-title" text="Bienvenido a IA en Clave" />
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-gray-200">
                    <TypewriterEffect key="intro-subtitle" text="Descubre el poder de la IA para tu organización" delay={30} />
                </p>
                <Button
                    onClick={() => setCurrentSection('services')}
                    className="bg-white text-blue-900 hover:bg-gray-200 text-lg py-3 px-6"
                >
                    Comienza tu viaje <ArrowRight className="ml-2" />
                </Button>
            </div>
        </motion.div>
    )
}