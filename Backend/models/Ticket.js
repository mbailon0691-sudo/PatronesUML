const mongoose = require("mongoose");
const ticketSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    categoria: {
        type: String,
        enum: ["Red", "Hardware", "Software"],
        required: true
    },
    prioridad: {
        type: String,
        enum: ["Alta", "Media", "Baja"],
        required: true
    },
    estado: {
        type: String,
        enum: ["Abierto", "En Progreso", "Cerrado"],
        default: "Abierto"
    }
});
module.exports = mongoose.model("Ticket", ticketSchema);
