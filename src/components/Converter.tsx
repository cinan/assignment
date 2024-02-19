import { ParsedCnbData } from "../types";
import React from "react";
import convert from "../converter";
import styled from "styled-components";

const Input = styled.input`
  font-family: "Inter", sans-serif;
  padding: 0.33rem 0.66rem;
  border-radius: 2.25rem;
  border: 1px solid rgb(196, 195, 201);
  color: rgb(37, 37, 40);
  transition-duration: 0.2s;
  transition-timing-function: ease;
  transition-delay: 0s;
  transition-property: all;
  box-shadow: rgba(87, 85, 94, 0.25) 0px 0px 0.1rem 0px;
  font-size: 0.875rem;
  width: 50%;

  &:focus {
    border-color: rgba(153, 148, 168, 0.55);
    outline: none;
    box-shadow: rgba(117, 75, 241, 0.25) 0px 0px 0px 0.2rem;
  }
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

const ConverterInputs = ({
  currencyCodes,
  onCurrencyChange,
  onInputChange,
}: {
  currencyCodes: string[];
  onInputChange: (input: number) => void;
  onCurrencyChange: (currencyCode: string) => void;
}) => {
  return (
    <Box>
      <Input
        type="number"
        placeholder="CZK…"
        onChange={(e) => onInputChange(+e.target.value)}
      />

      <span style={{ fontSize: "0.8rem" }}>convert into</span>
      <CurrencySelect
        currencyCodes={currencyCodes}
        onSelect={onCurrencyChange}
      />
    </Box>
  );
};

const Label = styled.label`
  position: relative;

  &:after {
    content: "⏷";
    position: absolute;
    pointer-events: none;
    right: 0.75rem;
    top: 0.53rem;
  }

  select {
    font-family: "Inter", sans-serif;
    padding: 0.53rem 1.66rem 0.53rem 0.66rem;
    border-radius: 2.25rem;
    border: 1px solid rgb(196, 195, 201);
    line-height: 1.25;
    color: rgb(37, 37, 40);
    transition-duration: 0.2s;
    transition-timing-function: ease;
    transition-delay: 0s;
    transition-property: all;
    box-shadow: rgba(87, 85, 94, 0.25) 0px 0px 0.1rem 0px;
    font-size: 0.875rem;

    &:focus {
      border-color: rgba(153, 148, 168, 0.55);
      outline: none;
      box-shadow: rgba(117, 75, 241, 0.25) 0px 0px 0px 0.2rem;
    }
  }
`;

const CurrencySelect = ({
  currencyCodes,
  onSelect,
}: {
  currencyCodes: string[];
  onSelect: (currencyCode: string) => void;
}) => {
  return (
    <Label>
      <select onChange={(e) => onSelect(e.target.value)}>
        {currencyCodes.map((code) => (
          <option key={code} value={code}>
            {code}
          </option>
        ))}
      </select>
    </Label>
  );
};

const Result = styled.span`
  font-family: "Epilogue", sans-serif;
  font-weight: 600;
  font-size: 2rem;
  text-align: center;
  padding-top: 3rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  line-height: 1.4;
`;

const Converter = ({ currencyRates }: { currencyRates: ParsedCnbData }) => {
  const [targetCode, setTargetCode] = React.useState(currencyRates[0].code);
  const [input, setInput] = React.useState(0);

  const { rate, amount } = currencyRates.find(
    ({ code }) => code === targetCode,
  ) || { rate: 0, amount: 0 };
  const result = convert(input, { rate, amount });

  return (
    <>
      <ConverterInputs
        currencyCodes={currencyRates?.map(({ code }) => code) || []}
        onInputChange={setInput}
        onCurrencyChange={setTargetCode}
      />
      <Result>
        {input} CZK =<br />
        {result} {targetCode}
      </Result>
    </>
  );
};

export default Converter;
