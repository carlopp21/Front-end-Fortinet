'use client'
import React, { useMemo, useState } from "react";
import useRegister from "../../hook/useRegister";

/**
 * Componente RegisterForm
 *
 * Este componente muestra el formulario de registro y, tras un envío exitoso,
 * muestra una card de agradecimiento. Todos los comentarios están redactados
 * en tercera persona para explicar qué hace cada bloque.
 */
export default function RegisterForm() {
    // Se obtiene del hook useRegister: estado del formulario, manejadores y utilidades.
    // - formData: objeto con los valores actuales del formulario.
    // - handleChange: función para actualizar campos desde el hook.
    // - loading: boolean que indica si hay un envío en curso.
    // - mensaje: (opcional) mensaje proveniente del hook.
    // - handleSubmit: función que realiza la petición/registro (se espera que sea async).
    // - mostrarCard: boolean que controla la visibilidad de la card de agradecimiento.
    // - setMostrarCard: setter para mostrar/ocultar la card.
    // - resetForm: función que limpia los campos del formulario.
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

    // Se define estado local para almacenar errores por campo (validación en tiempo real).
    const [fieldErrors, setFieldErrors] = useState({
        nombreEmpresa: '',
        nitEmpresa: '',
        tipoLicencia: '',
        nombreUsuario: '',
        numeroTelefono: '',
        cargoUsuario: '',
        correoUsuario: ''
    });

    /**
     * Se define la función validateField(field, value)
     * - Propósito: validar un campo concreto según reglas definidas.
     * - Comportamiento: actualiza fieldErrors y devuelve true si el campo es válido.
     */
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
                        error = "Solo se permiten numeros";
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

        // Se actualiza el estado con el error (o cadena vacía si no hay error).
        setFieldErrors(prev => ({ ...prev, [field]: error }));
        // Se retorna true si no hay error.
        return error === '';
    };

    /**
     * Se define handleFieldChange(field, value)
     * - Propósito: actualizar valor en el hook y ejecutar validación inmediata.
     */
    const handleFieldChange = (field, value) => {
        // Se actualiza el estado global del formulario a través del hook.
        handleChange(field, value);
        // Se valida el campo inmediatamente para dar feedback al usuario.
        validateField(field, value);
    };

    /**
     * Se define validateForm()
     * - Propósito: validar todos los campos del formData antes de intentar enviar.
     * - Comportamiento: recorre formData, valida campo a campo y devuelve boolean global.
     */
    const validateForm = () => {
        let isValid = true;
        // Se itera sobre cada propiedad de formData y se ejecuta validateField.
        for (const field in formData) {
            if (!validateField(field, formData[field])) {
                isValid = false;
            }
        }
        // Se retorna si todo es válido.
        return isValid;
    };

    /**
     * Se define handleSubmitWithValidation(e)
     * - Propósito: manejar el submit del formulario con validación previa.
     * - Flujo:
     *   1) Evita el comportamiento por defecto del formulario.
     *   2) Valida todo el formulario; si no pasa, corta la ejecución.
     *   3) Llama a handleSubmit (función del hook que hace la petición).
     *   4) Si handleSubmit cumple sin lanzar error, muestra la card de agradecimiento
     *      setMostrarCard(true) para indicar al usuario que la solicitud fue recibida.
     *   5) Si ocurre un error (excepción) durante handleSubmit, mantiene la UI y
     *      permite al usuario corregir/volver a intentar.
     *
     * Nota práctica: no se resetean los campos aquí para que el usuario pueda ver
     * lo que envió; el reset se ejecuta cuando el usuario cierra la card.
     */
    const handleSubmitWithValidation = async (e) => {
        e.preventDefault();

        // Se valida el formulario entero antes de enviar.
        if (!validateForm()) {
            // Si la validación falla, se detiene el proceso.
            return;
        }

        try {
            // Se llama a la función del hook que hace la petición/registro.
            // Se espera que handleSubmit sea async; si falla, lanzará excepción.
            await handleSubmit(e);

            // Si la petición fue exitosa, se solicita mostrar la card de agradecimiento.
            setMostrarCard(true);

            // Nota: NO se llama a resetForm() aquí porque se quiere que el usuario
            // pueda ver (si es necesario) lo que envió; la limpieza se hace al cerrar.
        } catch (error) {
            // Si ocurrió un error en el envío, se deja que el hook o el componente
            // muestren el mensaje de error correspondiente (ej. mediante `mensaje`).
            // Aquí se podría mapear el error a fieldErrors si la API devolviera detalles.
            console.error("Error al enviar formulario:", error);
        }
    };

    /**
     * Estilos reutilizables (se definen con useMemo para no recrearlos en cada render).
     * - inputStyle: estilo base para inputs/selects.
     * - errorStyle: estilo para mensajes de error bajo cada input.
     * - labelStyle: estilo para etiquetas/labels de cada campo.
     */
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

    /**
     * Renderizado:
     * - Si mostrarCard === false -> se muestra el formulario.
     * - Si mostrarCard === true  -> se muestra la card de agradecimiento.
     *
     * De esta manera, la card sustituye al formulario tras un envío exitoso.
     */
    return (
        <>
            {/* ---------- FORMULARIO: se muestra únicamente cuando NO está la card ---------- */}
            {!mostrarCard && (
                <div className="transform transition-transform duration-300 ">
                    <form
                        onSubmit={handleSubmitWithValidation} // Se enlaza la función de submit con validación.
                        className="w-full p-8 border border-[#00f3ff] bg-gradient-to-br from-[#0d3458] to-[#00051a] rounded-xl shadow-xl"
                    >
                        {/* Título informativo del formulario */}
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

                            {/* Campo: NIT (opcional) */}
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

                            {/* Campo: Tipo de licencia (menú desplegable) */}
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

                            {/* Resto de campos: nombreUsuario, cargoUsuario, numeroTelefono, correoUsuario */}
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

                        {/* Botones */}
                        <div className="flex gap-4 justify-between mt-8">
                            {/* Botón que cierra el formulario y limpia campos sin enviar */}
                            <button
                                type="button"
                                onClick={() => {
                                    // Se resetean los campos localmente y se asegura que la card esté oculta.
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
            )}

            {/* ---------- CARD de agradecimiento: se muestra únicamente cuando mostrarCard === true ---------- */}
            {mostrarCard && (
                <div className="mt-6">
                    {/* Contenedor de la card con estilos y borde */}
                    <div className="w-full max-w-md mx-auto p-6 rounded-2xl bg-white/5 border border-[#00f3ff] shadow-lg text-center">
                        {/* Título: agradecimiento */}
                        <h3 className="text-xl font-bold text-white mb-3">¡Gracias por registrarte!</h3>

                        {/* Texto explicativo: mensaje al usuario */}
                        <p className="text-sm text-gray-200 mb-6">
                            Nuestros asesores se comunicarán contigo pronto para ayudarte con la renovación.
                        </p>

                        {/* Botón cerrar: limpia campos y oculta la card */}
                        <button
                            type="button"
                            onClick={() => {
                                // Al cerrar la card, se limpian las celdas y se vuelve al formulario.
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
