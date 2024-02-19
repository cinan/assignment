import convert from "./converter";

it("converts CZK into other currencies", () => {
  expect(convert(100, { rate: 25, amount: 1 })).toBe(4);
  expect(convert(200, { rate: 6.557, amount: 100 })).toBe(3050.175);
});

it("throw an error if exchange rate is zero", () => {
  expect(() => convert(1, { rate: 6.557, amount: 0 })).toThrow();
  expect(() => convert(1, { rate: 0, amount: 1 })).toThrow();
});
