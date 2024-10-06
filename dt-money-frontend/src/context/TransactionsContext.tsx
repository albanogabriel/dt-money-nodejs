import { ReactNode, useCallback, useEffect, useState } from "react";
import { createContext } from 'use-context-selector'
import { api } from "../lib/axios";

interface transaction {
  id: string
  title: string
  type: 'credit' | 'debit'
  amount: number
  created_at: string
}

interface CreateTransactionProps {
  title: string
  amount: number
  type: 'credit' | 'debit'
}

// interface que declara qual as informações que vou armazenar/retornar do meu contexto
export interface transactionsContextType {
  transactions: transaction[]
  token: string | null
  fetchTransactions: (query?: string) => Promise<void>
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
export function TransactionsContextProvider({ children }: TransactionsContextProviderProps) {
  const [transactions , setTransactions] = useState<transaction[]>([])
  const [token , setToken] = useState<string | null>(null)

  // const fetchTransactions = useCallback(async (query?: string) => {
  //   const response = await api.get('/transactions', {
  //     params: {
  //       _sort: 'createdAt',
  //       _order: 'desc',
  //       q: query
  //     }
  //   })
    
  //   setTransactions(response.data)
    
  // }, [])

  const fetchTransactions = useCallback(async () => {
    try {
      const response = await api.get('/transactions');
      setTransactions(response.data.transactions); // ajustei aqui
    } catch (error) {
      console.log('fetchTransactions error:', error);
    }
  }, []);

  const createTransaction = useCallback(async (data: CreateTransactionProps) => {
    const { title, amount, type } = data
    
    const response = await api.post('/transactions', {
      title,
      amount,
      type,
    })

    const newTransaction = {
      created_at: new Date(),
      ...response.data
    }

    setTransactions(state => [newTransaction, ...state])

    if (response.data.sessionId) {
      localStorage.setItem('sessionId', response.data.sessionId)
      setToken(response.data.sessionId)
    }

  }, [])

  const deleteTransaction = async (id: string) => {
    try {
      await api.delete(`/transactions/${id}`)
      
      const transactionsWithoutDeletedOne = transactions.filter(transactions => transactions.id !== id)
      setTransactions(transactionsWithoutDeletedOne)
    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  return (
    <TransactionsContext.Provider value={{ transactions, token, fetchTransactions, createTransaction, deleteTransaction }}>
      {children}
    </TransactionsContext.Provider>
  )
}