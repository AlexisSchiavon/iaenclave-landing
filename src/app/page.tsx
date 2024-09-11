'use client'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Intro from '@/components/Intro'
import Services from '@/components/Services'
import Packages from '@/components/Packages'
import ContactForm from '@/components/ContactForm'
import { services } from '@/lib/services'
import { Service } from '@/types'

export default function Home() {
    const [currentSection, setCurrentSection] = useState<string>('intro')
    const [selectedPackage, setSelectedPackage] = useState<string>('')

    const renderSection = () => {
        switch (currentSection) {
            case 'intro':
                return <Intro setCurrentSection={setCurrentSection} />
            case 'services':
                return <Services services={services} setCurrentSection={setCurrentSection} />
            case 'contact':
                return <ContactForm selectedPackage={selectedPackage} setCurrentSection={setCurrentSection} />
            default:
                const service = services.find(s => s.name === currentSection)
                return service ? (
                    <Packages
                        service={service}
                        setCurrentSection={setCurrentSection}
                        setSelectedPackage={setSelectedPackage}
                    />
                ) : null
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
            <AnimatePresence mode="wait">
                {renderSection()}
            </AnimatePresence>
        </div>
    )
}