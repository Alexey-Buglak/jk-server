import { postToServer } from './components/sendler.js'
import { CronJob } from 'cron'
import fetch from 'node-fetch'

const recipientAndSenler = async () => {
  const apartmentData = await fetch('http://localhost:5000/proxy/apartments', {
    method: 'GET'
  })
  const complexData = await fetch('http://localhost:5000/proxy/complex', {
    method: 'GET'
  })

  const apartmentDataJs = await apartmentData.json()
  const complexDataJs = await complexData.json()

  const job = new CronJob('@daily', () => {
    sendComplex(complexDataJs.complexes.complex)
    Object.entries(complexDataJs.complexes.complex.buildings).forEach(
      ([key, value]) => {
        Object.entries(value).forEach(([key, valueBuild]) => {
          postToServer('/complex/building', valueBuild)
          Object.entries(valueBuild.flats).forEach(([key, value]) => {
            // value.buildNumber = valueBuild.building.name // [todo] Из-за шифрования ошибка

            postToServer('/complex/building/flat', value)
          })
        })
      }
    )
    Object.entries(apartmentDataJs.feed.object).forEach(([key, value]) => {
      postToServer('/complex', value)
    })
  })
  job.start()
}
export default recipientAndSenler
