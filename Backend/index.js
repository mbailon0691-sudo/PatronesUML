const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Ticket = require("./models/Ticket");
const app = express();
app.use(cors());
app.use(express.json());
const PORT = 3000;
mongoose.connect("mongodb://localhost:27017/helpdesk")
.then(() => {
    console.log("Conectado correctamente a MongoDB");
})
.catch((error) => {
    console.log("Error al conectar con MongoDB");
    console.log(error);
});

app.get("/", (req, res) => {
    res.send("Servidor del Help Desk funcionando correctamente");
});
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});

app.get("/tickets", async (req, res) => {

    try {
        const tickets = await Ticket.find();
        res.json(tickets);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al obtener los tickets"
        });
    }
});

app.get("/tickets/:id", async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);
        if (!ticket) {
            return res.status(404).json({
                mensaje: "Ticket no encontrado"
            });
        }
        res.json(ticket);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al buscar el ticket"
        });
    }
});

app.post("/tickets", async (req, res) => {
    try {
        const nuevoTicket = new Ticket(req.body);
        await nuevoTicket.save();
        res.status(201).json(nuevoTicket);
    } catch (error) {
        res.status(400).json({
            mensaje: "Error al registrar el ticket",
            error: error.message
        });
    }
});

app.put("/tickets/:id", async (req, res) => {
    try {
        const ticketActualizado = await Ticket.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!ticketActualizado) {
            return res.status(404).json({
                mensaje: "Ticket no encontrado"
            });
        }
        res.json(ticketActualizado);
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al actualizar el ticket"
        });
    }
});

app.delete("/tickets/:id", async (req, res) => {
    try {
        const ticketEliminado = await Ticket.findByIdAndDelete(req.params.id);
        if (!ticketEliminado) {
            return res.status(404).json({
                mensaje: "Ticket no encontrado"
            });
        }
        res.json({
            mensaje: "Ticket eliminado correctamente"
        });
    } catch (error) {
        res.status(500).json({
            mensaje: "Error al eliminar el ticket"
        });
    }
});