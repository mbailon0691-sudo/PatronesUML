import {useState, useEffect} from "react";
function Listado_Tickets() {
    const [tickets, setTickets] = useState([]);
    useEffect(() => {
        fetch("http://localhost:3000/tickets")
            .then(response => response.json())
            .then(data => {
            setTickets(data);
        });
    }, []);
    const EliminarTicket = (id) => {
        fetch(`http://localhost:3000/tickets/${id}`,{
            method: "DELETE"
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setTickets(
                tickets.filter((ticket) => ticket._id !== id)
            );
        });
    };
    const ActualizarEstado = (id, nuevoEstado) => {
        fetch(`http://localhost:3000/tickets/${id}`,{
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                estado: nuevoEstado
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        });
    };
    return (
        <section>
            <h2>Lista de Tickets</h2>
            <p>Total de tickets: {tickets.length}</p>
            <table border="1">
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Categoría</th>
                        <th>Prioridad</th>
                        <th>Estado</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets.map((ticket) => (
                        <tr key={ticket._id}>
                            <td>{ticket.titulo}</td>
                            <td>{ticket.categoria}</td>
                            <td>{ticket.prioridad}</td>
                            <td>
                                <select defaultValue={ticket.estado}
                                    onChange={(e) => ActualizarEstado(ticket._id, e.target.value)}>
                                    <option value="Abierto">Abierto</option>
                                    <option value="En proceso">En proceso</option>
                                    <option value="Cerrado">Cerrado</option>
                                </select>
                            </td>
                            <td>
                                <button onClick={() => EliminarTicket(ticket._id)}>
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}
export default Listado_Tickets;
