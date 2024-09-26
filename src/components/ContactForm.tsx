import React, { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import AnimatedBackground from './AnimatedBackground';
import { SetCurrentSectionProps } from '@/types';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/ui/tooltip";

interface ContactFormProps extends SetCurrentSectionProps {
    selectedPackage: string;
}

interface FormData {
    from_name: string;
    from_email: string;
    phone: string;
    message: string;
    selected_package: string;
    acceptTerms: boolean;
}

interface FormErrors {
    from_name?: string;
    from_email?: string;
    message?: string;
    acceptTerms?: string;
}

export default function ContactForm({ selectedPackage, setCurrentSection }: ContactFormProps) {
    const [formData, setFormData] = useState<FormData>({
        from_name: '',
        from_email: '',
        phone: '',
        message: '',
        selected_package: selectedPackage,
        acceptTerms: false,
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState(false);
    const [showFullTerms, setShowFullTerms] = useState(false);

    const termsAndConditions = `1. Introducción
Bienvenido a IA en clave (en adelante, "la Empresa"). Estos términos y condiciones regulan el uso de nuestro sitio web y los servicios que ofrecemos. Al acceder o utilizar nuestro sitio web, usted acepta cumplir con estos términos. Si no está de acuerdo con estos términos, no utilice el sitio web.
...`;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

    const validateForm = (): FormErrors => {
        let errors: FormErrors = {};
        if (!formData.from_name.trim()) errors.from_name = 'El nombre es obligatorio';
        if (!formData.from_email.trim()) {
            errors.from_email = 'El correo es obligatorio';
        } else if (!/\S+@\S+\.\S+/.test(formData.from_email)) {
            errors.from_email = 'El correo no es válido';
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

        const emailData = {
            from_name: formData.from_name,
            from_email: formData.from_email,
            phone: formData.phone,
            message: formData.message,
            selected_package: formData.selected_package,
            acceptTerms: formData.acceptTerms,
        };

        emailjs.send(serviceId, templateId, emailData, publicKey)
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
                                    <label htmlFor="from_name" className="block mb-1">Nombre (obligatorio)</label>
                                    <input
                                        type="text"
                                        id="from_name"
                                        name="from_name"
                                        value={formData.from_name}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded"
                                    />
                                    {errors.from_name && <p className="text-red-500 text-sm">{errors.from_name}</p>}
                                </div>
                                <div>
                                    <label htmlFor="from_email" className="block mb-1">Correo (obligatorio)</label>
                                    <input
                                        type="email"
                                        id="from_email"
                                        name="from_email"
                                        value={formData.from_email}
                                        onChange={handleChange}
                                        className="w-full p-2 border rounded"
                                    />
                                    {errors.from_email && <p className="text-red-500 text-sm">{errors.from_email}</p>}
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

                {showFullTerms && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div
                            ref={termsModalRef}
                            className="bg-white p-8 rounded-lg shadow-lg max-w-3xl max-h-full overflow-y-auto"
                        >
                            <h3 className="text-xl font-bold mb-4">Términos y condiciones</h3>
                            <p>{termsAndConditions}</p>
                            <Button
                                onClick={() => setShowFullTerms(false)}
                                className="bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-600 transition duration-300"
                            >
                                Cerrar
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
