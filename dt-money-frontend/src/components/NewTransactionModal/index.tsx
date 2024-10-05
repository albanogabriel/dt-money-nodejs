import * as Dialog from "@radix-ui/react-dialog";
import { CloseButton, StyledDialogContent, StyledDialogOverlay, TransctionTypeButtonRGItem, TransctionTypeRGRoot } from "./styles";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";

import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { TransactionsContext } from "../../context/TransactionsContext";
import { useContextSelector } from "use-context-selector";

const newTransactionSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['outcome', 'income'])
})

type NewTransactionSchemaType = z.infer<typeof newTransactionSchema>

export function NewTransctionModal() {

  const createTransaction = useContextSelector(TransactionsContext, (context) => {
    return context.createTransaction
  })

  const { handleSubmit, register, formState: { isSubmitting }, /* setValue , */ control, reset } = useForm<NewTransactionSchemaType>({
    resolver: zodResolver(newTransactionSchema),
    defaultValues: {
      type: 'income'
    }
  })

  async function handleAddNewTransaction(data: NewTransactionSchemaType) {
    createTransaction(data)
    reset()
  }

  return (
    <Dialog.Portal>
      <StyledDialogOverlay /> 

      <StyledDialogContent> 
        <Dialog.Close asChild>
          <CloseButton>
            <X size={24}/>
          </CloseButton>
        </Dialog.Close>

        <Dialog.Title>Nova transação</Dialog.Title>

        <form onSubmit={handleSubmit(handleAddNewTransaction)} action="">
          <input 
            type="text"
            placeholder="Descrição"
            required
            {...register('description')}
          />
          <input 
            type="number"
            placeholder="Preço"
            required
            {...register('price', { valueAsNumber: true })}
          />
          <input 
            type="text"
            placeholder="Categoria"
            required
            {...register('category')}
          />

          <Controller 
            control={control}
            name="type"
            render={( { field } ) => {
              return (
                <TransctionTypeRGRoot onValueChange={field.onChange} value={field.value}>
                  <TransctionTypeButtonRGItem variant="income" value="income">
                    <ArrowCircleUp size={20} />
                    Entrada
                  </TransctionTypeButtonRGItem>
                  <TransctionTypeButtonRGItem variant="outcome" value="outcome">
                    <ArrowCircleDown size={20} />
                    Saída
                  </TransctionTypeButtonRGItem>
                </TransctionTypeRGRoot>
              )
            }}
          />

          

          <button disabled={isSubmitting} type="submit">
            Cadastrar
          </button>
        </form>

      </StyledDialogContent>
    </Dialog.Portal>
  )
}