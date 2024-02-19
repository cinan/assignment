import express, { Request, Response } from 'express';
import axios from 'axios';
import cors from 'cors';
import {ParsedData} from "./types";

const app = express();
const port = 3001;

app.use(cors());

type Row = `${string}|${string}|${string}|${string}|${string}`

const parseApiData = (data: string): ParsedData => {
    const [,,...rows] = data.split('\n')

    const parsed = (rows as Row[]).filter(Boolean).map(row => {
        const [,currency,amount,code,rate] = row.split('|')
        const rateAmount = (rate as unknown as number) / (amount as unknown as number)

        return { currency, code, rate: +rateAmount.toFixed(3) }
    })

    return parsed
}

// Route to fetch data from the given URL and return the response
app.get('/cnb', async (req: Request, res: Response) => {
    try {
        // Fetch data from the URL
        const response = await axios.get('https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt');

        // Send the response data

        const { data } = response

        res.json(parseApiData(data));
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data from CNB server');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});