import { XMLParser } from 'fast-xml-parser'


const parser = (xmlFile) => {
  const xmlDataStr = xmlFile
  const options = {
    ignoreAttributes: true,
  }
  const parser = new XMLParser(options)
  const output = parser.parse(xmlDataStr)

  return output
}

export default parser
