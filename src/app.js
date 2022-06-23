const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const dotenv = require('dotenv').config()

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Reinaldo Assis'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Reinaldo Assis',
        paragraph1: 'This is a project to practice using express and connecting it to a front-end.',
        paragraph2: 'Here I\'m using the fetch API in the front-end to access endpoints in the express app that respond with information in JSON about the weather, according to the query.',
        githubLink: 'https://github.com/reinaldoams'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'For this project to work, it\s necessary that an .env file exists in the root folder of this project with the following keys:',
        variables: [{variable: 'WEATHERSTACK_KEY'}, {variable: 'MAPBOX_KEY'}],
        title: 'Help',
        name: 'Reinaldo Assis'

    })
})

app.get('/weather', (req, res) => {
    const { address } = req.query
    if (!address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (err, forecastData) => {
            return res.send({
                forecast: forecastData,
                location,
                address
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
        title: 404,
        name: 'Reinaldo',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 404,
        name: 'Reinaldo',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})