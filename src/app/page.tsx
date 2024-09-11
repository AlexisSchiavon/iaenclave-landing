'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import Intro from '@/components/Intro'
import Services from '@/components/Services'
import Packages from '@/components/Packages'
import ContactForm from '@/components/ContactForm'
import { services } from '@/lib/services'
import { Service } from '@/types'
import { initEmailJS } from '../components/EmailJSInit';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export default function Home() {
    const [currentSection, setCurrentSection] = useState('intro')
    const [selectedPackage, setSelectedPackage] = useState('')
    const router = useRouter()

    useEffect(() => {
        const handlePopState = (event: PopStateEvent) => {
            event.preventDefault()
            if (currentSection !== 'intro') {
                setCurrentSection('intro')
                router.push('/')
            }
        }

        window.addEventListener('popstate', handlePopState)

        return () => {
            window.removeEventListener('popstate', handlePopState)
        }
    }, [currentSection, router])

    const navigateTo = (section: string) => {
        setCurrentSection(section)
        router.push(`/?section=${section}`)
    }

    const renderIntro = () => (
        <Intro setCurrentSection={navigateTo} />
    )

    const renderServices = () => (
        <Services services={services} setCurrentSection={navigateTo} />
    )

    const renderPackages = (serviceName: string) => {
        const service = services.find(s => s.name === serviceName)
        return service ? (
            <Packages
                service={service}
                setCurrentSection={navigateTo}
                setSelectedPackage={setSelectedPackage}
            />
        ) : null
    }

    const renderContactForm = () => (
        <ContactForm selectedPackage={selectedPackage} setCurrentSection={navigateTo} />
    )

    useEffect(() => {
        initEmailJS();
    }, []);

    return (
        <main className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
            <AnimatePresence mode="wait">
                {currentSection === 'intro' && renderIntro()}
                {currentSection === 'services' && renderServices()}
                {services.map(service => service.name === currentSection && renderPackages(service.name))}
                {currentSection === 'contact' && renderContactForm()}
            </AnimatePresence>
        </main>
    )
}