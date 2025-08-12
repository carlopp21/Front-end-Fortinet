import { useState } from "react";

export default function useRegister() {
    const [nombreEmpresa, setNombreEmpresa] = useState("");
    const [nombreUsuario, setNombreUsuario] = useState("");
    const [nitEmpresa, setNitEmpresa] = useState("");
    const [tipoLicencia, setTipoLicencia] = useState("");
    const [numeroTelefono, setNumeroTelefono] = useState("");
    const [cargoUsuario, setCargoUsuario] = useState("");
    const [correoUsuario, setCorreoUsuario] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [mostrarCard, setMostrarCard] = useState(false);
    const [loading, setLoading] = useState(false);

    const resetForm = () => {
        setNombreEmpresa("");
        setNitEmpresa("");
        setTipoLicencia("");
        setNombreUsuario("");
        setNumeroTelefono("");
        setCargoUsuario("");
        setCorreoUsuario("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;
        setLoading(true);
        setMensaje("");


        const payload = {
            nombreEmpresa: nombreEmpresa.trim(),
            nombreUsuario: nombreUsuario.trim(),
            cargoUsuario: cargoUsuario.trim(),
            numeroTelefono: numeroTelefono.trim(),
            correoUsuario: correoUsuario.trim(),
            nitEmpresa: nitEmpresa.trim(),
            tipoLicencia: tipoLicencia
        }
        try {
            const baseUrl = process.env.NEXT_PUBLIC_API_URL;
            if (!baseUrl) throw new Error("NEXT_PUBLIC_API_URL no está configurada");

            const res = await fetch(`${baseUrl}/api/usuario/public/registro`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Origin": "https://fortinet-5ifb.vercel.app",
                    "Access-Control-Request-Method": "POST",
                    "Access-Control-Request-Headers": "Content-Type"
                },
                body: JSON.stringify(payload),
                credentials: 'include',
                mode: 'cors' // Fuerza modo CORS
            });

            if (!res.ok) {
                const errorText = await res.text();
                setMensaje(`Error en el servidor: ${errorText}`);
                setLoading(false);
                return;
            }

            const data = await res.json();

            // Actualiza estado con lo que venga del backend (si aplica)
            setNombreEmpresa(data.nombreEmpresa ?? nombreEmpresa);
            setNitEmpresa(data.nitEmpresa ?? nitEmpresa);
            setNombreUsuario(data.nombreUsuario ?? nombreUsuario);
            setNumeroTelefono(data.numeroTelefono ?? numeroTelefono);
            setCargoUsuario(data.cargoUsuario ?? cargoUsuario);
            setCorreoUsuario(data.correoUsuario ?? correoUsuario);

            setMensaje("Registro exitoso");
            setMostrarCard(true);
            // resetForm();
        } catch (error) {
            console.error("Error registrando usuario:", error);
            if (error.name === "TypeError") {
                setMensaje("Error de conexión con el servidor");
            } else {
                setMensaje(error.message || "Error inesperado en el registro");
            }
        } finally {
            setLoading(false);
        }
    };

    return {
        nombreEmpresa,
        setNombreEmpresa,
        nitEmpresa,
        setNitEmpresa,
        tipoLicencia,
        setTipoLicencia,
        nombreUsuario,
        setNombreUsuario,
        numeroTelefono,
        setNumeroTelefono,
        cargoUsuario,
        setCargoUsuario,
        correoUsuario,
        setCorreoUsuario,
        mensaje,
        mostrarCard,
        setMostrarCard,
        loading,
        handleSubmit,
    }
}
