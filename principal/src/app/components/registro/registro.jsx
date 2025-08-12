'use client'
import useRegister from "../../hook/useRegister";

export default function RegisterForm() {
    const {
        nombreEmpresa, setNombreEmpresa,
        nitEmpresa, setNitEmpresa,
        tipoLicencia, setTipoLicencia,
        nombreUsuario, setNombreUsuario,
        numeroTelefono, setNumeroTelefono,
        cargoUsuario, setCargoUsuario,
        correoUsuario, setCorreoUsuario,
        loading,
        mensaje,
        handleSubmit,
        mostrarCard,
        setMostrarCard
    } = useRegister();

    // Estilo inline reutilizable (colores coherentes con fondo oscuro)
    const inputStyle = {
        width: '100%',
        padding: '10px 12px',
        fontSize: '16px',
        border: '1px solid rgba(255,255,255,0.15)',
        borderRadius: '8px',
        background: 'transparent',
        color: '#FFFFFF',
        boxShadow: 'none',
        transition: 'all 0.2s ease',
        outline: 'none',
        appearance: 'none'
    };

    // Wrapper del submit: evita reload y controla mostrarCard
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            // Si tu handleSubmit devuelve true/false según éxito:
            // const success = await handleSubmit(e);
            // if (success) setMostrarCard(true);

            // Si handleSubmit no devuelve nada o maneja errores por sí mismo:
            await handleSubmit(e);
            setMostrarCard(true);
        } catch (err) {
            console.error('Error en submit:', err);
            // aquí podrías mostrar un mensaje de error
        }
    };

    return (
        <>
            <div
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
                <form
                    onSubmit={handleFormSubmit}
                    className="
                        w-full p-8 border border-[#00f3ff]
                        bg-gradient-to-br from-[#0d3458] to-[#00051a]
                        rounded-xl shadow-xl font-sans text-white
                        max-h-[90vh] overflow-y-auto md:p-10 lg:p-12
                    "
                >
                    <h1 className="text-3xl font-bold mb-6 text-center text-[#00f3ff]">
                        ¿Quieres renovar tus licencias con nosotros?
                    </h1>
                    <h2 className="text-2xl font-semibold mb-6 text-center text-white">
                        ¡Regístrate!
                    </h2>

                    <div style={{ marginBottom: '25px' }}>
                        <div style={{ marginBottom: '25px' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500, color: 'white' }}>
                                Nombre de la empresa
                            </label>
                            <input
                                type="text"
                                value={nombreEmpresa}
                                onChange={e => setNombreEmpresa(e.target.value)}
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
                                value={nitEmpresa}
                                onChange={e => setNitEmpresa(e.target.value)}
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
                                value={tipoLicencia}
                                onChange={e => setTipoLicencia(e.target.value)}
                                style={inputStyle}
                                aria-label="Tipo de licencia"
                            >
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
                                value={nombreUsuario}
                                onChange={e => setNombreUsuario(e.target.value)}
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
                                value={cargoUsuario}
                                onChange={e => setCargoUsuario(e.target.value)}
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
                                value={numeroTelefono}
                                onChange={e => setNumeroTelefono(e.target.value)}
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
                                value={correoUsuario}
                                onChange={e => setCorreoUsuario(e.target.value)}
                                required
                                style={inputStyle}
                                placeholder="correo@ejemplo.com"
                                aria-label="Correo"
                            />
                        </div>
                    </div>

                    <div className="flex justify-center mt-8">
                        <button
                            className="
                                w-full max-w-md py-4 px-6 bg-[#ff8000] text-white font-bold text-xl
                                rounded-xl cursor-pointer shadow-lg transition-all duration-300
                                hover:bg-[#00ffff] hover:shadow-xl focus:outline-none focus:ring-2
                                focus:ring-[#00f3ff] focus:ring-opacity-50 transform hover:-translate-y-1
                            "
                            type="submit"
                            aria-label="Enviar formulario y obtener beneficio"
                        >
                            {loading ? 'Enviando...' : 'Disfruta aquí tu beneficio'}
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
                            onClick={() => setMostrarCard(false)}
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
