const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const pagoRoutes = require('./routes/pagos.routes');

const app = express();

app.use(cors());
app.use(morgan('dev'))
app.use(express.json())

app.use(pagoRoutes)

app.use((err, req, res, next) => {
    return res.json({
        message: err.message  
    })
})

app.listen(4000);
console.log('Server listening on port 4000')