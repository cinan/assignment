import * as React from "react";
import styled from "styled-components";

const StyledTable = styled.table`
  font-feature-settings: "tnum";
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
`;

const RatesTable = ({ children }: React.PropsWithChildren) => (
  <StyledTable>
    <tbody>{children}</tbody>
  </StyledTable>
);

export default RatesTable;
