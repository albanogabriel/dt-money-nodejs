import { ArrowCircleUp } from "phosphor-react";
import styled, { css } from "styled-components";


export const SummaryContainer = styled.section`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 1.5rem;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  margin-top: -4rem;
`

export const StyledArrowCircleUp = styled(ArrowCircleUp)`
  color: ${props => props.theme["green-300"]};
`

interface SummaryCardProps {
  variant?: 'green'
}

export const SummaryCard = styled.div<SummaryCardProps>`
  background-color: ${props => props.theme["gray-600"]};
  border-radius: 6px;
  padding: 2rem;

  ${props => props.variant === 'green' && css`
    background-color: ${props.theme["green-700"]};
  `}

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${props => props.theme["gray-300"]};
  }

  strong {
    //strong -> display por padrão é inline
    display: block;
    margin-top: 0.25rem;
    font-size: 1.5rem
  }

  

`