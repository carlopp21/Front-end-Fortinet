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

    // Estilos reutilizables
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
            {/* ==========================
                Formulario principal (siempre visible)
                - Se añadió botón "Cerrar y limpiar" que resetea campos y cierra la card si está abierta.
                - El botón es type="button" para evitar envío accidental.
               ========================== */}
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
                        {/* Nombre de la empresa */}
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

                        {/* NIT (opcional) */}
                        <div style={{ marginBottom: '25px' }}>
                            <label style={labelStyle}>
                                NIT o CC
                                <span className="text-xs text-gray-400 block mt-1">Solo números, sin guiones — <span className="italic">Opcional</span></span>
                            </label>
                            <input
                                type="text"
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

                        {/* Tipo de licencia — menú desplegable con opciones */}
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
                                    cursor: 'pointer'
                                }}
                                aria-label="Tipo de licencia"
                            >
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

                        {/* Nombres y apellidos */}
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

                        {/* Cargo */}
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

                        {/* Teléfono */}
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

                        {/* Correo */}
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

                    {/* Botones: Cerrar y limpiar (left) + Enviar (right) */}
                    <div className="flex gap-4 justify-between mt-8">
                        {/* Botón que cierra el formulario y limpia campos sin enviar */}
                        <button
                            type="button"
                            onClick={() => {
                                // Acción: resetear campos y ocultar la card si está abierta.
                                // Comentario en tercera persona: "Se añadió botón 'Cerrar y limpiar' que llama a resetForm() y setMostrarCard(false)."
                                resetForm();
                                setMostrarCard(false);
                            }}
                            className="py-3 px-4 rounded-xl border border-transparent bg-gray-700 text-white font-medium hover:bg-gray-600 transition"
                            aria-label="Cerrar y limpiar formulario"
                        >
                            Cerrar y limpiar
                        </button>

                        {/* Botón enviar */}
                        <button
                            className={`ml-auto w-full max-w-md py-3 px-6 text-white font-bold text-xl rounded-xl shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#00f3ff] focus:ring-opacity-50 ${loading
                                ? 'bg-gray-500 cursor-not-allowed'
                                : 'bg-[#ff8000] hover:bg-[#00ffff] hover:shadow-xl transform hover:-translate-y-1'
                                }`}
                            type="submit"
                            disabled={loading}
                            aria-label="Enviar formulario"
                        >
                            {loading ? 'Enviando...' : 'Disfruta aquí tu beneficio'}
                        </button>
                    </div>
                </form>
            </div>

            {/* ==========================
                Mostrar la CARD de agradecimiento cuando mostrarCard === true
                - Aquí NO se vuelve a mostrar el formulario; en su lugar se muestra una card simple
                  con el mensaje de agradecimiento y un botón para cerrar y limpiar.
                - Comentario en tercera persona: "Se creó una card de agradecimiento que limpia el formulario al cerrarse."
               ========================== */}
            {mostrarCard && (
                <div className="mt-6">
                    <div className="w-full max-w-md mx-auto p-6 rounded-2xl bg-white/5 border border-[#00f3ff] shadow-lg text-center">
                        <h3 className="text-xl font-bold text-white mb-3">¡Gracias por registrarte!</h3>
                        <p className="text-sm text-gray-200 mb-6">
                            Nuestros asesores se comunicarán contigo pronto para ayudarte con la renovación.
                        </p>

                        {/* Botón cerrar que además limpia las celdas */}
                        <button
                            type="button"
                            onClick={() => {
                                // Comentario en tercera persona: "Al pulsar cerrar, se ejecuta resetForm() para limpiar las celdas
                                // y setMostrarCard(false) para ocultar la card de agradecimiento."
                                resetForm();
                                setMostrarCard(false);
                            }}
                            className="py-3 px-6 bg-[#ff8000] text-white rounded-lg font-semibold hover:opacity-90 transition"
                            aria-label="Cerrar mensaje de agradecimiento"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
