import mongoose from 'mongoose'

const ApartmentSchema = new mongoose.Schema(
  {
    ExternalId: {type: String, required: true},
    object: {type: Object, required: true}
  },
  { timestamps: true }
)

export default mongoose.model('Apartment', ApartmentSchema)
