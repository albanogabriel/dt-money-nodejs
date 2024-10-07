import { ReactNode, useCallback, useEffect, useState } from "react"
import { createContext } from "use-context-selector"
import { api } from "../lib/axios"

interface transaction {
  id: string
  title: string
  type: "credit" | "debit"
  amount: number
  created_at: string
}

interface CreateTransactionProps {
  title: string
  amount: number
  type: "credit" | "debit"
}

// interface que declara qual as informações que vou armazenar/retornar do meu contexto
export interface transactionsContextType {
  transactions: transaction[]
  token: string | null
  fetchTransactions: (data: { title: string; type: string }) => Promise<void>
  createTransaction: (data: CreateTransactionProps) => Promise<void>
  deleteTransaction: (id: string) => Promise<void>
}

// Meu contexto em si que passará um objeto as transactionContextType
export const TransactionsContext = createContext({} as transactionsContextType)

//interface para typar o children do meu Provider
interface TransactionsContextProviderProps {
  children: ReactNode // qlqr HTML ou JSX válido
}

// Componente Provider
export function TransactionsContextProvider({
  children,
}: TransactionsContextProviderProps) {
  const [transactions, setTransactions] = useState<transaction[]>([])
  const [token, setToken] = useState<string | null>(null)

  const fetchTransactions = useCallback(
    async ({ title, type }: { title: string; type: string }) => {
      try {
        const params = new URLSearchParams()

        if (title) {
          params.append("title", title)
        }

        if (type) {
          params.append("type", type)
        }

        console.log(`/transactions/search?${params.toString()}`)
        // Fazer a requisição GET com os parâmetros na URL
        const response = await api.get(
          `/transactions/search?${params.toString()}`
        )

        setTransactions(response.data.transactions)
      } catch (error) {
        console.log("fetchTransactions error:", error)
      }
    },
    []
  )

  const createTransaction = useCallback(
    async (data: CreateTransactionProps) => {
      const { title, amount, type } = data

      const response = await api.post("/transactions", {
        title,
        amount,
        type,
      })

      const newTransaction = {
        created_at: new Date(),
        ...response.data,
      }

      setTransactions((state) => [newTransaction, ...state])

      if (response.data.sessionId) {
        localStorage.setItem("sessionId", response.data.sessionId)
        setToken(response.data.sessionId)
      }
    },
    []
  )

  const deleteTransaction = async (id: string) => {
    try {
      await api.delete(`/transactions/${id}`)

      const transactionsWithoutDeletedOne = transactions.filter(
        (transactions) => transactions.id !== id
      )
      setTransactions(transactionsWithoutDeletedOne)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchTransactions({ title: "", type: "" })
  }, [fetchTransactions])

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        token,
        fetchTransactions,
        createTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
