const express = require('express')
const app = express()
const generateName = require('sillyname')

// app.set('views', __dirname + '/')

// app.set('view engine', 'ejs');
// app.engine('html', require('ejs').renderFile)

// app.get('/', (req, res) => {
//     res.render('index.html')
// })

app.use(express.static('public'))

let have = [
]
let want = []

app.get('/results', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

app.get('/suggest', (req, res) => {
    const sillyName = generateName();
    res.send(sillyName)
})

app.get('/want', (req, res) => {
    const customer = { name: req.query.name, coords: JSON.parse(req.query.coords) }
    want.push(customer)

    const response = have.map(vendor => ({
        name: vendor.name,
        coords: vendor.coords,
        distance: getDistanceFromLatLonInKm(customer.coords[0], customer.coords[1], vendor.coords[0], vendor.coords[1])
    })).sort((a, b) => a.distance - b.distance)

    res.send(response)
})

app.get('/have', (req, res) => {
    const vendor = { name: req.query.name, coords: JSON.parse(req.query.coords) }
    have.push(vendor)

    const response = want.map(d => ({
        name: d.name,
        coords: d.coords,
        distance: getDistanceFromLatLonInKm(vendor.coords[0], vendor.coords[1], d.coords[0], d.coords[1])
    })).sort((a, b) => a.distance - b.distance)

    res.send(response)
})

app.get('/suggest', (req, res) => {
    var names = Moniker.generator([Moniker.adjective, Moniker.noun])
    res.send(names.choose())
})

const deg2rad = deg => deg * (Math.PI / 180)

const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    var R = 6371 // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1)
    var dLon = deg2rad(lon2 - lon1)
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)

    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    var d = R * c // Distance in km
    return d
}

const tick = () => {
    want.forEach(customer => {
        let closest = null
        have.forEach(vendor => {
            const distance = getDistanceFromLatLonInKm(
                customer.coords[0],
                customer.coords[1],
                vendor.coords[0],
                vendor.coords[1],
            )
            if (!closest || closest > distance) {
                closest = distance
            }
            console.log(`${Math.round(distance)}km from ${customer.name} to ${vendor.name}`)
        })
    })
}

setInterval(tick, 5000)

app.listen(5000)
console.log('Listening at http://localhost:5000')
