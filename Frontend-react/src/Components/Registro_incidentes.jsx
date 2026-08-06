import { useState } from "react";
function Registro_Incidentes() {
    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const registrarTicket = (e) => {
        e.preventDefault();
        const tituloLimpio = titulo.trim();
        const descripcionLimpia = descripcion.trim();
        if (!tituloLimpio || !descripcionLimpia) {
            alert("Necesita completar todos los campos.");
            return;
        }
        fetch("http://localhost:3000/tickets", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                titulo: tituloLimpio,
                descripcion: descripcionLimpia,
                categoria: "Software",
                prioridad: "Media",
                estado: "Abierto"
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setTitulo("");
            setDescripcion("");
        });
    };
    return (
        <section>
            <h2>Registrar Incidente</h2>
            <form onSubmit={registrarTicket}>
                <input
                    type="text"
                    placeholder="Título"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                />
                <br /><br />
                <textarea
                    placeholder="Descripción"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                ></textarea>
                <br /><br />
                <button>
                    Registrar
                </button>
            </form>
        </section>
    );
}
export default Registro_Incidentes;
