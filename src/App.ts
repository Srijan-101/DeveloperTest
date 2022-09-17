const express = require('express')
const config = require('config');
const cors = require('cors');

import routes from './Routes/app.routes'

const port = config.get("port") as number;
const host = config.get("host") as string;

const app = express();
app.use(express.json());
app.use(cors());

app.listen(port,host,()=>{
    console.log(`Server running at http://${host}:${port}`);
    routes(app);
})





