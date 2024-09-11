import React, { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import AnimatedBackground from './AnimatedBackground'
import { SetCurrentSectionProps } from '@/types'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/ui/tooltip"

interface ContactFormProps extends SetCurrentSectionProps {
    selectedPackage: string
}

interface FormData {
    name: string;
    email: string;
    phone: string;
    message: string;
    package: string;
    acceptTerms: boolean;
}

interface FormErrors {
    name?: string;
    email?: string;
    message?: string;
    acceptTerms?: string;
}

export default function ContactForm({ selectedPackage, setCurrentSection }: ContactFormProps) {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        message: '',
        package: selectedPackage,
        acceptTerms: false,
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState(false);
    const [showFullTerms, setShowFullTerms] = useState(false);

    const termsAndConditions = `1. Introducción
Bienvenido a IA en clave (en adelante, "la Empresa"). Estos términos y condiciones regulan el uso de nuestro sitio web y los servicios que ofrecemos. Al acceder o utilizar nuestro sitio web, usted acepta cumplir con estos términos. Si no está de acuerdo con estos términos, no utilice el sitio web.
2. Definiciones
* "Usuario": cualquier persona que acceda o utilice los servicios del sitio web.
* "Servicios": los planes y soluciones de inteligencia artificial, automatización, y otros servicios ofrecidos por la Empresa.
* "Contenido": cualquier texto, imagen, gráfico, o material proporcionado en el sitio web.
3. Uso del Sitio Web
Los usuarios se comprometen a utilizar el sitio web de manera adecuada y de conformidad con la legislación aplicable. Queda prohibido el uso del sitio para actividades ilegales, incluyendo la distribución de material protegido por derechos de autor sin permiso.
La Empresa se reserva el derecho de modificar estos términos en cualquier momento sin previo aviso. Los cambios entrarán en vigor en el momento de su publicación en el sitio web.
4. Contratación de Servicios
Para adquirir nuestros planes de inteligencia artificial, el usuario deberá seguir el proceso de compra disponible en el sitio web. Los precios de los servicios están sujetos a cambio sin previo aviso.
5. Derechos de Propiedad Intelectual
Todo el contenido y material en el sitio web es propiedad de la Empresa y está protegido por las leyes de propiedad intelectual. Está prohibida la reproducción o distribución del contenido sin nuestro consentimiento expreso por escrito.
6. Responsabilidades del Usuario
El usuario es responsable de la veracidad de los datos proporcionados en el proceso de contratación de servicios. El incumplimiento de estos términos puede resultar en la suspensión del acceso a los servicios.
7. Política de Privacidad y Protección de Datos
La Empresa se compromete a proteger los datos personales del usuario de acuerdo con las leyes de privacidad aplicables. Al utilizar nuestro sitio web, usted acepta que la Empresa recopile y utilice su información personal para los fines establecidos en nuestra Política de Privacidad.
8. Permiso para Enviar Correos Electrónicos
Al proporcionar su información de contacto, usted acepta recibir correos electrónicos promocionales, informativos o relacionados con los servicios que ofrecemos. Estos correos pueden incluir ofertas especiales, actualizaciones de servicios o noticias relevantes. Si en cualquier momento desea dejar de recibir estos correos, puede hacerlo siguiendo las instrucciones de "darse de baja" que se incluyen en cada correo electrónico.
9. Limitación de Responsabilidad
La Empresa no será responsable por daños directos o indirectos que resulten del uso de los servicios, salvo en los casos previstos por la ley. El uso del sitio web y los servicios es bajo su propio riesgo.
10. Política de Cancelación y Reembolso
Los usuarios pueden cancelar o solicitar un reembolso de los servicios contratados de acuerdo con las condiciones establecidas en nuestra política de cancelación y reembolso, disponible en el sitio web.
11. Ley Aplicable y Jurisdicción
Estos términos y condiciones se rigen por las leyes de México. Cualquier disputa que surja en relación con el uso del sitio web o los servicios será resuelta en los tribunales de Puebla, Pue.`;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const validateForm = (): FormErrors => {
        let errors: FormErrors = {};
        if (!formData.name.trim()) errors.name = 'El nombre es obligatorio';
        if (!formData.email.trim()) {
            errors.email = 'El correo es obligatorio';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'El correo no es válido';
        }
        if (!formData.message.trim()) errors.message = 'El mensaje es obligatorio';
        if (!formData.acceptTerms) errors.acceptTerms = 'Debes aceptar los términos y condiciones';
        return errors;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
        const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
        const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

        if (!serviceId || !templateId || !publicKey) {
            console.error('EmailJS configuration is missing');
            setSubmitError(true);
            return;
        }

        emailjs.send(
            serviceId,
            templateId,
            formData as unknown as Record<string, unknown>,
            publicKey
        )
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                setIsSubmitted(true);
            }, (err) => {
                console.error('FAILED...', err);
                setSubmitError(true);
            });
    };

    const termsModalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (termsModalRef.current && !termsModalRef.current.contains(event.target as Node)) {
                setShowFullTerms(false);
            }
        }

        if (showFullTerms) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showFullTerms]);

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
                    {!isSubmitted ? (
                        <>
                            <h2 className="text-3xl font-bold mb-6 text-center">Contacto</h2>
                            <p className="text-center mb-4">Paquete seleccionado: <strong>{selectedPackage}</strong></p>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block mb-1">Nombre (obligatorio)</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded"
                                    />
                                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                                </div>
                                <div>
                                    <label htmlFor="email" className="block mb-1">Correo (obligatorio)</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded"
                                    />
                                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block mb-1">Teléfono (opcional)</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block mb-1">Mensaje (obligatorio)</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded"
                                        rows={4}
                                    ></textarea>
                                    {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="acceptTerms"
                                        name="acceptTerms"
                                        checked={formData.acceptTerms}
                                        onChange={handleChange}
                                        className="mr-2"
                                    />
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <label htmlFor="acceptTerms" className="text-sm cursor-pointer">
                                                    Acepto los términos y condiciones
                                                </label>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p className="max-w-xs">
                                                    Al aceptar estos términos y condiciones, usted acepta cumplir con las normas de uso del sitio web, la contratación de servicios, y nuestras políticas de privacidad y protección de datos. Para más detalles, haga clic para ver los términos completos.
                                                </p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                                <button
                                    onClick={() => setShowFullTerms(true)}
                                    className="text-blue-500 underline text-sm mt-2"
                                >
                                    Ver términos y condiciones completos
                                </button>
                                {errors.acceptTerms && <p className="text-red-500 text-sm">{errors.acceptTerms}</p>}
                                <Button
                                    type="submit"
                                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                                    disabled={!formData.acceptTerms}
                                >
                                    Enviar
                                </Button>
                                {submitError && (
                                    <p className="text-red-500 text-center">Inténtelo nuevamente, ocurrió un error.</p>
                                )}
                            </form>
                        </>
                    ) : (
                        <div className="text-center">
                            <h2 className="text-3xl font-bold mb-6">¡Gracias por contactarnos!</h2>
                            <p className="mb-6">Hemos recibido tu mensaje. Nos pondremos en contacto contigo pronto.</p>
                            <Button
                                onClick={() => setCurrentSection('services')}
                                className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition duration-300"
                            >
                                Volver a los servicios
                            </Button>
                        </div>
                    )}
                </div>
                {!isSubmitted && (
                    <Button
                        onClick={() => setCurrentSection('services')}
                        className="mt-8 bg-black text-white hover:bg-gray-800 text-lg py-3 px-6"
                    >
                        Volver a Servicios
                    </Button>
                )}
            </div>
            {showFullTerms && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div ref={termsModalRef} className="bg-white p-8 rounded-lg max-w-2xl max-h-[80vh] overflow-y-auto">
                        <h2 className="text-2xl font-bold mb-4">Términos y Condiciones</h2>
                        <pre className="whitespace-pre-wrap text-sm">{termsAndConditions}</pre>
                        <Button
                            onClick={() => setShowFullTerms(false)}
                            className="mt-4"
                        >
                            Cerrar
                        </Button>
                    </div>
                </div>
            )}
        </motion.div>
    )
}