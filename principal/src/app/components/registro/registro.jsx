'use client'
import React, { useMemo, useState } from "react";
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

    const [fieldErrors, setFieldErrors] = useState({
        nombreEmpresa: '',
        nitEmpresa: '',
        tipoLicencia: '',
        nombreUsuario: '',
        numeroTelefono: '',
        cargoUsuario: '',
        correoUsuario: ''
    });

    // Validación en tiempo real
    const validateField = (field, value) => {
        let error = '';

        switch (field) {
            case 'nombreEmpresa':
                if (!value.trim()) error = 'Debe ingresar el nombre de la empresa';
                else if (value.length < 3) error = 'Mínimo 3 caracteres';
                break;
            case 'nitEmpresa':
                if (value && value.trim() !== "") {
                    if (!/^\d+$/.test(value)) {
                        error = "Solo se permiten numeros"
                    }
                }
                break;
            case 'tipoLicencia':
                if (!value) error = 'Por favor seleccione un tipo de licencia';
                break;
            case 'nombreUsuario':
                if (!value.trim()) error = 'El nombre completo es obligatorio';
                else if (value.length < 5) error = 'Mínimo 5 caracteres';
                break;
            case 'cargoUsuario':
                if (!value.trim()) error = 'Debe especificar su cargo';
                break;
            case 'numeroTelefono':
                if (!value.trim()) error = 'El teléfono es obligatorio';
                else if (!/^\d{7,15}$/.test(value)) error = 'Teléfono inválido (7-15 dígitos)';
                break;
            case 'correoUsuario':
                if (!value.trim()) error = 'El correo electrónico es obligatorio';
                else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Formato de correo inválido';
                break;
            default:
                break;
        }

        setFieldErrors(prev => ({ ...prev, [field]: error }));
        return error === '';
    };

    // Handler combinado para cambio y validación
    const handleFieldChange = (field, value) => {
        handleChange(field, value);
        validateField(field, value);
    };

    // Validar todo el formulario antes de enviar
    const validateForm = () => {
        let isValid = true;
        // Nota: aquí valida todos los campos del formData usando la función de validación.
        for (const field in formData) {
            if (!validateField(field, formData[field])) {
                isValid = false;
            }
        }

        return isValid;
    };

    // Handler de envío con validación completa
    const handleSubmitWithValidation = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        // Si pasa la validación, proceder con el envío
        await handleSubmit(e);
    };

    // Estilos
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

    const errorStyle = {
        color: '#ff6b6b',
        fontSize: '0.85rem',
        marginTop: '4px'
    };

    const labelStyle = {
        display: 'block',
        marginBottom: '8px',
        fontWeight: 500,
        color: 'white',
        position: 'relative'
    };

    return (
        <>
            <div className="transform transition-transform duration-300 ">
                <form
                    onSubmit={handleSubmitWithValidation}
                    className="w-full p-8 border border-[#00f3ff] bg-gradient-to-br from-[#0d3458] to-[#00051a] rounded-xl shadow-xl"
                >
                    <h1 className="
                        text-sm
                        w-full
                        max-w-[350px]
                        font-bold
                        mb-6
                        text-center
                        text-[#00f3ff]
                        mx-auto
                        xl:text-xl
                        ">
                        ¿Quieres renovar tus licencias con nosotros?
                    </h1>

                    <h2 className="text-xl font-semibold mb-6 text-center text-white mt-[50px] left-[15%] md:mt-[0px] lg:mt-[00px] xl:mt-[00px]">
                        ¡Regístrate!
                    </h2>

                    <div style={{ marginBottom: '25px' }}>
                        {/* Campo: Nombre de la empresa */}
                        <div style={{ marginBottom: '25px' }}>
                            <label style={labelStyle}>
                                Nombre de la empresa
                                <span className="text-red-500 ml-1">*</span>
                                <span className="text-xs text-gray-400 block mt-1">Ej: Mi Empresa S.A.S.</span>
                            </label>
                            <input
                                type="text"
                                value={formData.nombreEmpresa}
                                onChange={e => handleFieldChange('nombreEmpresa', e.target.value)}
                                required
                                style={{
                                    ...inputStyle,
                                    borderColor: fieldErrors.nombreEmpresa ? '#ff6b6b' : 'rgba(255,255,255,0.15)'
                                }}
                                placeholder="Ej. Empresa S.A."
                                aria-label="Nombre de la empresa"
                            />
                            {fieldErrors.nombreEmpresa && (
                                <p style={errorStyle}>{fieldErrors.nombreEmpresa}</p>
                            )}
                        </div>

                        {/* Campo: NIT */}
                        <div style={{ marginBottom: '25px' }}>
                            <label style={labelStyle}>
                                NIT o CC
                                {/* Se eliminó el atributo no válido "optional" ya que React lo muestra como advertencia.
                                    En su lugar, se añadió un texto visible "Opcional" para que el usuario sepa que no es obligatorio. */}
                                <span className="text-xs text-gray-400 block mt-1">Solo números, sin guiones — <span className="italic">Opcional</span></span>
                            </label>
                            <input
                                type="text"
                                /* Se removió: optional (no es un atributo HTML válido) */
                                value={formData.nitEmpresa}
                                onChange={e => handleFieldChange('nitEmpresa', e.target.value)}
                                style={{
                                    ...inputStyle,
                                    borderColor: fieldErrors.nitEmpresa ? '#ff6b6b' : 'rgba(255,255,255,0.15)'
                                }}
                                placeholder="NIT o CC"
                                aria-label="NIT o CC"
                            />
                            {fieldErrors.nitEmpresa && (
                                <p style={errorStyle}>{fieldErrors.nitEmpresa}</p>
                            )}
                        </div>

                        {/* Campo: Tipo de licencia (menú desplegable con opciones) */}
                        <div style={{ marginBottom: '25px' }}>
                            <label style={labelStyle}>
                                Tipo de licencia
                                <span className="text-red-500 ml-1">*</span>
                            </label>
                            <select
                                value={formData.tipoLicencia}
                                onChange={e => handleFieldChange('tipoLicencia', e.target.value)}
                                style={{
                                    ...inputStyle,
                                    borderColor: fieldErrors.tipoLicencia ? '#ff6b6b' : 'rgba(255,255,255,0.15)',
                                    // Asegurar que el cursor muestre que es un elemento seleccionable
                                    cursor: 'pointer'
                                }}
                                aria-label="Tipo de licencia"
                            >
                                {/* Opción placeholder para forzar selección explícita */}
                                <option value="" disabled>Selecciona una opción</option>
                                <option value="BITDEFENDER">Bitdefender</option>
                                <option value="ESET">ESET</option>
                                <option value="KASPERSKY">Kaspersky</option>
                                <option value="SOPHOS">SOPHOS</option>
                            </select>
                            {fieldErrors.tipoLicencia && (
                                <p style={errorStyle}>{fieldErrors.tipoLicencia}</p>
                            )}
                        </div>

                        {/* Resto de campos... */}
                        <div style={{ marginBottom: '25px' }}>
                            <label style={labelStyle}>
                                Nombres y apellidos
                                <span className="text-red-500 ml-1">*</span>
                                <span className="text-xs text-gray-400 block mt-1">Mínimo 5 caracteres</span>
                            </label>
                            <input
                                type="text"
                                value={formData.nombreUsuario}
                                onChange={e => handleFieldChange('nombreUsuario', e.target.value)}
                                required
                                style={{
                                    ...inputStyle,
                                    borderColor: fieldErrors.nombreUsuario ? '#ff6b6b' : 'rgba(255,255,255,0.15)'
                                }}
                                placeholder="Tu nombre completo"
                                aria-label="Nombres y apellidos"
                            />
                            {fieldErrors.nombreUsuario && (
                                <p style={errorStyle}>{fieldErrors.nombreUsuario}</p>
                            )}
                        </div>

                        <div style={{ marginBottom: '25px' }}>
                            <label style={labelStyle}>
                                Cargo
                                <span className="text-red-500 ml-1">*</span>
                                <span className="text-xs text-gray-400 block mt-1">Ej: Gerente de TI</span>
                            </label>
                            <input
                                type="text"
                                value={formData.cargoUsuario}
                                onChange={e => handleFieldChange('cargoUsuario', e.target.value)}
                                required
                                style={{
                                    ...inputStyle,
                                    borderColor: fieldErrors.cargoUsuario ? '#ff6b6b' : 'rgba(255,255,255,0.15)'
                                }}
                                placeholder="Cargo"
                                aria-label="Cargo"
                            />
                            {fieldErrors.cargoUsuario && (
                                <p style={errorStyle}>{fieldErrors.cargoUsuario}</p>
                            )}
                        </div>

                        <div style={{ marginBottom: '25px' }}>
                            <label style={labelStyle}>
                                Teléfono
                                <span className="text-red-500 ml-1">*</span>
                                <span className="text-xs text-gray-400 block mt-1">Solo números (7-15 dígitos)</span>
                            </label>
                            <input
                                type="text"
                                value={formData.numeroTelefono}
                                onChange={e => handleFieldChange('numeroTelefono', e.target.value)}
                                required
                                style={{
                                    ...inputStyle,
                                    borderColor: fieldErrors.numeroTelefono ? '#ff6b6b' : 'rgba(255,255,255,0.15)'
                                }}
                                placeholder="Teléfono"
                                aria-label="Teléfono"
                            />
                            {fieldErrors.numeroTelefono && (
                                <p style={errorStyle}>{fieldErrors.numeroTelefono}</p>
                            )}
                        </div>

                        <div style={{ marginBottom: '25px' }}>
                            <label style={labelStyle}>
                                Correo
                                <span className="text-red-500 ml-1">*</span>
                                <span className="text-xs text-gray-400 block mt-1">Formato: usuario@dominio.com</span>
                            </label>
                            <input
                                type="email"
                                value={formData.correoUsuario}
                                onChange={e => handleFieldChange('correoUsuario', e.target.value)}
                                required
                                style={{
                                    ...inputStyle,
                                    borderColor: fieldErrors.correoUsuario ? '#ff6b6b' : 'rgba(255,255,255,0.15)'
                                }}
                                placeholder="correo@ejemplo.com"
                                aria-label="Correo"
                            />
                            {fieldErrors.correoUsuario && (
                                <p style={errorStyle}>{fieldErrors.correoUsuario}</p>
                            )}
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

            {/* Renderizamos el form solo si mostrarCard es true */}
            {mostrarCard && (
                <form
                    onSubmit={handleSubmitWithValidation}
                    // IMPORTANTE: añadimos 'relative' para que el botón absolute
                    // se posicione respecto al propio formulario.
                    className="relative w-full p-8 border border-[#00f3ff] bg-gradient-to-br from-[#0d3458] to-[#00051a] rounded-xl shadow-xl"
                >
                    {/* ------------- BOTÓN DE CERRAR (solo visible en xs/sm/md) ------------- */}
                    <button
                        type="button"
                        onClick={() => {
                            // Resetea los campos (usa tu función existente)
                            resetForm();
                            // Oculta el formulario localmente (lo cerramos)
                            setMostrarCard(false);
                        }}
                        // lg:hidden -> oculto en pantallas lg y superiores; por tanto se muestra en xs/sm/md
                        className="absolute top-4 right-4 text-gray-300 hover:text-white transition duration-200 lg:hidden"
                        aria-label="Cerrar formulario"
                    >
                        {/* Icono SVG (igual que el que usas en el modal) */}
                        x
                    </button>

                    {/* ---------------- AQUI VA TODO TU CONTENIDO ACTUAL DEL FORM (inputs, h2, botón enviar...) ---------------- */}
                    {/* Si prefieres, aquí se puede insertar {formContent} si se extrajo previamente */}
                    {/* Para evitar duplicar el markup, se puede mover la porción superior a una variable y reutilizarla */}
                </form>
            )}

        </>
    );
}
