import mongoose from 'mongoose'

const ComplexSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    address: { type: String||Number, required: true },
    images: {
      image: { type: String, required: true }
    },
    description_main: {
      title: { type: String, required: true },
      text: { type: String, required: true },
    },
    infrastructure: {
      parking: { type: String },
      security: { type: Number },
      sports_ground: { type: Number },
      playground: { type: Number },
      school: { type: Number },
      kindergarten: { type: Number }
    },
    profits_main: {
      profit_main: {
        title: { type: String, required: true },
        text: { type: String, required: true },
        image: { type: String }
      }
    },
    buildings: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Building'
    }],
    developer: {
      phone: { type: Number, required: true },
      site: { type: String },
      name: { type: String, required: true },
      id: { type: Number },
      logo: { type: String }
    },
    sales_info: {
      sales_phone: { type: Number, required: true },
      sales_address: { type: String, required: true },
      sales_latitude: { type: Number, required: true },
      sales_longitude: { type: Number, required: true },
    }
  },
  { timestamps: true }
)

export default mongoose.model('Complex', ComplexSchema)
