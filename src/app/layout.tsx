import React from 'react';
import './globals.css';  // Cambiado a una importación relativa

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="es">
            <body>{children}</body>
        </html>
    );
}