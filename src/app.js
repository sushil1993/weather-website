const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const port =process.env.PORT || 3000
//Define paths for Expres confid
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectory))

app.get('', (req, res) => {

    res.render('index', {
        title: "Weather",
        name: "Andrew Head"


    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Andrew Head',
        helpText: "This is some helfull Text"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Andrew'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Address must be provided"
        })

    }
    geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })

        })
    })

    // res.send({
    //     address:[{
    //         place:req.query.address
    //     },{
    //        place:req.query.address 
    //     }]
    // })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide the search term'
        })
    }

    console.log(req.query.search)
    res.send({
        product: []
    })
})



app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Head',
        errorMessage: 'Help articale not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Head',
        erroMessage: 'Page not found'
    })

})


app.listen(port, () => {
    console.log('Server is running ' + port);
})