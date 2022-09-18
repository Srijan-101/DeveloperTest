"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const config = require('config');
const cors = require('cors');
const path = require("path");
const app_routes_1 = __importDefault(require("./Routes/app.routes"));
const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../../Client/build')));
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../Client/build", "index.html"));
});
app.listen(port, () => {
    console.log(`Server running at ${port}`);
    (0, app_routes_1.default)(app);
});
