'use client'
import Head from "next/head";
import RegisterForm from "../components/registro/registro";
import Image from "next/image";
import React, { useState } from "react";

export default function Home() {
    const [showForm, setShowForm] = useState(false);

    return (
        <main className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
            {/* =======================
                PANEL IZQUIERDO (FONDO + CONTENIDO PRINCIPAL)
               ======================= */}
            <div className="relative w-full lg:w-[55%] h-screen overflow-hidden">
                {/* Fondo de pantalla */}
                <Image
                    src="/Fondo-Izq.png"
                    alt="Fondo"
                    fill
                    className="object-cover"
                    priority // Añadir prioridad para carga más rápida
                />

                {/* Capa de superposición para mejorar contraste de texto */}
                <div className="absolute inset-0 bg-black/20 z-10"></div>

                {/* =======================
                    CONTENIDO ORGANIZADO EN CAPAS
                   ======================= */}

                {/* Capa 1: Logo */}
                <div className="absolute top-5 left-1/2 transform -translate-x-1/2 w-70 h-auto z-20 sm:top-8 sm:w-[300px] md:top-10 lg:top-5 lg:left-[50%] lg:transform-none xl:left-[50%]">
                    <Image
                        src="/Logo-Data.png"
                        alt="Logo"
                        width={908}
                        height={104}
                        className="object-contain"
                    />
                </div>

                {/* Capa 2: Título Principal - FIXED */}
                <div className="absolute top-[10%] left-1/2 transform -translate-x-1/2 w-[90%] max-w-[600px] z-30 text-center md:top-[15%] lg:top-[15%] lg:left-[50%]">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-tighter drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                        ¡Extiende tu seguridad!
                    </h1>
                </div>

                {/* Capa 3: Oferta Destacada */}
                <div className="absolute border border-[#00f3ff] rounded-2xl p-4 bg-black/30 z-20 w-[90%] max-w-[500px] top-[20%] left-1/2 transform -translate-x-1/2 md:top-[35%] lg:w-[40%] lg:left-[75%] lg:top-[25%] xl:top-[30%] xl:left-[75%]">
                    <div className="flex flex-col justify-center items-center gap-2">
                        <span className="text-[#00f3ff] font-semibold text-center text-lg md:text-xl">
                            Renueva tu solución Endpoint por 12 meses y recibe
                        </span>
                        <span className="text-white text-xl md:text-3xl font-bold bg-black/40 px-4 py-2 rounded-lg">
                            6 meses sin costo extra
                        </span>
                        <span className="text-[#ff8000] font-bold text-xl md:text-2xl">
                            Totalmente Gratis
                        </span>
                    </div>
                </div>

                {/* Banner Frase para móviles y tablets */}
                <div className="block lg:hidden absolute top-[45%] left-1/2 transform -translate-x-1/2 w-[80%] max-w-[400px] z-20">
                    <div className="relative w-full aspect-[3/1]">
                        <Image
                            src="/Banner-Frase.png"
                            alt="Banner con frase"
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>

                {/* Personaje - visible solo en lg+ */}
                <div className="hidden lg:block absolute z-20"
                    style={{
                        top: '25%',
                        left: '5%',
                        width: 'clamp(350px, 40vw, 450px)'
                    }}>
                    <div className="relative w-full aspect-[3/4]">
                        <Image
                            src="/Personaje.png"
                            alt="Personaje"
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>

                {/* Banner - visible solo en lg+ */}
                <div className="hidden lg:block absolute z-20"
                    style={{
                        top: '65%',
                        left: '5%',
                        width: 'clamp(300px, 42vw, 800px)'
                    }}>
                    <div className="relative w-full aspect-[3/1]">
                        <Image
                            src="/Banner-Frase.png"
                            alt="Banner con frase"
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>

                {/* Capa 6: Banner Logos */}
                <div className="absolute bottom-[5%] left-1/2 transform -translate-x-1/2 w-[80%] max-w-[400px] z-20 bottom-[20%] sm:bottom-[15%] md:bottom-[15%] lg:bottom-[5%] lg:left-[75%] xl:left-[40%] xl:top-[90%]">
                    <Image
                        src="/Banner-Logos.png"
                        alt="Banner con logos"
                        width={800}
                        height={200}
                        className="object-contain"
                    />
                </div>

                {/* Capa 7: Llamado a la Acción */}
                <div className="absolute w-[90%] max-w-[500px] z-20 text-center text-white font-bold text-sm top-[60%] left-1/2 transform -translate-x-1/2 sm:top-[60%] md:top-[60%] md:text-base lg:text-lg lg:top-[55%] lg:left-[75%] lg:w-[40%] xl:top-[65%] xl:left-[75%]">
                    <p>
                        Aprovecha ahora y renueva tu protección extendida con Dataservicios y Comunicaciones S.A.S
                    </p>
                </div>

                {/* Capa 8: Botón móvil */}
                <button
                    className="absolute bottom-[5%] left-1/2 transform -translate-x-1/2 py-3 px-6 bg-[#ff8000] text-white text-lg font-bold rounded-xl shadow-lg z-50 lg:hidden"
                    onClick={() => setShowForm(!showForm)}
                >
                    {showForm ? "Ocultar formulario" : "Disfruta aquí tu beneficio"}
                </button>
            </div>

            {/* =======================
                PANEL DERECHO (FORMULARIO)
               ======================= */}
            <div className="hidden lg:block lg:w-[45%] h-screen bg-gradient-to-br from-[#0d3458] to-[#00051a] p-8 overflow-y-auto">
                <RegisterForm />
            </div>

            {/* =======================
                FORMULARIO MÓVIL
               ======================= */}
            {showForm && (
                <div className="lg:hidden fixed inset-0 z-50 bg-gradient-to-br from-[#0d3458] to-[#00051a] p-4 overflow-y-auto">
                    <button
                        className="fixed z-[100] top-6 right-6 bg-[#ff8000] hover:bg-[#e67300] rounded-full w-12 h-12 flex items-center justify-center text-white text-2xl transition-all duration-300 shadow-lg"
                        onClick={() => setShowForm(false)}
                    >
                        ✕
                    </button>
                    <RegisterForm />
                </div>
            )}
        </main>
    )
}