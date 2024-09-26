import { Service } from '@/types'

export const services: Service[] = [
    {
        name: "Organizador de Inventarios",
        description: {
            what: "Es una herramienta que ayuda a las empresas a gestionar su inventario de manera más eficiente. Usa inteligencia artificial para predecir qué productos se venderán más y cuándo es necesario reabastecerlos.",
            how: "Analiza datos de ventas pasadas y patrones de compra para anticiparse a la demanda de productos. Así, las empresas evitan quedarse sin stock o tener productos acumulados que no se venden.",
            benefit: "Ahorra dinero y tiempo al evitar compras innecesarias y permite tener siempre disponibles los productos que más se necesitan."
        },
        packages: [
            { name: "Básico", features: ["Predicción de demanda"] },
            { name: "Avanzado", features: ["Predicción de demanda", "Clasificación de productos", "Optimización de inventario"] },
            { name: "Hiper Personalizado", features: ["Contacta para más detalles"] }
        ]
    },
    {
        name: "Automatización de Facturación Inteligente",
        description: {
            what: "Este servicio genera automáticamente las facturas de las ventas de la empresa, evitando errores y facilitando el seguimiento de los pagos.",
            how: "El sistema toma la información de las ventas y crea las facturas correspondientes de manera rápida y automática. Además, organiza y clasifica las facturas para que siempre estén accesibles.",
            benefit: "Reduce el tiempo que se dedica a la facturación manual y mejora el control de los documentos financieros, evitando errores comunes en el proceso."
        },
        packages: [
            { name: "Básico", features: ["Generación automática de facturas basadas en ventas"] },
            { name: "Avanzado", features: ["Generación automática de facturas basadas en ventas", "Clasificación de facturas y organización de pagos", "Detección de facturas duplicadas o erróneas"] },
            { name: "Hiper Personalizado", features: ["Contacta para más detalles"] }
        ]
    },
    {
        name: "Scraping Inteligente de Competencia",
        description: {
            what: "Es una herramienta que rastrea automáticamente los precios y la disponibilidad de productos en los sitios web de la competencia, para que la empresa pueda mantenerse al día con el mercado.",
            how: "El sistema busca información en tiempo real de los competidores y genera informes comparativos sobre precios y promociones.",
            benefit: "Permite ajustar los precios y estrategias de ventas según lo que está haciendo la competencia, lo que ayuda a mantenerse competitivo sin tener que realizar búsquedas manuales."
        },
        packages: [
            { name: "Básico", features: ["Rastreo de cambios de precios y productos de competidores"] },
            { name: "Avanzado", features: ["Rastreo de cambios de precios y productos de competidores", "Análisis comparativo de precios y tendencias de productos", "Alertas sobre cambios significativos"] },
            { name: "Hiper Personalizado", features: ["Contacta para más detalles"] }
        ]
    },
    {
        name: "Automatización de Procesos de Recursos Humanos",
        description: {
            what: "Este servicio automatiza tareas comunes del área de recursos humanos, como la clasificación de currículums y la selección de candidatos.",
            how: "El sistema analiza automáticamente los currículums que llegan a la empresa y selecciona los que mejor se ajustan a las necesidades del puesto. También puede generar informes sobre el proceso de contratación.",
            benefit: "Acelera el proceso de contratación, ayudando a encontrar a los mejores candidatos de forma más rápida y eficiente, y reduciendo la carga de trabajo del equipo de recursos humanos."
        },
        packages: [
            { name: "Básico", features: ["Clasificación de CVs basados en experiencia, habilidades y palabras clave"] },
            { name: "Avanzado", features: ["Clasificación de CVs basados en experiencia, habilidades y palabras clave", "Sugerencias de candidatos ideales", "Reportes de eficiencia de contratación"] },
            { name: "Hiper Personalizado", features: ["Contacta para más detalles"] }
        ]
    }
]