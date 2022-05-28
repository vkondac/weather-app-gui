const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

//define paths for Express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup hbs and views locations  
app.set('view engine', 'hbs') 
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve with its path (path to public folder)
app.use(express.static(publicDirPath)) 


app.get('', (req, res) => {
    res.render('index', {
        title : 'Weather App',
        name : 'Vanja'
    })

})

app.get('/help', (req, res) => {
    res.render('help', {
        title : 'Help',
        name : 'Vanja'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title : 'About',
        name : 'Vanja'
    })
})


app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error : "You must provide a adress"
        })
    }
    
    geocode(req.query.address,(error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, forecastData) =>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast : forecastData,
                location: location,
                address : req.query.address

            })

        })


    })
})


app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error : "You must provide a search term"
        })
    }
    
    res.send({
        products : []
    })

})



app.get('/help/*', (req, res) => {
    res.render('404',{
        name : 'Vanja',
        error : 'Help article not found',
        title : '404'
    });
  });
 
app.get('*', (req, res) => {
    res.render('404',{
        name : 'Vanja',
        error : 'Page not found',
        title : '404'
    });
  });
 


app.listen(3000, () => {
    console.log('Server is up on port 3000')
})
