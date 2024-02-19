const convert = (
  input: number,
  { rate, amount }: { rate: number; amount: number },
) => {
  if (!rate || !amount) throw new Error("Invalid exchange rate");

  return +(input / (rate / amount)).toFixed(3);
};

export default convert;
