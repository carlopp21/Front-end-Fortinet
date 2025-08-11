'use client'
import Head from "next/head";
import RegisterForm from "../components/registro/registro";
import Image from "next/image";
import React, { useState } from "react";

export default function Home() {
    const [showForm, setShowForm] = useState(false);

    return (
        <main className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
            {/* Panel izquierdo: fondo + personaje */}
            <div className="
                block
                w-full
                relative
                h-screen
                overflow-hidden
            ">
                {/* Fondo */}
                <Image
                    src="/FOndo-Izq.png"
                    alt="Fondo"
                    fill
                    className="object-cover"
                />
                
                {/* Logo centrado */}
                <div className="
                    absolute 
                    top-5
                    left-1/2 
                    transform -translate-x-1/2 
                    w-70 h-auto z-[100]
                    sm:top-[3%]
                    sm:w-[300px]
                    md:top-[3%]
                    md:w-[300px]
                    lg:w-[300px]
                    lg:left-[370px]   
                    lg:top-[25px] 
                    xl:top-[50px]     
                    xl:left-[500px]
                    xl:w-[350px]   
                ">
                    <Image src="/Logo-Data.png" alt="Logo" width={908} height={104} className="object-contain" />
                </div>

                {/* Título principal*/}
                <div className="absolute top-[15%] left-1/2 transform -translate-x-1/2 w-[90%] max-w-[320px] z-[100] text-center
                                md:w-[90vw] md:top-[17%] lg:left-[380px] lg:top-[105px] xl:left-[500px] xl:top-[165px] xl:max-w-[700px]">
                    <h1 className="text-2xl md:text-3xl lg:text-3xl xl:text-[2.8rem] xl:leading-[1.1] font-extrabold text-white tracking-tighter drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] animate-pulse">
                        ¡Extiende tu seguridad!
                    </h1>
                </div>

                {/* Oferta destacada */}
                <div className="border border-[#00f3ff] rounded-2xl p-4 bg-black/10 
                                absolute w-[90%] max-w-[1000px] top-[27%] left-1/2 transform -translate-x-1/2
                                sm:w-[350px] sm:left-[27%] md:w-[400px] md:left-[25%] md:top-[25%] lg:top-[25%] lg:left-[53%] lg:w-[25vw] xl:top-[30%] xl:left-[45%] xl:w-[25vw]
                                lg:transform-none lg:-translate-x-0
                                md:top-[23%] md:left-[8%] sm:left-[8%] z-10 text-center text-white text-base sm:text-2xl md:text-3xl lg:text-2xl leading-tight">
                    <h1 className="flex flex-col justify-center items-center gap-2">
                        <span className="text-[#00f3ff] font-semibold">
                            Renueva tu solución Endpoint por 12 meses y recibe
                        </span>
                        <span className="text-white text-xl md:text-4xl lg:text-3xl font-bold bg-black/30 px-2 py-1 rounded-lg">
                            6 meses sin costo extra
                        </span>
                        <span className="text-[#ff8000] xl:text-8x1 font-bold">
                            Totalmente Gratis
                        </span>
                    </h1>
                </div>

                {/* Llamado a la acción */}
                <div className="absolute w-[90%] max-w-[1000px] top-[53%] left-1/2 transform -translate-x-1/2
                                sm:top-[32%] sm:left-[77%] sm:w-[300px]  md:left-[75%] md:top-[30%] md:w-[420px] md:font-century font-bold lg:top-[68%] lg:left-[48%] lg:w-[30vw] lg:font-century font-bold xl:top-[55%] xl:left-[50%] xl:w-[20vw]
                                lg:transform-none lg:-translate-x-0
                                z-10 text-center text-white text-base sm:text-2xl md:text-3xl lg:text-xl leading-tight">
                    <h1 className="">
                        Aprovecha ahora y renueva tu protección extendida con Dataservicios y Comunicaciones S.A.S
                    </h1>
                </div>

                {/* Botón para mostrar formulario */}
                <button
                    className="
                        absolute
                        top-[65%] left-1/2 transform -translate-x-1/2
                        py-3 px-6 bg-[#ff8000] text-white text-lg font-bold rounded-xl shadow-lg z-50 
                        md:left-[75%] md:top-[60%] md:transform-none
                        sm:top-[66%] 
                        lg:hidden
                    "
                    onClick={() => setShowForm(!showForm)}
                >
                    {showForm ? "Disfruta aquí tu beneficio" : "Disfruta aquí tu beneficio"}
                </button>

                {/* Banner-Frase */}
                <div className="absolute w-[80%] max-w-[800px] top-[75%] left-1/2 transform -translate-x-1/2
                                sm:top-[70%] sm:left-[50%] sm:w-[500px] md:top-[73%] md:left-[47%] md:w-[500px] lg:top-[63%] lg:left-[24%] lg:w-[300px] xl:w-[85vh] xl:top-[64%] xl:left-[47%] aspect-[3/1] z-10">
                    <Image
                        src="/Banner-Frase.png"
                        alt="Banner con frase"
                        fill
                        className="object-contain"
                    />
                </div>

                {/* Banner-Logos */}
                <div className="absolute w-[80%] max-w-[1000px] top-[85%] left-1/2 transform -translate-x-1/2
                                sm:top-[80%] sm:left-[50%] sm:w-[400px] md:top-[85%] md:left-[46%] md:w-[400px] lg:top-[71%] lg:left-[24%] lg:w-[300px] xl:top-[80%] xl:left-[50vh]  xl:w-[60vh] aspect-[3/1] z-10">
                    <Image
                        src="/Banner-Logos.png"
                        alt="Banner con logos"
                        fill
                        className="object-contain"
                    />
                </div>

                {/* Personaje (solo visible en pantallas grandes) */}
                <div className="hidden lg:block absolute top-[20%] left-[3%] transform w-[300px] aspect-[3/4] lg:top-[15%] lg:left-[1%] xl:w-[50vh] xl:top-[15%] z-20 ">
                    <Image
                        src="/Personaje.png"
                        alt="Personaje"
                        fill
                        className="object-contain"
                    />
                </div>
            </div>

            {/* Panel derecho: formulario - Visible solo en pantallas grandes */}
            <div className="
                hidden
                lg:block
                bg-gradient-to-br
                from-[#0d3458]
                to-[#00051a]
                items-center
                justify-center
                p-8
            ">
                <RegisterForm />
            </div>

            {/* Formulario en móviles (solo cuando se activa) */}
            {showForm && (
                <div className="
                    lg:hidden
                    fixed
                    inset-0
                    z-50
                    bg-gradient-to-br
                    from-[#0d3458]
                    to-[#00051a]
                    p-4
                    overflow-y-auto
                ">
                    <button
                        className="
                            fixed
                            z-[100]
                            top-6 right-6
                            bg-[#ff8000] hover:bg-[#e67300]
                            rounded-full w-12 h-12
                            flex items-center justify-center
                            text-white text-2xl
                            transition-all duration-300
                            shadow-lg
                        "
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
