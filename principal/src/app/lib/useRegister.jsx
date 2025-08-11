import { useState } from "react";

export default function useRegister() {
    const [nombreUsuario, setNombreUsuario] = useState("");
    const [numeroTelefono, setNumeroTelefono] = useState("");
    const [sectorIndustrial, setSectorIndustrial] = useState("");
    const [cargoUsuario, setCargoUsuario] = useState("");
    const [correoUsuario, setCorreoUsuario] = useState("");
    const [lugarUsuario, setLugarUsuario] = useState("");
    const [nombreEmpresa, setNombreEmpresa] = useState("")
    const [codigoDescuento, setCodigoDescuento] = useState("");
    const [expiracionCodigo, setExpiracionCodigo] = useState("")
    const [mensaje, setMensaje] = useState("");
    const [mostrarCard, setMostrarCard] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            nombreUsuario,
            numeroTelefono,
            sectorIndustrial,
            cargoUsuario,
            correoUsuario,
            lugarUsuario,
            nombreEmpresa
        }
        try {
            const baseUrl = process.env.NEXT_PUBLIC_API_URL;
            //Peticion API interna
            const res = await fetch(`${baseUrl}/api/usuario/public/registro`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })

            if (!res.ok) {
                const errorText = await res.text();
                setMensaje(`Error en el servidor: ${errorText}`);
                return;
            }



            const data = await res.json();

            const now = Date.now().toString();
            // Guardar código y expiración
            setCodigoDescuento(data.codigoDescuento ?? "");
            setExpiracionCodigo(data.expiracionCodigo ?? "");
            setMostrarCard(true);

            //Guarda codigo de descuento
            // Correcto: Pasar dos argumentos (clave, valor)
            localStorage.setItem('codigoDescuento', data.codigoDescuento ?? "");
            localStorage.setItem(
                'expiracionCodigo',
                new Date(data.expiracionCodigo).toISOString()
            );

            setMensaje("Registro exitoso")


        } catch (error) {
            console.error('Error registrando usuario:', error);

            // Manejo específico para errores de red
            if (error.name === 'TypeError') {
                setMensaje('Error de conexión con el servidor');
            }
            // Manejo para errores de validación del backend
            else if (error.response?.data) {
                setMensaje(error.response.data.mensaje || 'Error en el registro');
            }
            // Error genérico
            else {
                setMensaje('Error inesperado: ' + error.message);
            }
        }

    }
    return {
        nombreUsuario,
        setNombreUsuario,
        numeroTelefono,
        setNumeroTelefono,
        sectorIndustrial,
        setSectorIndustrial,
        cargoUsuario,
        setCargoUsuario,
        correoUsuario,
        setCorreoUsuario,
        lugarUsuario,
        setLugarUsuario,
        nombreEmpresa,
        setNombreEmpresa,
        mensaje,
        mostrarCard,
        setMostrarCard,
        handleSubmit,
        codigoDescuento,
        expiracionCodigo
    }
}
