'use client'
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";

// Carga diferida del formulario
const RegisterForm = React.lazy(() => import('../components/registro/registro'));


export default function Home() {
    const [showForm, setShowForm] = useState(false);
    const formRef = useRef(null);

    // Precarga de imágenes críticas
    // Código utiliza la API de link rel="preload"
    useEffect
        //Se ejecuta solo una vez cuando el componente se monta en el DOM
        //El aarray vacio significa "sin dependencias" por lo que no se vulev a ejecutar
        (() => {
            const preloadImages = [
                '/Fondo-Izq.png',
                '/Logo-Data.png',
                '/Banner-Frase.png'
                //Define las rutas de las imágenes que son críticas para la experiencia del usuario
            ];

            preloadImages.forEach(src => {
                const link = document.createElement('link');
                link.rel = 'preload';
                //Indica al navegador que debe precargar este recurso con alta prioridad
                link.as = 'image';
                //Especifica el tipo de recurso (imagen) para que el navegador
                link.href = src;
                //Establece la ruta de la imagen a precargar
                document.head.appendChild(link);
                //Añade el elemento <link> al <head> del documento HTML
            });
        }, []);

    // Scroll suave al formulario en móviles
    const handleShowForm = () => {
        setShowForm(true);
        setTimeout(() => {
            formRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };
    return (
        <main className="relative min-h-screen bg-gray-100 flex flex-col md:flex-row">
            {/* PANEL IZQUIERDO (FONDO + CONTENIDO PRINCIPAL)*/}
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

                {/* CONTENIDO ORGANIZADO EN CAPAS */}

                {/* Capa 1: Logo */}
                <div className="absolute top-5 left-1/2 transform -translate-x-1/2 w-70 h-auto z-20 sm:top-8 sm:w-[300px] md:top-5 lg:top-5 lg:left-[20%] lg:transform-none xl:left-[50%]">
                    <Image
                        src="/Logo-Data.png"
                        alt="Logo"
                        width={908}
                        height={104}
                        className="object-contain"
                    />
                </div>

                {/* Capa 2: Título Principal - FIXED */}
                <div className="absolute top-[10%] left-1/2 transform -translate-x-1/2 w-[90%] max-w-[600px] z-30 text-center sm:top-[19%] md:top-[17%] lg:top-[17%] lg:left-[25%]">
                    <h1 className="text-2xl md:text-2xl lg:text-2xl font-extrabold text-white tracking-tighter drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                        ¡Extiende tu seguridad!
                    </h1>
                </div>

                {/* Capa 3: Oferta Destacada */}
                <div className="absolute border border-[#00f3ff] rounded-2xl p-4 bg-black/30 z-20 w-[90%] max-w-[500px] top-[20%] left-1/2 transform -translate-x-1/2 sm:top-[27%] md:top-[25%] md:w-[65%] lg:w-[40%] lg:left-[78%] lg:top-[10%] xl:w-[340px] xl:top-[25%] xl:left-[72%]">
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
                <div className="block lg:hidden absolute left-1/2 transform -translate-x-1/2 w-[80%] max-w-[400px] z-20 top-[60%] sm:top-[60%] md:top-[65%]">
                    <div className="relative w-full aspect-[3/1] md:top-[55%] ">
                        <Image
                            src="/Banner-Frase.png"
                            alt="Banner con frase"
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>

                <div
                    className="
                            hidden lg:flex lg:flex-row lg:items-start lg:gap-0    /* solo en lg+ muestra el bloque y lo pone en fila */
                            absolute top-[10%] left-[%] z-20                    /* posicionamiento del grupo (usa clases, no inline) */
                            pointer-events-auto
                        "
                >
                    {/* Personaje: ancho responsive (clamp), no se encoje */}
                    <div className="relative flex-shrink-0 w-[clamp(350px,40vw,350px)] aspect-[3/4] lg:top-[40px] lg:left-[-10px] lg:w-[300px] xl:left-[2%] xl:top-[0px]">
                        <Image
                            src="/Personaje.png"
                            alt="Personaje"
                            fill
                            className="object-contain"
                        />
                    </div>

                    {/* Banner: se ajusta a la derecha del personaje y se mantiene pegado */}
                    <div
                        className="
                            relative
                            min-w-0
                            w-[clamp(250px,30vw,800px)]    /* escala automático entre min y max */
                            lg:top-[400px] lg:left-[-250px] lg:w-[400px]
                            xl:top-[420px] xl:left-[-300px]
  "
                    >
                        <Image
                            src="/Banner-Frase.png"
                            alt="Banner con frase"
                            width={1200}
                            height={300}
                            className="w-full h-auto block object-contain"
                        />
                    </div>
                </div>

                {/* Contenedor 2: 50% del ancho del contenedor padre */}
                <div className="
                            absolute 
                            left-1/2 -translate-x-1/2 top-4        /* default: centrado arriba */
                            xl:left-[35%] xl:top-[85%]            /* en xl lo mueves donde quieras (usa % o px) */
                            w-[90%] max-w-[600px] lg:max-w-[480px] top-[76%] md:top-[81%] md:w-[450px] lg:top-[90%] lg:left-[45%] xl:max-w-[560px] 
                            m">
                    <Image
                        src="/Banner-Logos.png"
                        alt="Banner con logos"
                        width={1200}
                        height={300}
                        className="w-full h-auto block object-contain"
                    />
                </div>
            </div>

            {/* Capa 7: Llamado a la Acción */}
            <div className="absolute w-[90%] max-w-[500px] z-20 text-center text-white font-bold text-sm top-[50%] left-1/2 transform -translate-x-1/2 sm:top-[58%] md:top-[63%] md:text-base lg:text-sm lg:top-[67%] lg:left-[42%] lg:w-[25%] xl:w-[400px] xl:top-[64%] xl:left-[39%]">
                <p>
                    Aprovecha ahora y renueva tu protección extendida con Dataservicios y Comunicaciones S.A.S.
                </p>
            </div>

            {/* Capa 8: Botón móvil */}
            <button
                className="fixed bottom-4 left-1/2 transform -translate-x-1/2 py-3 px-6 bg-[#ff8000] text-white text-lg font-bold rounded-xl shadow-lg z-50 lg:hidden transition-all duration-300 hover:scale-105"
                onClick={handleShowForm}
            >
                Disfruta aquí tu beneficio
            </button>



            {/* =======================
                PANEL DERECHO (FORMULARIO)
               ======================= */}
            <div className="hidden lg:block lg:w-[45%] h-screen bg-gradient-to-br from-[#0d3458] to-[#00051a] p-8 overflow-y-auto">
                <React.Suspense fallback={<div className="text-center py-10">Cargando formulario...</div>}>
                    <RegisterForm />
                </React.Suspense>
            </div>

            {/* =======================
                FORMULARIO MÓVIL
               ======================= */}
            {showForm && (
                <div
                    ref={formRef}
                    className="lg:hidden fixed inset-0 z-50 bg-gradient-to-br from-[#0d3458] to-[#00051a] p-4 overflow-y-auto"
                >
                    <React.Suspense fallback={<div className="text-center py-10">Cargando formulario...</div>}>
                        <RegisterForm />
                    </React.Suspense>
                </div>
            )
            }
        </main >
    )
}