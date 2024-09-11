import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import AnimatedBackground from './AnimatedBackground'
import { SetCurrentSectionProps } from '@/types'

interface ContactFormProps extends SetCurrentSectionProps {
    selectedPackage: string
}

export default function ContactForm({ selectedPackage, setCurrentSection }: ContactFormProps) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Aquí iría la lógica para enviar el formulario
        console.log('Formulario enviado')
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative min-h-screen w-full overflow-hidden"
        >
            <AnimatedBackground />
            <div className="relative z-10 container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen">
                <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                    <h2 className="text-3xl font-bold mb-6 text-center">Contacto</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input type="text" placeholder="Nombre" required />
                        <Input type="email" placeholder="Email" required />
                        <Input type="tel" placeholder="Teléfono" />
                        <Input type="text" value={selectedPackage} readOnly />
                        <Textarea placeholder="Mensaje" required />
                        <Button
                            type="submit"
                            className="w-full bg-black text-white hover:bg-gray-800 text-lg py-3"
                        >
                            Enviar
                        </Button>
                    </form>
                </div>
                <Button
                    onClick={() => setCurrentSection('services')}
                    className="mt-8 bg-black text-white hover:bg-gray-800 text-lg py-3 px-6"
                >
                    Volver a Servicios
                </Button>
            </div>
        </motion.div>
    )
}