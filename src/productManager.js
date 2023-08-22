const fs = require('fs');

class ProductManager{
    static id = 0
    
    constructor() {
        this.path = "products.json"
    }
    
    async getProducts() {
        await fs.readFile(this.path, 'utf-8', (error, data) => {
            const prod = JSON.parse(data)
            return(prod)
        })
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        const product = {
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id: ProductManager.id,
        }

        const exist = fs.existsSync(this.path)
        
        if (exist) {
            const readProducts = fs.readFileSync(this.path, 'utf-8')
            const arrProd = JSON.parse(readProducts)
            const prodExist = arrProd.find((pr) => pr.code === product.code)
            if (prodExist) {
                console.log(`
                ---------------------
                product already exist
                ---------------------
                `)
            } else {
                fs.writeFileSync(this.path, JSON.stringify([...arrProd, product]))
                ProductManager.id ++;  
            }
        } else {
            fs.writeFileSync(this.path, JSON.stringify([product]))
        }

    }


    deleteProduct(code) {
        const getProduct = fs.readFileSync(this.path, 'utf-8')
        const products = JSON.parse(getProduct)

        const filtred = products.filter((pr) => {
            if (pr.code !== code) {
                return pr;
            }
        })

        fs.writeFileSync(this.path, JSON.stringify(filtred))
    }

    updateProduct(code, fieldToUpdate, valueUpdated) {
        const getProduct = fs.readFileSync(this.path, 'utf-8');
        const products = JSON.parse(getProduct);
    
        const updatedProducts = products.map((pr) => {
            if (pr.code === code) {
                return { ...pr, [fieldToUpdate]: valueUpdated };
            } else {
                return pr;
            }
        });
    
        fs.writeFileSync(this.path, JSON.stringify(updatedProducts));
    }

    getProductById(code) {
        const getProduct = fs.readFileSync(this.path, 'utf-8');
        const products = JSON.parse(getProduct);

        const findProduct = products.find((pr) => pr.code === code)
        if (findProduct) {
            return(findProduct)
        } else {
            console.log(`
            -----------------
            product not found
            -----------------
            `)
        } 
    }
}

module.exports = ProductManager;