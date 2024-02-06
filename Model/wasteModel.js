import mongoose from "mongoose";

const wasteSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
    unique: true,
  },
  message: {
    type: String,
    required: true,
  },
});

export const wasteModel = mongoose.model(waste, wasteSchema);
