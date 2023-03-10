import { CurrencyContextProvider } from "./currencyContext";
import { CurrencyComparison } from "./currencyComparison";
import { CurrencyList } from "./currencyList";
import { Footer } from "../footer";
import "../../node_modules/currency-flags/dist/currency-flags.min.css";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 100vh;
`;

const ContainerMain = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
`;

export const Content = () => {
  return (
    <Container>
      <ContainerMain>
        <CurrencyContextProvider>
          <CurrencyComparison />
          <CurrencyList />
        </CurrencyContextProvider>
      </ContainerMain>
      <Footer />
    </Container>
  );
};
