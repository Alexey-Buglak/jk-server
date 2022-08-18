import Building from '../models/complex/building.model.js';
import Complex from '../models/complex/complex.model.js';
import Flat from '../models/complex/flat.model.js';

export const postComplex = async (req, res) => {
  try {
    const {
      id,
      name,
      latitude,
      longitude,
      address,
      images: {
        image
      },
      description_main: {
        title: description_main_title,
        text: description_main_text
      },
      infrastructure: {
        parking,
        security,
        sports_ground,
        playground,
        school,
        kindergarten

      },
      profits_main: {
        profit_main: {
          title,
          text,
          image: image_profit_main
        }
      },
      developer: {
        phone,
        site,
        name: name_developer,
        id: id_developer,
        logo: logo_developer
      },
      sales_info: {
        sales_phone,
        sales_address,
        sales_latitude,
        sales_longitude
      }
    } = req.body;
    const oldComplex = await Complex.findOne({ id })
    if (oldComplex) {
      return res.json({
        message: 'Complex already exists'
      })
    }

    const newComplex = new Complex({
      id: id,
      name: name,
      latitude: latitude,
      longitude: longitude,
      address: address,
      images: {
        image: image
      },
      description_main: {
        title: description_main_title,
        text: description_main_text
      },
      infrastructure: {
        parking: parking,
        security: security,
        sports_ground: sports_ground,
        playground: playground,
        school: school,
        kindergarten: kindergarten
      },
      profits_main: {
        profit_main: {
          title: title,
          text: text,
          image: image_profit_main
        }
      },
      developer: {
        phone: phone,
        site: site,
        name: name_developer,
        id: id_developer,
        logo: logo_developer
      },
      sales_info: {
        sales_phone: sales_phone,
        sales_address: sales_address,
        sales_latitude: sales_latitude,
        sales_longitude: sales_longitude
      }
    })
    await newComplex.save();
    res.json({newComplex})
  } catch (error) {
    res.json({ message: error.message })
  }
}

export const postComplexBuilding = async (req, res) => {
  try {
    const {
      id,
      fz_214,
      name,
      floors,
      building_state,
      built_year,
      ready_quarter,
      building_type,
    } = req.body;

    const isAddedBuild = await Building.findOne({ id })
    if (isAddedBuild) {
      if(isAddedBuild.building_state !== building_state) {
        isAddedBuild.building_state = building_state
        await isAddedBuild.save()
        res.json({
          message: 'Building state has been changed'
        })
      }
      return res.json({
        message: 'build is already used'
      })
    }

    const newBuilding = new Building({
      id: id,
      fz_214: fz_214,
      name: name,
      floors: floors,
      building_state: building_state,
      built_year: built_year,
      ready_quarter: ready_quarter,
      building_type: building_type
    })
    await newBuilding.save();
    await Complex.findOneAndUpdate({ $push: { buildings: newBuilding } })
    res.json({newBuilding})
  } catch (error) {
    res.json({error: error.message})
  }
}

export const postComplexFlat = async (req, res) => {
  try {
    const {
      flat_id,
      apartment,
      renovation,
      price,
      balcony,
      plan,
      area,
      kitchen_area,
      living_area,
      window_view,
      room,
      bathroom,
      housing_type,
      floor,
      buildNumber
    } = req.body

    const isAddedFlat = await Flat.findOne({ flat_id })
    const build = await Building.findOne({ name: buildNumber })
    if (isAddedFlat) {
      if(isAddedFlat.area !== area) {
        isAddedFlat.area = area
        await isAddedFlat.save()
        res.json({
          message: 'Flat area has been changed'
        })
      }
      if(isAddedFlat.price !== price) {
        isAddedFlat.price = price
        await isAddedFlat.save()
        res.json({
          message: 'Flat area has been changed'
        })
      }
      
      return res.json({
        message: 'done'
      })
    }

    const newFlat = new Flat({
      flat_id: flat_id,
      apartment: apartment,
      renovation: renovation,
      price: price,
      balcony: balcony,
      plan: plan,
      area: area,
      kitchen_area: kitchen_area,
      living_area: living_area,
      window_view: window_view,
      room: room,
      bathroom: bathroom,
      housing_type: housing_type,
      floor: floor,
      buildNumber: buildNumber
    })
    await newFlat.save();
    await Building.findOneAndUpdate({name:buildNumber},{ $push: { flats: newFlat } })
    res.json({newFlat, build})
  } catch (error) {
    res.json({error: error.message})
  }
}