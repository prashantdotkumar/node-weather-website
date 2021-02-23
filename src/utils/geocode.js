const request = require('request')




const geocode = (address, callback) => {
    const urlGeo = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoicHJhc2hhbnRhc2V0IiwiYSI6ImNra2ZjaXYyMTFhMGEycHBhbDJ0eXA0MTYifQ.MELD8c1Iq8iD4gkk7pv1QQ&limit=1'

    request({uri: urlGeo, json: true}, (_error, {body}) => {
        if(_error){
    
            callback('unable to connect to geo service!', undefined)
        } else if (body === undefined || body.features === undefined || body.features.length === 0)
        {
            callback('Unable to find location. Try another search!', undefined)
        }
        else {
            const latlocation = body.features[0].center[1].toFixed(4)
            const lonLocation = body.features[0].center[0].toFixed(4)
            const place = body.features[0].place_name
            callback(undefined,{latitude: latlocation, longitude: lonLocation, place: place})
        }

} )

}

module.exports = geocode