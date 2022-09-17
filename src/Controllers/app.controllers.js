"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCSV = exports.getBookSortByTitle = exports.findoutbyAuthorsEmail = exports.findoutbyISBN = exports.getMagazineDetails = exports.getBooksDetails = exports.getAuthorsDetails = void 0;
const axios_1 = __importDefault(require("axios"));
const json2csv_1 = require("json2csv");
const CsvToArray = (data) => {
    const titles = data.slice(0, data.indexOf('\n')).split(";");
    const titleValue = data
        .slice(data.indexOf('\n') + 1)
        .split('\n');
    const result = titleValue.map((v) => {
        const values = v.split(";");
        const keyValueofObject = titles.reduce(function (obj, title, index) {
            obj[title] = values[index];
            return obj;
        }, {});
        return keyValueofObject;
    });
    return result.splice(0, titleValue.length - 1);
};
// @route GET /Authors
// @access Public
function getAuthorsDetails(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const getData = yield (0, axios_1.default)({
                method: 'GET',
                url: 'https://raw.githubusercontent.com/echocat/nodejs-kata-1/master/data/authors.csv'
            });
            res.status(200).json(CsvToArray(getData.data));
        }
        catch (e) {
            console.error(e);
            res.status(500).json({ error: "Server Error!" });
        }
    });
}
exports.getAuthorsDetails = getAuthorsDetails;
// @route GET /Books
// @access Public
function getBooksDetails(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const getData = yield (0, axios_1.default)({
                method: 'GET',
                url: 'https://raw.githubusercontent.com/echocat/nodejs-kata-1/master/data/books.csv'
            });
            res.status(200).json(CsvToArray(getData.data));
        }
        catch (e) {
            console.error(e);
            res.status(500).json({ error: "Server Error!" });
        }
    });
}
exports.getBooksDetails = getBooksDetails;
// @route GET /Magazines
// @access Public
function getMagazineDetails(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const getData = yield (0, axios_1.default)({
                method: 'GET',
                url: 'https://raw.githubusercontent.com/echocat/nodejs-kata-1/master/data/magazines.csv'
            });
            res.status(200).json(CsvToArray(getData.data));
        }
        catch (e) {
            console.error(e);
            res.status(500).json({ error: "Server Error!" });
        }
    });
}
exports.getMagazineDetails = getMagazineDetails;
// @route POST /FindbyISBN
// @access Public
function findoutbyISBN(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //check in magazines
            const getDataMag = yield (0, axios_1.default)({
                method: 'GET',
                url: 'https://raw.githubusercontent.com/echocat/nodejs-kata-1/master/data/magazines.csv'
            });
            let arrayDataOfobjects = CsvToArray(getDataMag.data);
            let result;
            arrayDataOfobjects.forEach(ele => {
                if (ele['isbn'] === req.body.ISBN)
                    result = ele;
            });
            if (result)
                res.status(200).json(result);
            else {
                //check in books if not found in magazines
                const getDataBook = yield (0, axios_1.default)({
                    method: 'GET',
                    url: 'https://raw.githubusercontent.com/echocat/nodejs-kata-1/master/data/books.csv'
                });
                arrayDataOfobjects = CsvToArray(getDataBook.data);
                arrayDataOfobjects.forEach(ele => {
                    if (ele['isbn'] === req.body.ISBN)
                        result = ele;
                });
                if (result)
                    res.status(200).json(result);
                else
                    res.status(400).json({ message: "Nothing found with this ISBN number" });
            }
        }
        catch (e) {
            console.error(e);
            res.status(500).json({ error: "Server Error!" });
        }
    });
}
exports.findoutbyISBN = findoutbyISBN;
// @route POST /FindbyAuthorEmail
// @access Public
function findoutbyAuthorsEmail(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //check for magazines
            const getDataMag = yield (0, axios_1.default)({
                method: 'GET',
                url: 'https://raw.githubusercontent.com/echocat/nodejs-kata-1/master/data/magazines.csv'
            });
            let Result = [];
            let arrayDataOfobjects = CsvToArray(getDataMag.data);
            arrayDataOfobjects.map(ele => {
                let splitEmail = ele['authors'].split(",");
                splitEmail.forEach((email) => {
                    email === req.body.email ? Result.push(ele) : null;
                });
            });
            //check for books
            const getDataBooks = yield (0, axios_1.default)({
                method: 'GET',
                url: 'https://raw.githubusercontent.com/echocat/nodejs-kata-1/master/data/books.csv'
            });
            arrayDataOfobjects = CsvToArray(getDataBooks.data);
            arrayDataOfobjects.map(ele => {
                let splitEmail = ele['authors'].split(",");
                splitEmail.forEach((email) => {
                    email === req.body.email ? Result.push(ele) : null;
                });
            });
            if (Result.length != 0)
                res.status(200).json(Result);
            else
                res.status(400).json({ message: "Nothing found with this email" });
        }
        catch (e) {
            console.error(e);
            res.status(500).json({ error: "Server Error!" });
        }
    });
}
exports.findoutbyAuthorsEmail = findoutbyAuthorsEmail;
function getBookSortByTitle(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //check for magazines
            const getDataMag = yield (0, axios_1.default)({
                method: 'GET',
                url: 'https://raw.githubusercontent.com/echocat/nodejs-kata-1/master/data/magazines.csv'
            });
            let Result = [];
            let arrayDataOfobjects = CsvToArray(getDataMag.data);
            arrayDataOfobjects.map(ele => {
                Result.push(ele);
                Result.sort((a, b) => (a.title > b.title ? 1 : -1));
            });
            //check for Books
            const getDataBooks = yield (0, axios_1.default)({
                method: 'GET',
                url: 'https://raw.githubusercontent.com/echocat/nodejs-kata-1/master/data/books.csv'
            });
            arrayDataOfobjects = CsvToArray(getDataBooks.data);
            arrayDataOfobjects.map(ele => {
                Result.push(ele);
                Result.sort((a, b) => (a.title > b.title ? 1 : -1));
            });
            res.status(200).json(Result);
        }
        catch (e) {
            console.error(e);
            res.status(500).json({ error: "Server Error!" });
        }
    });
}
exports.getBookSortByTitle = getBookSortByTitle;
// @route GET /getCSV
// @access Public
function generateCSV(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //check for magazines
            const getDataMag = yield (0, axios_1.default)({
                method: 'GET',
                url: 'https://raw.githubusercontent.com/echocat/nodejs-kata-1/master/data/magazines.csv'
            });
            let Result = [];
            let arrayDataOfobjects = CsvToArray(getDataMag.data);
            arrayDataOfobjects.map(ele => {
                Result.push(ele);
                Result.sort((a, b) => (a.title > b.title ? 1 : -1));
            });
            //check for Books
            const getDataBooks = yield (0, axios_1.default)({
                method: 'GET',
                url: 'https://raw.githubusercontent.com/echocat/nodejs-kata-1/master/data/books.csv'
            });
            arrayDataOfobjects = CsvToArray(getDataBooks.data);
            arrayDataOfobjects.map(ele => {
                Result.push(ele);
                Result.sort((a, b) => (a.title > b.title ? 1 : -1));
            });
            //Parsing ArrayofOfobject data into CSV
            const json2csv = new json2csv_1.Parser();
            const csv = json2csv.parse(Result);
            res.header('Content-Type', 'text/csv');
            res.attachment("data.csv");
            return res.status(200).send(csv);
        }
        catch (e) {
            console.error(e);
            res.status(500).json({ error: "Server Error!" });
        }
    });
}
exports.generateCSV = generateCSV;
