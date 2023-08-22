const express = require('express')

const ProductManager = require('./productManager.js')
const productManager = new ProductManager;

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/products', async (req, res) => {
    const limit = req.query.limit
    const products = await productManager.getProducts()

    if (limit) {
        return res.send(products.slice(0, limit))
    }
    
    res.send(products)
})

app.get('/products/:pid', (req, res) => {
    const pid = parseInt(req.query.pid, id)
    const product = productManager.getProducts(pid)

    res.send(product)
})

app.listen(8080, ()=> console.log('On'))