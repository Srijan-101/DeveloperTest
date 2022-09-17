import { Request, Response } from 'express'
import axios from 'axios'
import { Parser } from 'json2csv';


const CsvToArray = (data: String) => {
    const titles: any = data.slice(0, data.indexOf('\n')).split(";");
    const titleValue = data
        .slice(data.indexOf('\n') + 1)
        .split('\n')

    const result = titleValue.map((v: any) => {
        const values = v.split(";");

        const keyValueofObject = titles.reduce(
            function (obj: any, title: any, index: any) {
                obj[title] = values[index];
                return obj;
            }, {});

        return keyValueofObject;
    })
    return result.splice(0, titleValue.length - 1);
}


// @route GET /Authors
// @access Public

export async function getAuthorsDetails(req: Request, res: Response) {
    try {
        const getData = await axios
            ({
                method: 'GET',
                url: 'https://raw.githubusercontent.com/echocat/nodejs-kata-1/master/data/authors.csv'
            })
        res.status(200).json(CsvToArray(getData.data));
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Server Error!" })
    }
}


// @route GET /Books
// @access Public

export async function getBooksDetails(req: Request, res: Response) {
    try {
        const getData = await axios
            ({
                method: 'GET',
                url: 'https://raw.githubusercontent.com/echocat/nodejs-kata-1/master/data/books.csv'
            })
        res.status(200).json(CsvToArray(getData.data));
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Server Error!" })
    }
}


// @route GET /Magazines
// @access Public
export async function getMagazineDetails(req: Request, res: Response) {
    try {
        const getData = await axios
            ({
                method: 'GET',
                url: 'https://raw.githubusercontent.com/echocat/nodejs-kata-1/master/data/magazines.csv'
            })
        res.status(200).json(CsvToArray(getData.data));
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Server Error!" })
    }
}


// @route POST /FindbyISBN
// @access Public
export async function findoutbyISBN(req: Request, res: Response) {
    try {

        //check in magazines
        const getDataMag = await axios
            ({
                method: 'GET',
                url: 'https://raw.githubusercontent.com/echocat/nodejs-kata-1/master/data/magazines.csv'
            })
        let arrayDataOfobjects = CsvToArray(getDataMag.data);
        let result;
        arrayDataOfobjects.forEach(ele => {
            if (ele['isbn'] === req.body.ISBN) result = ele;
        })

        if (result) res.status(200).json(result)
        else {

            //check in books if not found in magazines
            const getDataBook = await axios
                ({
                    method: 'GET',
                    url: 'https://raw.githubusercontent.com/echocat/nodejs-kata-1/master/data/books.csv'
                })
            arrayDataOfobjects = CsvToArray(getDataBook.data);
            arrayDataOfobjects.forEach(ele => {
                if (ele['isbn'] === req.body.ISBN) result = ele;
            })

            if (result) res.status(200).json(result)
            else res.status(400).json({ message: "Nothing found with this ISBN number" })
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Server Error!" })
    }
}



// @route POST /FindbyAuthorEmail
// @access Public
export async function findoutbyAuthorsEmail(req: Request, res: Response) {
    try {
        //check for magazines
        const getDataMag = await axios
            ({
                method: 'GET',
                url: 'https://raw.githubusercontent.com/echocat/nodejs-kata-1/master/data/magazines.csv'
            })
        let Result: any = [];
        let arrayDataOfobjects = CsvToArray(getDataMag.data);
        arrayDataOfobjects.map(ele => {
            let splitEmail = ele['authors'].split(",");
            splitEmail.forEach((email: String) => {
                email === req.body.email ? Result.push(ele) : null;
            })
        })

        //check for books
        const getDataBooks = await axios
            ({
                method: 'GET',
                url: 'https://raw.githubusercontent.com/echocat/nodejs-kata-1/master/data/books.csv'
            })
        arrayDataOfobjects = CsvToArray(getDataBooks.data);
        arrayDataOfobjects.map(ele => {
            let splitEmail = ele['authors'].split(",");
            splitEmail.forEach((email: String) => {
                email === req.body.email ? Result.push(ele) : null;
            })
        })

        if (Result.length != 0) res.status(200).json(Result);
        else res.status(400).json({ message: "Nothing found with this email" })

    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Server Error!" })
    }
}


export async function getBookSortByTitle(req: Request, res: Response) {
    try {
        //check for magazines
        const getDataMag = await axios
            ({
                method: 'GET',
                url: 'https://raw.githubusercontent.com/echocat/nodejs-kata-1/master/data/magazines.csv'
            })
        let Result: any = [];
        let arrayDataOfobjects = CsvToArray(getDataMag.data);
        arrayDataOfobjects.map(ele => {
            Result.push(ele);
            Result.sort((a: any, b: any) => (a.title > b.title ? 1 : -1))
        })


        //check for Books
        const getDataBooks = await axios
            ({
                method: 'GET',
                url: 'https://raw.githubusercontent.com/echocat/nodejs-kata-1/master/data/books.csv'
            })
        arrayDataOfobjects = CsvToArray(getDataBooks.data);
        arrayDataOfobjects.map(ele => {
            Result.push(ele);
            Result.sort((a: any, b: any) => (a.title > b.title ? 1 : -1))
        })
        res.status(200).json(Result);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Server Error!" })
    }
}


// @route GET /getCSV
// @access Public

export async function generateCSV(req: Request, res: Response) {
    try {
        //check for magazines
        const getDataMag = await axios
            ({
                method: 'GET',
                url: 'https://raw.githubusercontent.com/echocat/nodejs-kata-1/master/data/magazines.csv'
            })
            
        let Result: any = [];
        let arrayDataOfobjects = CsvToArray(getDataMag.data);
        arrayDataOfobjects.map(ele => {
            Result.push(ele);
            Result.sort((a: any, b: any) => (a.title > b.title ? 1 : -1))
        })

        //check for Books
        const getDataBooks = await axios
            ({
                method: 'GET',
                url: 'https://raw.githubusercontent.com/echocat/nodejs-kata-1/master/data/books.csv'
            })
        arrayDataOfobjects = CsvToArray(getDataBooks.data);
        arrayDataOfobjects.map(ele => {
            Result.push(ele);
            Result.sort((a: any, b: any) => (a.title > b.title ? 1 : -1))
        })

        //Parsing ArrayofOfobject data into CSV
        const json2csv = new Parser();
        const csv = json2csv.parse(Result);
        res.header('Content-Type', 'text/csv');
        res.attachment("data.csv");
        return res.status(200).send(csv);


    } catch (e) {
        console.error(e);
        res.status(500).json({ error: "Server Error!" })
    }
}
