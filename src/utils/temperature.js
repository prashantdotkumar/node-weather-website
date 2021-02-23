const request = require('request')


const temperature = (lat, long, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat='+ lat +'&lon='+ long +'&units=metric&appid=4cd4707aa1d1bd985e1ec7360aa7ffa4'
    request({uri: url, json: true}, (_error, _response) => {
        if(_error){
            callback('Unable to connect to weather service!', undefined)
        } else if (_response.body.cod === '400') {
            callback('Unable to find location', undefined)
        } 
        else{
            
            const temp = _response.body.main.temp
            const feelsLike = _response.body.main.feels_like
            callback(undefined, { temp: temp, feelslike: feelsLike})
        } 
})
}

module.exports = temperature