const express = require('express')
const dotenv = require('dotenv')
const fs = require('fs')
const app = express()
dotenv.config()
const port = process.env.port || 3000

app.use((req, res, next) => {
    let url = req.url.split('.')
    if (url && url[url.length - 1]) {
        if (url[url.length - 1] == 'html') {
            url.pop()
            let filename = ""
            url.forEach((str) => {
                filename += str
            })
            res.redirect(filename)
            return
        }
    }
    next()
})


app.get('/software', (req, res) => {
    res.sendFile(__dirname + '/frontend/comingsoon.html')
})
app.get('/etsy', (req, res) => {
    res.sendFile(__dirname + '/frontend/comingsoon.html')
})
app.get('/etsy/purchase', (req, res) => {
    res.sendFile(__dirname + '/frontend/comingsoon.html')
})

function escape(str) {  
    return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\//g, '&#x2F;').replace(/\\/g, '&#x5C;').replace(/`/g, '&#96;');
}

async function getConversionRate(req) {
    let conversionRate
    let currency
    let country
    try {
        if (!req.query.c) {
            const geoReq = await (await fetch(`https://ipinfo.io/${req.headers['cf-connecting-ip'] || req.ip}/json`)).json()
            if (geoReq) {
                country = geoReq.country.toUpperCase()
            }
        } else {
            country = req.query.c.toUpperCase()
        }
        let currencies = JSON.parse(fs.readFileSync(__dirname + '/content/currencies.json'))
        currency = currencies[country] || 'EUR'

        let conversionRates = await (await fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json')).json()
        conversionRate = country ? conversionRates['eur'][currencies[country].toLowerCase()] : 1
    } catch (e) {
        conversionRate = 1
        currency = 'EUR'
        country = 'SE'
    }

    return [conversionRate, currency, country]
}

app.get('/view/:productid', async (req, res) => {
    let prods = JSON.parse(fs.readFileSync(__dirname + '/content/products.json'))
    let prod
    prods.forEach((product) => {
        if (product.id == req.params.productid) {
            prod = product
        }
    })

    if (!prod) {
        res.status(404).send('no')
        return
    } 

    let [conversionRate, currency, country] = await getConversionRate(req)
    let page = fs.readFileSync(__dirname + '/frontend/viewProduct.html')
    page = page.toString().replaceAll('{$$PageData$$}', `
        const product = ${JSON.stringify(prod)};
        const conversionRate = ${conversionRate};
        const currency = "${currency}";
        const formatCountry = "${country}";
    `)
    res.setHeader('Content-Type', 'text/html')
    res.send(page)
})

app.get('/products', async (req, res) => {
    let [conversionRate, currency, country] = await getConversionRate(req)
    
    let page = fs.readFileSync(__dirname + '/frontend/products.html')
    page = page.toString().replaceAll('{$$PageData$$}', `
        const products = ${fs.readFileSync(__dirname + '/content/products.json')};
        const conversionRate = ${conversionRate};
        const currency = "${currency}";
        const formatCountry = "${country}";
    `)
    res.setHeader('Content-Type', 'text/html')
    res.send(page)
})

app.use(express.static('frontend'))
app.listen(port, () => {
  console.log(`Kbdcat website listening on port ${port}`)
})