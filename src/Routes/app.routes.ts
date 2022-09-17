import {Express,Request,Response}  from 'express'
import { findoutbyAuthorsEmail, findoutbyISBN, generateCSV, getAuthorsDetails ,getBooksDetails,getBookSortByTitle,getMagazineDetails} from '../Controllers/app.controllers'
const path = require("path");

export default function (app:Express) {

   

    app.get('/Authors',getAuthorsDetails);
    app.get('/Books',getBooksDetails);
    app.get('/Magazines',getMagazineDetails);
    app.post('/findbyISBN',findoutbyISBN);
    app.post('/FindbyAuthorEmail',findoutbyAuthorsEmail);
    app.get('/getSortedList',getBookSortByTitle);
    app.get('/getCSV',generateCSV);
}