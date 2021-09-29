const express = require('express');
const app = express();
const login = require('./Routes/UserRoutes');
const order = require('./Routes/OrderRoutes');
const product = require('./Routes/ProductRoutes');
const category = require('./Routes/CategoryRoutes');
const orderItem = require('./Routes/orderItemRoutes');

const db = require('./db');
const port = 3020;

app.use(express.json());
app.use(express.static('Static'));

db.connect();

app.use((err, req, res, next) => {
    res.status(500).send(":( 500 error");
})

app.use('/api/login', login);
app.use('/api/order', order);
app.use('/api/product', product);
app.use('/api/category', category);
app.use('/api/order-item', orderItem);

app.use((req, res) => {
    res.status(404).sendFile("f:/מסלול/NodeJS Final Project/Static/404.html");
})

app.listen(port, () => {
    console.log(`Example from port ${port}`);
})