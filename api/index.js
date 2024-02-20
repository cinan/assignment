const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(cors());

const parseApiData = (data) => {
  const [, , ...rows] = data.split("\n");

  const parsed = rows.filter(Boolean).map((row) => {
    const [, currency, amount, code, rate] = row.split("|");
    return { currency, code, amount: +amount, rate: +rate };
  });

  return parsed;
};

// Route to fetch data from the given URL and return the response
app.get("/cnb", async (req, res) => {
  try {
    // Fetch data from the URL
    const response = await axios.get(
      "https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt",
    );

    // Send the response data

    const { data } = response;

    res.json(parseApiData(data));
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data from CNB server");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
