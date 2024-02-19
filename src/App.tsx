import React from 'react';
import styled from "styled-components";
import './loader.css'

const MainBox = styled.div`
    display: grid;
    grid-template-columns: 1fr 0.9fr;
    margin: auto;
    max-width: 600px;
    margin-top: 40px;
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
    padding: 1rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
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
    max-height: 320px;
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
        padding-left: 1rem;
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
    padding-bottom: '1rem'
`

const CurrencySelect = () => {
    return (
        <Label>
            <select>
                <option value="eur">Eur</option>
            </select>
        </Label>
    )
}

const ConverterInputs = () => {
    return (
        <FlexBox vertical style={{gap: 10, alignItems: 'center'}}>
            <Input type="number" placeholder="Czk…" />
            <span style={{ fontSize: '0.8rem' }}>convert into</span>
            <CurrencySelect />
        </FlexBox>
    )
}

function App() {
    return (
        <MainBox>
            <LeftBox as="form">
                <Title style={{ marginBottom: 20 }}>Currency converter</Title>
                <ConverterInputs/>
                <Result>500 Czk</Result>
            </LeftBox>
        <RightBox>
            <Title scale={-1}>Exchange rates</Title>
            {/*<span className="loader"></span>*/}
            <TableWrapper>
                <StyledTable>
                    <tbody>
                    <tr>
                        <td>Eur</td>
                        <td>20</td>
                    </tr>
                    <tr>
                        <td>USD</td>
                        <td>204</td>
                    </tr>
                    <tr>
                        <td>HUN</td>
                        <td>28282383.2</td>
                    </tr>
                    <tr>
                        <td>HUN</td>
                        <td>28282383.2</td>
                    </tr>
                    <tr>
                        <td>HUN</td>
                        <td>28282383.2</td>
                    </tr>
                    <tr>
                        <td>HUN</td>
                        <td>28282383.2</td>
                    </tr>
                    <tr>
                        <td>HUN</td>
                        <td>28282383.2</td>
                    </tr>
                    <tr>
                        <td>HUN</td>
                        <td>28282383.2</td>
                    </tr>
                    <tr>
                        <td>HUN</td>
                        <td>28282383.2</td>
                    </tr>
                    <tr>
                        <td>HUN</td>
                        <td>28282383.2</td>
                    </tr>
                    <tr>
                        <td>HUN</td>
                        <td>28282383.2</td>
                    </tr>
                    <tr>
                        <td>HUN</td>
                        <td>28282383.2</td>
                    </tr>
                    <tr>
                        <td>HUN</td>
                        <td>28282383.2</td>
                    </tr>
                    <tr>
                        <td>HUN</td>
                        <td>28282383.2</td>
                    </tr>

                    <tr>
                        <td>HUN</td>
                        <td>28282383.2</td>
                    </tr>
                    <tr>
                        <td>HUN</td>
                        <td>28282383.2</td>
                    </tr>
                    </tbody>
                </StyledTable>
            </TableWrapper>
        </RightBox>
        </MainBox>
    );
}

export default App;
