import React from "react";
import styled from "styled-components";
import Loader from "./components/Loader";
import Converter from "./components/Converter";
import RatesTable from "./components/RatesTable";
import useCurrencyRates from "./useCurrencyRates";

const StyledMainBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.9fr;
  max-width: 600px;
  margin: 40px auto auto;
`;

const StyledLeftBox = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgb(246, 243, 254);
  border: 1px solid rgb(211, 198, 251);
  border-radius: 0.5rem;
  box-shadow: rgb(211, 198, 251) 0px 3px 16px -5px;
  padding: 2rem 1rem;
  overflow: hidden;
`;

const StyledRightBox = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid rgb(211, 198, 251);
  border-left: none;
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  box-shadow: rgb(211, 198, 251) 0px 3px 16px -5px;
  padding-top: 2rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  max-height: 310px;
  overflow: hidden;
`;

const Heading = styled.h1<{ scale?: number }>`
  font-size: ${(props) => (props.scale === -1 ? "1.25rem" : "1.5rem")};
  font-weight: 600;
  font-family: "Epilogue", sans-serif;
  text-align: center;
  color: rgb(117, 75, 241);
  padding-bottom: 0.7rem;
`;

const TableWrapper = styled.div`
  display: flex;
  overflow: auto;
  padding-bottom: 1rem;
`;

const App = () => {
  const currencyRates = useCurrencyRates();

  return (
    <StyledMainBox>
      <StyledLeftBox as="form">
        <Heading style={{ marginBottom: 20 }}>Currency converter</Heading>
        {currencyRates ? (
          <Converter currencyRates={currencyRates} />
        ) : (
          <Loader />
        )}
      </StyledLeftBox>
      <StyledRightBox>
        <Heading scale={-1}>CZK Exchange rates</Heading>
        {currencyRates ? (
          <TableWrapper>
            <RatesTable>
              {currencyRates.map(({ code, amount, rate }) => (
                <tr key={code}>
                  <td>{code}</td>
                  <td>{+(rate / amount).toFixed(3)}</td>
                </tr>
              ))}
            </RatesTable>
          </TableWrapper>
        ) : (
          <Loader />
        )}
      </StyledRightBox>
    </StyledMainBox>
  );
};

export default App;
