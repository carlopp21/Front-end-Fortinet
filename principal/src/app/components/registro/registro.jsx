import useRegister from "../../lib/useRegister";
import { useState } from 'react';
import { useEffect } from "react";

export default function RegisterForm() {
    const {
        nombreUsuario, setNombreUsuario,
        numeroTelefono, setNumeroTelefono,
        cargoUsuario, setCargoUsuario,
        correoUsuario, setCorreoUsuario,
        nombreEmpresa, setNombreEmpresa,
        mensaje,
        handleSubmit,
        mostrarCard,
        setMostrarCard,
    } = useRegister();


    const inputStyle = {
        width: '100%',
        padding: '10px 5px',
        fontSize: '16px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        borderColor: '#00f3ff',
        background: 'transparent',     // clave: deja ver la gradiente del form
        color: '#FFFFFF',              // texto blanco
        boxShadow: 'none',             // evita ese inset blanco fuerte',
        boxShadow: 'inset 0 1px 3px rgba(255, 255, 255, 1)',
        transition: 'all 0.3s ease',
        outline: 'none'
    };

    return (

        <>

            <div

                className="

            "
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >

                <form

                    onSubmit={handleSubmit}
                    className="
                x:p-20
                xl:w-[100vh]
                w-full
                p-8
                border border-[#00f3ff]
                bg-gradient-to-br
                from-[#0d3458]
                to-[#00051a]
                rounded-xl
                shadow-xl
                font-sans
                text-white
                max-h-[90vh]
                overflow-y-auto
                md:p-10
                lg:p-12
                ">
                    <h1 className="text-3xl font-century font-bold mb-6 text-center text-[#00f3ff] ">
                        ¿Quieres renovar tus licencias con nosotros?
                    </h1>
                    <h2 className="text-2xl font-century font-semibold mb-6 text-center text-white">
                        Dejanos tus datos
                    </h2>
                    <div style={{
                        marginBottom: '25px'
                    }}>
                        <div>


                            <div style={{ marginBottom: '25px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: 'white', }}>
                                    Nombre de la empresa
                                </label>
                                <input
                                    className="w-full p-2 rounded-md border border-gray-300 bg-white text-black"
                                    type="text"
                                    value={nombreEmpresa}
                                    onChange={e => setNombreEmpresa(e.target.value)}
                                    required
                                    style={inputStyle}

                                />
                            </div>

                            <div style={{ marginBottom: '25px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: 'white' }}>
                                    Nombres y apellidos
                                </label>
                                <input
                                    className="w-full p-2 rounded-md border border-gray-300 bg-white text-black"
                                    type="text"
                                    value={nombreUsuario}
                                    onChange={e => setNombreUsuario(e.target.value)}
                                    required
                                    style={inputStyle}

                                />
                            </div>
                        </div>

                        {/* Columna derecha */}
                        <div>
                            <div style={{ marginBottom: '25px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: 'white' }}>
                                    Cargo
                                </label>
                                <input
                                    type="text"
                                    className="w-full p-2 rounded-md border border-gray-300 bg-white text-black"
                                    value={cargoUsuario}
                                    onChange={e => setCargoUsuario(e.target.value)}
                                    required
                                    style={inputStyle}

                                />
                            </div>

                            <div style={{ marginBottom: '25px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: 'white' }}>
                                    Teléfono
                                </label>
                                <input
                                    type="text"
                                    className="w-full p-2 rounded-md border border-gray-300 bg-white text-black"
                                    value={numeroTelefono}
                                    onChange={e => setNumeroTelefono(e.target.value)}
                                    required
                                    style={inputStyle}

                                />
                            </div>

                            <div style={{ marginBottom: '25px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: 'white' }}>
                                    Correo
                                </label>
                                <input
                                    className="w-full p-2 rounded-md border border-gray-300 bg-white text-black"
                                    type="email"
                                    value={correoUsuario}
                                    onChange={e => setCorreoUsuario(e.target.value)}
                                    required
                                    style={inputStyle}

                                />
                            </div>

                        </div>
                    </div>
                    <div className="flex justify-center mt-8">
                        <button
                            className="
                                    w-full
                                    max-w-md
                                    py-4
                                    px-6
                                    bg-[#00f3ff]
                                    text-white
                                    font-bold
                                    text-xl
                                    rounded-xl
                                    cursor-pointer
                                    shadow-lg
                                    transition-all
                                    duration-300
                                    hover:bg-[#008b94]
                                    hover:shadow-xl
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-[#00f3ff]
                                    focus:ring-opacity-50
                                    transform
                                    hover:-translate-y-1
                                    active:translate-y-0
                                    "
                            type="submit"
                            onClick={handleSubmit}
                        >
                            Disfruta aquí tu beneficio
                        </button>
                    </div>


                </form>

            </div>
            {/* Modal fuera del contenedor principal */}
            {mostrarCard && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-sm bg-black/60"
                    onClick={() => setMostrarCard(false)}
                >
                    <div
                        className="relative bg-gradient-to-br from-[#0a7bd4] to-[#092a49] text-white rounded-2xl shadow-2xl p-8 w-[420px] max-w-[90vw] max-h-[90vh] flex flex-col items-center"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Botón de cierre */}
                        <button
                            onClick={() => setMostrarCard(false)}
                            className="absolute top-4 right-4 text-gray-300 hover:text-white transition duration-200"
                            aria-label="Cerrar"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Título */}
                        <h2 className="text-3xl font-extrabold text-center tracking-wide mb-1">¡Gracias!</h2>

                        {/* Porcentaje */}
                        <div className="my-2 text-center">
                            <span className="text-6xl font-extrabold tracking-tight text-[#ffffff] drop-shadow-lg">100%</span>
                            <p className="text-xl font-semibold mt-1 text-gray-200">Descuento aplicado</p>
                        </div>

                        {/* Código */}
                        <div className="w-full mt-6 mb-4">
                            <p className="text-center mb-2 text-5x1 text-gray-100">Uno de nuestros asesores se pondra en contacto contigo pronto</p>

                        </div>
                    </div>
                </div>
            )}

        </>


    )
} 
