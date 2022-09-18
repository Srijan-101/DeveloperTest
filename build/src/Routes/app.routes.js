"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_controllers_1 = require("../Controllers/app.controllers");
const path = require("path");
function default_1(app) {
    app.get('/Authors', app_controllers_1.getAuthorsDetails);
    app.get('/Books', app_controllers_1.getBooksDetails);
    app.get('/Magazines', app_controllers_1.getMagazineDetails);
    app.post('/findbyISBN', app_controllers_1.findoutbyISBN);
    app.post('/FindbyAuthorEmail', app_controllers_1.findoutbyAuthorsEmail);
    app.get('/getSortedList', app_controllers_1.getBookSortByTitle);
    app.get('/getCSV', app_controllers_1.generateCSV);
}
exports.default = default_1;
