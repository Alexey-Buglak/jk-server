import mongoose from "mongoose";

const BuildingSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    fz_214: { type: Number, required: true },
    name: { type: String || Number, required: true },
    floors: { type: Number, required: true },
    building_state: { type: String, required: true },
    built_year: { type: Number },
    ready_quarter: { type: Number },
    building_type: { type: String },
    flats: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Flat'
      }
    ]
  },
  { timestamps: true }
)

export default mongoose.model('Building', BuildingSchema)