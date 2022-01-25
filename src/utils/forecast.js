const request = require('request')

const forecast = (latitude, longitude, callbacks) => {
  const url = `http://api.weatherstack.com/current?access_key=a18b733bf096c3356f2f90de5af9d720&query=${latitude},${longitude}`

  request({
    url,
    json: true
  }, (error, { body }) => {

    if (error) {
      callbacks('Unable to connect to weather service!')
    } else if (body.error) {
      callbacks('Unable to find location')
    } else {
      callbacks(undefined, {
        weather: body.current.weather_descriptions[0],
        temp: body.current.temperature,
        feelslike: body.current.feelslike
      })
    }
  })
}

module.exports = forecast