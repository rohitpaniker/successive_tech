# Successive Technology Interview Task

Please follow the instructions mentioned here to run the Express API application.

## Language Used

JavaScript is the language used to write the program under NodeJS environment along with Express API framework.

## Installation

Install and use [NodeJS](https://github.com/nodejs/node)'s node command to run the program in a terminal.

Use the package manager [npm](https://github.com/nodejs/node) to install require node_modules.

## Usage

Git clone the repo then:

```bash
cd successive_tech
npm install
npm i nodemon -g
touch .env (add MONGODB_URL= and JWT_SECRET=)
npm start
```

## Supported APIs:

```bash
API to register:

POST -> localhost:3001/api/v1/register

req body:
{
	"email": "rohitpanikar47@gmail.com",
	"password": "your password"
}
```

```bash
API to login:

POST -> localhost:3001/api/v1/login

req body:
{
	"email": "rohitpanikar47@gmail.com",
	"password": "your password"
}
```

```bash
API to create a category:

POST -> localhost:3001/api/v1/categories

req body:
{
    "name": "Tshirt",
    "type": "clothing"
}
```

```bash
API to create a product:

POST -> localhost:3001/api/v1/products

req body:
{
    "name": "V Neck",
    "category": "5f29b0f06a9949e2e929ab61",
    "description": "Some V neck medium size plain tshirt",
    "price": 2000.43,
    "make": 2019
}
```

```bash
API to get all categories:

GET -> localhost:3001/api/v1/categories
```

```bash
API to get all products:

GET -> localhost:3001/api/v1/products
```

```bash
API to get all products of a specific category (by name/type):

GET -> localhost:3001/api/v1/productsbycat?search=Tshirt
```

```bash
API to get all cart items of a user by users id:

POST -> localhost:3001/api/v1/products/getallcart

req body:
{
    "userid": "5f29b0be6a9949e2e929ab60"
}
```

```bash
API to add product/products to users cart:

POST -> localhost:3001/api/v1/products/addtocart

req body:
{
    "userid": "5f29b0be6a9949e2e929ab60",
    "productids": ["5f29b12f6a9949e2e929ab62"]
}
```
