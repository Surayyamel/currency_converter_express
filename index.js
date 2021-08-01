const express = require('express');
const axios = require('axios');
const cors = require('cors');

require('dotenv').config();

const app = express();

const port = process.env.PORT || 3001;

app.use(cors({
    origin: process.env.ORIGIN_URL,
    credentials: true
}));

app.post('/exchangerate/:from/:to', async (req, res) => {
    try {
        const { from } = req.params;
        const { to } = req.params;

        let exchangeRate;

        const { data } = await axios.get(
            `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/${from}`
        );
        
        const dataEntries = Object.entries(data.conversion_rates);

        dataEntries.map(dataEntry => {
            return dataEntry[0] === to
                ?  exchangeRate = dataEntry[1]
                : null
        });

        res.status(200).json(exchangeRate);

    } catch (error) {
        console.log(error);
    }
});


app.listen(port, () => {
    console.log(`Sever up on port ${port}`);
});