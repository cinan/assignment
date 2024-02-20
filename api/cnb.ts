import axios from "axios";

const parseApiData = (data: any) => {
  const [, , ...rows] = data.split("\n");

  const parsed = rows.filter(Boolean).map((row: any) => {
    const [, currency, amount, code, rate] = row.split("|");
    return { currency, code, amount: +amount, rate: +rate };
  });

  return parsed;
};

export async function GET() {
  // Fetch data from the URL
  const response = await axios.get(
      "https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt",
  );

  const { data } = response;

  // @ts-expect-error Response.json() exists, not sure what's wrong
  return Response.json(parseApiData(data))
}