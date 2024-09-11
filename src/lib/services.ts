import { Service } from '@/types'

export const services: Service[] = [
    {
        name: "Organizador de Inventarios",
        packages: [
            { name: "Básico", features: ["Predicción de demanda"] },
            { name: "Avanzado", features: ["Predicción de demanda", "Clasificación de productos", "Optimización de inventario"] },
            { name: "Hiper Personalizado", features: ["Contacta para más detalles"] }
        ]
    },
    {
        name: "Automatización de Facturación Inteligente",
        packages: [
            { name: "Básico", features: ["Generación automática de facturas basadas en ventas"] },
            { name: "Avanzado", features: ["Generación automática de facturas basadas en ventas", "Clasificación de facturas y organización de pagos", "Detección de facturas duplicadas o erróneas"] },
            { name: "Hiper Personalizado", features: ["Contacta para más detalles"] }
        ]
    },
    {
        name: "Scraping Inteligente de Competencia",
        packages: [
            { name: "Básico", features: ["Rastreo de cambios de precios y productos de competidores"] },
            { name: "Avanzado", features: ["Rastreo de cambios de precios y productos de competidores", "Análisis comparativo de precios y tendencias de productos", "Alertas sobre cambios significativos"] },
            { name: "Hiper Personalizado", features: ["Contacta para más detalles"] }
        ]
    },
    {
        name: "Automatización de Procesos de Recursos Humanos",
        packages: [
            { name: "Básico", features: ["Clasificación de CVs basados en experiencia, habilidades y palabras clave"] },
            { name: "Avanzado", features: ["Clasificación de CVs basados en experiencia, habilidades y palabras clave", "Sugerencias de candidatos ideales", "Reportes de eficiencia de contratación"] },
            { name: "Hiper Personalizado", features: ["Contacta para más detalles"] }
        ]
    }
]