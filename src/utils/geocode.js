const request = require('request')

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoia29tZWk0MDE2NiIsImEiOiJja3ltNXh0MGUyc3VyMnBsa2dsNDBjeHZuIn0.vjQ5cKAaddUzno6JUzE1Pw&limit=1`

  request({ url, json: true }, (error, { body }) => {
    const { features = [] } = body;
    if (error) {
      callback('Unable to connect to weather service!')
    } else if (features.length === 0) {
      callback('Unable to find location')
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      })
    }
  })
}

module.exports = geocode