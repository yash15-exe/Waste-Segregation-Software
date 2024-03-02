const mongoose = require("mongoose");

const wasteSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    type: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Waste", wasteSchema);