import React from 'react';
import styled from "styled-components";
import './loader.css'
import {useQuery} from "@tanstack/react-query";
import {ParsedCnbData} from "./types";
import convert from "./converter";

const MainBox = styled.div`
    display: grid;
    grid-template-columns: 1fr 0.9fr;
    max-width: 600px;
    margin: 40px auto auto;
`

const FlexBox = styled.div<{vertical?: boolean; }>`
  display: flex;
  flex-direction: ${props => props.vertical ? 'column' : 'row'};
`;

const LeftBox = styled(FlexBox)`
    flex-direction: column;
    background-color: rgb(246, 243, 254);
    border: 1px solid rgb(211, 198, 251);
    border-radius: 0.5rem;
    box-shadow: rgb(211, 198, 251) 0px 3px 16px -5px;
    padding: 2rem 1rem;
    overflow: hidden;
`

const RightBox = styled(FlexBox)`
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
`

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
`

const Title = styled.h1<{ scale?: number }>`
    font-size: ${props => props.scale === -1 ? '1.25rem' : '1.5rem'};
    font-weight: 600;
    font-family: "Epilogue", sans-serif;
      text-align: center;
      color: rgb(117, 75, 241);
    padding-bottom: 0.7rem;
`;

const Label = styled.label`
    position: relative;

    &:after {
        content: '⏷';
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
`

const StyledTable = styled.table`
    font-feature-settings: 'tnum';
    table-layout: fixed;
    width: 100%;

    td {
        padding-top: 0.25rem;
        padding-bottom: 0.25rem;
        border-bottom: 1px solid rgb(228, 227, 230);
    }

    td:first-child {
        width: 40%;
        padding-left: 1.5rem;
    }

    td:last-child {
        width: 60%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }

    tr:last-child td {
        border-bottom: none;
    }
`

const TableWrapper = styled(FlexBox)`
    overflow: auto;
    padding-bottom: 1rem
`

const CurrencySelect = ({currencyCodes, onSelect}:{currencyCodes: string[], onSelect: (currencyCode: string) => void}) => {
    return (
        <Label>
            <select onChange={e => onSelect(e.target.value)}>
                {currencyCodes.map(code => (
                    <option key={code} value={code}>{code}</option>
                ))}
            </select>
        </Label>
    )
}

const ConverterInputs = ({currencyCodes, onCurrencyChange, onInputChange}:{currencyCodes: string[], onInputChange: (input: number) => void, onCurrencyChange: (currencyCode: string) => void }) => {
    return (
        <FlexBox vertical style={{gap: 10, alignItems: 'center'}}>
            <Input type="number" placeholder="CZK…" onChange={e => onInputChange(+e.target.value)} />

            <span style={{ fontSize: '0.8rem' }}>convert into</span>
            <CurrencySelect currencyCodes={currencyCodes} onSelect={onCurrencyChange} />
        </FlexBox>
    )
}


const useCurrencyRates = () => {
    const { error, data } = useQuery<any,  any,  ParsedCnbData>({
        queryKey: ['cnbData'],
        queryFn: () =>
            fetch('http://localhost:3001/cnb').then((res) => res.json()),
    })

    if (error) {
        console.error(error)
        return
    }

    return data
}

const Converter = ({currencyRates}:{currencyRates: ParsedCnbData}) => {
    const [targetCode, setTargetCode] = React.useState(currencyRates[0].code)
    const [input, setInput] = React.useState(0)

    const { rate, amount } = currencyRates.find(({code}) => code === targetCode) || { rate: 0, amount: 0 }
    const result = (convert(input, { rate, amount }))

    return (
        <>
            <ConverterInputs currencyCodes={currencyRates?.map(({code}) => code) || []} onInputChange={setInput} onCurrencyChange={setTargetCode} />
            <Result>{input} CZK =<br/>{result} {targetCode}</Result>
        </>
    )
}

function App() {
    const currencyRates = useCurrencyRates()

    return (
        <MainBox>
            <LeftBox as="form">
                <Title style={{ marginBottom: 20 }}>Currency converter</Title>
                {currencyRates ? <Converter currencyRates={currencyRates}/> : <span className="loader"/>}
            </LeftBox>
            <RightBox>
            <Title scale={-1}>CZK Exchange rates</Title>
            {currencyRates ? (
                <TableWrapper>
                    <StyledTable>
                        <tbody>
                        {currencyRates.map(({ code, amount, rate }) => (
                            <tr key={code}>
                                <td>{code}</td>
                                <td>{+(rate / amount).toFixed(3)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </StyledTable>
                </TableWrapper>
            ) : <span className="loader"/>}
        </RightBox>
        </MainBox>
    );
}

export default App;
