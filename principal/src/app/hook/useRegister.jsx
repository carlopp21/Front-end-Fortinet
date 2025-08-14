import { useState, useCallback } from "react";

export default function useRegister() {
    // Estado unificado para mejorar rendimiento
    //Reemplaza múltiples useState individuales por un único objeto que contiene todos los campos del formulario.
    //Siempre que tengas formularios con múltiples campos relacionados.
    const [formData, setFormData] = useState({
        nombreEmpresa: "",
        nombreUsuario: "",
        nitEmpresa: "",
        tipoLicencia: "",
        numeroTelefono: "",
        cargoUsuario: "",
        correoUsuario: ""
    });

    const [mensaje, setMensaje] = useState("");
    const [mostrarCard, setMostrarCard] = useState(false);
    const [loading, setLoading] = useState(false);

    // Handler optimizado con useCallback
    //Memoiza funciones para evitar recrearlas en cada render.
    const handleChange = useCallback((field, value) => {
        setFormData(prev => ({
            ...prev, // Crea una copia superficial del objeto actual
            [field]: value //Actualiza SOLO la propiedad especificada, Recibe el nombre del campo y su nuevo valor  
        }));
    }, []);
    //Si field = "nombreEmpresa", equivale a nombreEmpresa: value

    const resetForm = useCallback(() => {
        setFormData({
            nombreEmpresa: "",
            nombreUsuario: "",
            nitEmpresa: "",
            tipoLicencia: "",
            numeroTelefono: "",
            cargoUsuario: "",
            correoUsuario: ""
        });
    }, []);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        if (loading) return;

        setLoading(true);
        setMensaje("");

        // Validación básica frontend antes de enviar
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correoUsuario)) {
            setMensaje("Por favor ingrese un email válido");
            setLoading(false);
            return;
        }

        const payload = {
            ...formData,
            nombreEmpresa: formData.nombreEmpresa.trim(),
            nombreUsuario: formData.nombreUsuario.trim(),
            cargoUsuario: formData.cargoUsuario.trim(),
            numeroTelefono: formData.numeroTelefono.trim(),
            correoUsuario: formData.correoUsuario.trim(),
            nitEmpresa: formData.nitEmpresa.trim(),
            tipoLicencia: formData.tipoLicencia
        };

        try {
            const baseUrl = process.env.NEXT_PUBLIC_API_URL;
            if (!baseUrl) throw new Error("NEXT_PUBLIC_API_URL no está configurada");

            // AbortController para manejar timeout
            //Qué hace: Cancela la petición si demora más de 10 segundos.
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 15000); // Timeout de 10 segundos

            const res = await fetch(`${baseUrl}/api/usuario/public/registro`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
                credentials: 'include',
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || `Error ${res.status}`);
            }

            const data = await res.json();
            setMensaje("Registro exitoso");
            setMostrarCard(true);
        } catch (error) {
            console.error("Error registrando usuario:", error);
            setMensaje(error.name === "AbortError"
                ? "Tiempo de espera agotado. Intente nuevamente."
                : error.message || "Error inesperado en el registro");
        } finally {
            setLoading(false);
        }
    }, [formData, loading]);

    return {
        formData,
        handleChange,
        mensaje,
        mostrarCard,
        setMostrarCard,
        loading,
        handleSubmit,
        resetForm
    };
}