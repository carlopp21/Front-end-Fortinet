'use client'
import React, { useMemo } from "react";
import useRegister from "../../hook/useRegister";

export default function RegisterForm() {
    const {
        formData,
        handleChange,
        loading,
        mensaje,
        handleSubmit,
        mostrarCard,
        setMostrarCard,
        resetForm
    } = useRegister();

    //

    // Memoizar estilos para evitar recreación en cada render
    const inputStyle = useMemo(() => ({
        width: '100%',
        padding: '10px 12px',
        fontSize: '16px',
        border: '1px solid rgba(255,255,255,0.15)',
        borderRadius: '8px',
        backgroundColor: '#0d3458',
        color: '#FFFFFF',
        outline: 'none',
        boxShadow: 'none',
        transition: 'all 0.2s ease',
        appearance: 'none'
    }), []);

    return (
        <>
            <div className="transform transition-transform duration-300 ">
                <form
                    onSubmit={handleSubmit}
                    className="w-full p-8 border border-[#00f3ff] bg-gradient-to-br from-[#0d3458] to-[#00051a] rounded-xl shadow-xl"
                >
                    <h1 className="
                            text-sm 
                            w-[200px] 
                            font-bold 
                            mb-6 
                            items-center 
                            text-center 
                            text-[#00f3ff] 
                            relative 
                            top-8 
                            mx-auto 
                            md:absolute 
                            md:top-[14%] 
                            md:left-1/2 
                            md:-translate-x-1/2 
                            md:mx-0 
                            xl:text-xl 
                            xl:w-[300px] 
                            lg:text-xl
                            lg:left-[77%]
                            md:transform         
                            xl:left-[77%]  
                            ">
                        ¿Quieres renovar tus licencias con nosotros?
                    </h1>
                    <h2 className="text-1xl font-semibold mb-6 text-center text-white mt-[50px] left-[15%] md:mt-[140px] lg:mt-[180px] xl:mt-[150px]">
                        ¡Regístrate!
                    </h2>

                    <div style={{ marginBottom: '25px' }}>
                        {/* Todos los inputs corregidos */}
                        <div style={{ marginBottom: '25px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: 'white' }}>
                                Nombre de la empresa
                            </label>
                            <input
                                type="text"
                                value={formData.nombreEmpresa}
                                onChange={e => handleChange('nombreEmpresa', e.target.value)}
                                required
                                style={inputStyle}
                                placeholder="Ej. Empresa S.A."
                                aria-label="Nombre de la empresa"
                            />
                        </div>

                        <div style={{ marginBottom: '25px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: 'white' }}>
                                NIT
                            </label>
                            <input
                                type="text"
                                value={formData.nitEmpresa}
                                onChange={e => handleChange('nitEmpresa', e.target.value)}
                                style={inputStyle}
                                placeholder="NIT"
                                aria-label="NIT"
                            />
                        </div>

                        <div style={{ marginBottom: '25px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: 'white' }}>
                                Tipo de licencia
                            </label>
                            <select
                            
                                value={formData.tipoLicencia}
                                onChange={e => handleChange('tipoLicencia', e.target.value)}
                                style={inputStyle}
                                aria-label="Tipo de licencia"
                            >

                                <svg xmlns="http://www.w3.org/2000/svg"  width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M12 5v14M19 12l-7 7-7-7" />
                                </svg>                                

                                <option value="" disabled>Selecciona una opción</option>
                                <option value="BITDEFENDER">Bitdefender</option>
                                <option value="ESET">ESET</option>
                                <option value="KASPERSKY">Kaspersky</option>
                                <option value="SOPHOS">SOPHOS</option>
                            </select>
                        </div>

                        <div style={{ marginBottom: '25px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: 'white' }}>
                                Nombres y apellidos
                            </label>
                            <input
                                type="text"
                                value={formData.nombreUsuario}
                                onChange={e => handleChange('nombreUsuario', e.target.value)}
                                required
                                style={inputStyle}
                                placeholder="Tu nombre completo"
                                aria-label="Nombres y apellidos"
                            />
                        </div>

                        <div style={{ marginBottom: '25px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: 'white' }}>
                                Cargo
                            </label>
                            <input
                                type="text"
                                value={formData.cargoUsuario}
                                onChange={e => handleChange('cargoUsuario', e.target.value)}
                                required
                                style={inputStyle}
                                placeholder="Cargo"
                                aria-label="Cargo"
                            />
                        </div>

                        <div style={{ marginBottom: '25px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: 'white' }}>
                                Teléfono
                            </label>
                            <input
                                type="text"
                                value={formData.numeroTelefono}
                                onChange={e => handleChange('numeroTelefono', e.target.value)}
                                required
                                style={inputStyle}
                                placeholder="Teléfono"
                                aria-label="Teléfono"
                            />
                        </div>

                        <div style={{ marginBottom: '25px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: 'white' }}>
                                Correo
                            </label>
                            <input
                                type="email"
                                value={formData.correoUsuario}
                                onChange={e => handleChange('correoUsuario', e.target.value)}
                                required
                                style={inputStyle}
                                placeholder="correo@ejemplo.com"
                                aria-label="Correo"
                            />
                        </div>
                    </div>
                    <div className="flex justify-center mt-8">
                        <button
                            className={`w-full max-w-md py-4 px-6 text-white font-bold text-xl rounded-xl shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#00f3ff] focus:ring-opacity-50 ${loading
                                ? 'bg-gray-500 cursor-not-allowed'
                                : 'bg-[#ff8000] hover:bg-[#00ffff] hover:shadow-xl transform hover:-translate-y-1'
                                }`}
                            type="submit"
                            disabled={loading}
                            aria-label="Enviar formulario"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center">
                                    <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Enviando...
                                </div>
                            ) : 'Disfruta aquí tu beneficio'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Modal */}
            {mostrarCard && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-sm bg-black/60"
                    onClick={() => setMostrarCard(false)}
                >
                    <div
                        className="relative bg-gradient-to-br from-[#0a7bd4] to-[#092a49] text-white rounded-2xl shadow-2xl p-8 w-[420px] max-w-[90vw] max-h-[90vh] flex flex-col items-center"
                        onClick={e => e.stopPropagation()}
                        role="dialog"
                        aria-modal="true"
                        aria-label="Modal de confirmación"
                    >
                        <button
                            onClick={() => {
                                resetForm();
                                setMostrarCard(false);
                            }}
                            className="absolute top-4 right-4 text-gray-300 hover:text-white transition duration-200"
                            aria-label="Cerrar"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <h2 className="text-3xl font-extrabold text-center tracking-wide mb-1">¡Gracias!</h2>

                        <div className="w-full mt-6 mb-4">
                            <p className="text-center mb-2 text-5xl text-gray-100">
                                Uno de nuestros asesores se pondrá en contacto contigo pronto
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}