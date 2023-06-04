const dotenv = require('dotenv')
const express = require('express')
const cors = require('cors');
const app = express();
dotenv.config({ path: './config.env' });
require('./src/db/db')
app.use(express.json());
const port = process.env.PORT;
app.use(cors());

app.use(express.json());
app.use(require('./src/routers/clientRouter'));
app.use(require('./src/routers/supplierRouter'));
app.use(require('./src/routers/adminRouter'));



app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))