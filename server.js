const express = require('express')
const app = express()

// app.set('views', __dirname + '/')

// app.set('view engine', 'ejs');
// app.engine('html', require('ejs').renderFile)

// app.get('/', (req, res) => {
//     res.render('index.html')
// })

app.use(express.static('public'))

let have = []
let want = []

app.get('/want', (req, res) => {
    want.push(req.query.name + ' @ ' + req.query.coords)
    console.log({have, want})
    res.send('OK')
})

app.get('/have', (req, res) => {
    have.push(req.query.name + ' @ ' + req.query.coords)
    console.log({have, want})
    res.send('OK')
})

app.listen(5000)
console.log('Listening at http://localhost:5000')
