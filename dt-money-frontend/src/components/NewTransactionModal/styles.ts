import styled from "styled-components";
import * as Dialog from "@radix-ui/react-dialog";
import * as RadioGroup from "@radix-ui/react-radio-group";

export const StyledDialogOverlay = styled(Dialog.Overlay)`
  position: fixed; //melhor que absolute, porquê mesmo que tenhamos scroll, vai ficar sempre na mesma posição da ela
  width: 100vw;
  height: 100vh;
  inset: 0; // inset = top: 0 bottom: 0 left: 0 right: 0
  background: rgba(0, 0, 0, 0.75);
`

export const StyledDialogContent = styled(Dialog.Content)`
  min-width: 32rem;
  border-radius: 6px;
  padding: 2.5rem 3rem;
  background: ${props => props.theme["gray-800"]};

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  form {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    input {
      border-radius: 6px;
      border: 0;
      background: ${props => props.theme["gray-900"]};
      color: ${props => props.theme["gray-300"]};
      padding: 1rem;

      &::placeholder {
        color: ${props => props.theme["gray-500"]} ;
      } 
    }

    button[type="submit"] {
        height: 58px;
        border: 0;
        background: ${props => props.theme["green-500"]};
        color: ${props => props.theme.white} ;
        padding: 0 1.25rem;
        border-radius: 6px;
        margin-top: 1.5rem;
        cursor: pointer;
        font-weight: bold;

        &:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        &:not(:disabled):hover {
          transition: background-color 0.2s;
          background: ${props => props.theme["green-700"]};
        }
      }
  }
`

export const CloseButton = styled.button`
  position: absolute;
  background: transparent;
  border: 0;
  top: 1.5rem;
  right: 1.5rem;
  line-height: 0;
  color: white;
  cursor: pointer;
`

export const TransctionTypeRGRoot = styled(RadioGroup.Root)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 0.5rem;
`

interface TransctionTypeButtonProps {
  variant: 'income' | 'outcome'
}

export const TransctionTypeButtonRGItem = styled(RadioGroup.Item)<TransctionTypeButtonProps>`
  display: flex;
  gap: 0.5rem;
  padding: 1rem;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme["gray-600"]};
  color: ${props => props.theme['gray-300']};
  border-radius: 6px;
  border: 0;
  cursor: pointer;

  svg {
    color: ${props => props.variant === 'income' ? props.theme["green-300"] : props.theme["red-300"]};
  }

  &[data-state='unchecked']:hover {
    transition: background-color 0.1s;
    background: ${props => props.theme["gray-700"]};
  }

  &[data-state='checked'] {
    color: ${props => props.theme.white};

    background: ${props=> props.variant === 'income' ? props.theme["green-500"] : props.theme["red-500"]};

    svg {
      color: ${props => props.theme.white};
    }
  }
`