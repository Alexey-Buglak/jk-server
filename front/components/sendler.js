import axios from "../utils/axios.js"

export const postToServer = async (port, content) => {
  try {
    await axios.post(port, {
      ...content
    })
    console.log('success')
  } catch (error) {
    console.log(error)
  }
}