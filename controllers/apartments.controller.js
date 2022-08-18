import Apartment from '../models/apartments/apartment.model.js'

export const postApartments = async (req, res) => {
  try {
    const { ExternalId, ...object } = req.body

    const isAddedApartment = await Apartment.findOne({ ExternalId })

    if (isAddedApartment) {
      if (isAddedApartment.object !== object) {
        isAddedApartment.object = object
        await isAddedApartment.save()
        res.json({ message: 'Apartment updated' })
        return
      } else {
        return res.json({
          message: 'Apartment already exists'
        })
      } 
    }
    const newApartment = new Apartment({
      ExternalId,
      object
    })

    await newApartment.save()

    res.json({
      newApartment,
      message: `Apartment ${newApartment} added`
    })
  } catch (error) {
    res.json({ error: error.message })
  }
}

export default postApartments