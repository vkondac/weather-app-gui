const request = require('request')


const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=b44b8eb03329451cf478c2c75c05ad21&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude);
    request({url :url, json: true}, (error, response) => {
        if(error){
            callback('Unable to connect to location services!')
        }else if(response.body.error){
            callback('Unable to find location, try another search')
        }else{
            callback(undefined,`It is currenlty ${response.body.current.temperature} degrees and the air pressure is ${response.body.current.pressure}`)
        }
    })

}



module.exports = forecast