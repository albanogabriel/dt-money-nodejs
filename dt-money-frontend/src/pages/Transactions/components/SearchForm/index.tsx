import { MagnifyingGlass } from "phosphor-react"
import { SearchFormContainer, Select } from "./styles"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { TransactionsContext } from "../../../../context/TransactionsContext"
import { useContextSelector } from "use-context-selector"
import { memo } from "react"

const searchFormSchema = z.object({
  title: z.string(),
  type: z.string(),
})

type SearchFormSchemaType = z.infer<typeof searchFormSchema>

function SearchFormComponent() {
  const fetchTransactions = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.fetchTransactions
    }
  )

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    control,
    reset,
  } = useForm<SearchFormSchemaType>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      title: "",
      type: "",
    },
  })

  async function handleSearchTransactions(data: SearchFormSchemaType) {
    await fetchTransactions({ title: data.title, type: data.type })
    reset()
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text"
        placeholder="Busque suas transações"
        {...register("title")}
      />

      <Controller
        control={control}
        name="type"
        render={({ field: { value, onChange, name, disabled } }) => {
          return (
            <Select
              value={value}
              name={name}
              onChange={onChange} // Vínculo do onChange
              disabled={disabled}
            >
              <option value={""}>Todos</option>
              <option value={"credit"}>Entradas</option>
              <option value={"debit"}>Saídas</option>
            </Select>
          )
        }}
      />

      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass />
        Buscar
      </button>
    </SearchFormContainer>
  )
}

export const SearchForm = memo(SearchFormComponent)
