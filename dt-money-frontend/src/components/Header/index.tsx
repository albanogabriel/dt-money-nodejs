import { HeaderContainer, HeaderContent, NewTransctionButton } from "./styles";

import * as Dialog from '@radix-ui/react-dialog'

import LogoDTMoney from '../../assets/LogoDTMoney.svg'
import { NewTransctionModal } from "../NewTransactionModal";

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={LogoDTMoney} alt="" />

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewTransctionButton>Nova Transação</NewTransctionButton>
          </Dialog.Trigger>

          <NewTransctionModal />
          
        </Dialog.Root>

      </HeaderContent>
    </HeaderContainer>
  )
}