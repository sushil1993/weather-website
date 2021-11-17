const chalk = require("chalk");
const request = require("request");



const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=4d9a813259237b5e6dfd2f70acdc3b4b&query='+ latitude + ',' + longitude



    request({url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to Connect to web service',undefined)
        } else if (body.error === 0) {
            callback('Unable to find the location .Please try it again',undefined)
        }else{
            callback(undefined,"It is currentlt  " + body.current.temperature + ' there is  '+body.current.precip + ' chances of rain')
        }
    })

}

module.exports = forecast