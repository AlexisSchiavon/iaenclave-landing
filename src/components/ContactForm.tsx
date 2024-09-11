import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import AnimatedBackground from './AnimatedBackground'
import { SetCurrentSectionProps } from '@/types'

interface ContactFormProps extends SetCurrentSectionProps {
    selectedPackage: string
}

interface FormData {
    name: string;
    email: string;
    phone: string;
    message: string;
    package: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    message?: string;
}

export default function ContactForm({ selectedPackage, setCurrentSection }: ContactFormProps) {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        message: '',
        package: selectedPackage,
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submitError, setSubmitError] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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
                                <Button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
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
        </motion.div>
    )
}