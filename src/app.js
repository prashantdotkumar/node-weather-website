const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const temperature = require('./utils/temperature')

const app = express()
const port = process.env.PORT || 3000

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewspath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewspath)
hbs.registerPartials(partialsPath)
//setup static directory to serve 
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'weather App',
        name: 'Prashant Kumar'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Prashant Kumar'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Please contact on prashantaset@gmail.com',
        name: 'Prashant Kumar'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
        
    geocode(req.query.address, (error, {latitude, longitude, place} = {}) => {
        if(error) {
            return res.send({error})
        }    

        temperature(latitude, longitude, (error, response) => {
            if(error) {
                return res.send({error})
            }
            res.send({
                location:  place,
                latitude: latitude,
                longitude: longitude,
                temperature: response.temp,
                feelslike: response.feelslike
            })
           
        })
    
    }) 

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Prashant Kumar',
        errorMessage: 'Help article not found'
    })

})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Prashant Kumar',
        errorMessage: 'Page Not found'
    })
})


app.listen(port, () => {

    console.log('server is up on port '+ port)
})