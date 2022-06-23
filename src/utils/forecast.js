const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const accessKey = process.env.WEATHERSTACK_KEY
    const url = `http://api.weatherstack.com/current?access_key=${accessKey}&query=` + latitude + ',' + longitude + '&units=f'

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            console.log(response.body.error)
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, response.body.current.weather_descriptions[0] + ". It is currently " + response.body.current.temperature + " degress out.")
        }
    })
}

module.exports = forecast