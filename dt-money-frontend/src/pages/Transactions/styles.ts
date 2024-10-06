import styled from "styled-components";

export const TransactionsContainer = styled.main`
  width: 100%;
  max-width: 1120px;
  margin: 4rem auto 0rem;
  padding: 0rem 1.5rem;
`

export const TransactionTable = styled.table`
  width: 100%;
  border-collapse: separate; // para poder usar o border-spacing
  border-spacing: 0rem 0.5rem; // 0 - no eixo Y  e  0.5rem eixo X -> Espaçamento da linha da nossa tabela
  margin-top: 1.5rem;
  
  td {
    padding: 1.25rem 2rem;
    background: ${props => props.theme["gray-700"]};

    &:first-child { // para estilizar a primeira td de cada linha
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }
    &:last-child { // para estilizar a primeira td de cada linha
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }
  }
`

interface PriceHighLightProps {
  variant: 'credit' | 'debit'
}

export const PriceHighLight = styled.span<PriceHighLightProps>`
  color: ${ props => props.variant === 'credit' ? props.theme["green-300"] : props.theme["red-300"]} ;
`

export const DeleteButton = styled.button`
  background-color: ${props => props.theme["red-500"]};
  color: white;
  padding: 12px 18px;
  border: 0;
  border-radius: 8px;
  cursor: pointer;
`