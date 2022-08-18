import mongoose from "mongoose";

const FlatSchema = new mongoose.Schema(
  {
    flat_id: { type: Number, required: true },
    apartment: { type: Number },
    renovation: { type: String, required: true },
    price: { type: Number, required: true },
    balcony: { type: String || Number },
    plan: { type: String },
    area: { type: Number, required: true },
    kitchen_area: { type: Number },
    living_area: { type: Number },
    window_view: { type: String || Number },
    room: { type: Number },
    bathroom: { type: String || Number },
    housing_type: { type: Number },
    floor: { type: Number },
    buildNumber: { type: String || Number, required: true }
  },
  { timestamps: true }
)

export default mongoose.model("Flat", FlatSchema)