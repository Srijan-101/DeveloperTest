const express = require('express')
const config = require('config');
const cors = require('cors');
const path = require("path");
import {Request,Response}  from 'express'

import routes from './Routes/app.routes'

const port = 4003 || process.env.PORT;
const host = config.get("host") as string;

const app = express();
app.use(express.json());
app.use(cors());


app.use(express.static(path.join(__dirname, '../../Client/build')));
app.get("/", (req:Request, res:Response) => {
    res.sendFile(path.join(__dirname, "../../Client/build", "index.html"));
});


app.listen(port,host,()=>{
    console.log(`Server running at ${port}`);
    routes(app);
})





