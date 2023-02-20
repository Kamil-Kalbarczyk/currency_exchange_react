import { CurrencyComparison } from "./currencyComparison";
import { CurrencyList } from "./currencyList";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
`;

export const Content = () => {
  return (
    <Container>
      <CurrencyComparison />
      <CurrencyList />
    </Container>
  );
};
