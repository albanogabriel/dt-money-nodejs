import { ReactNode, useCallback, useEffect, useState } from "react";
import { createContext } from 'use-context-selector'
import { api } from "../lib/axios";

interface transaction {
  id: number
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

    if (response.data.sessionId) {
      localStorage.setItem('sessionId', response.data.sessionId)
      setToken(response.data.sessionId)
    }

    // 1º Passo - setTransactions([...transactions, response.data])
    // 2º Passo - quando eu vou fazer atualização de estado que depende de um valor anterior daquele estado, é melhor fazer utilizando um callback: state => [...state, response.data]
    // 3º Passo - setTransactions(state => [...state, response.data])
    // 4º Passo - e como ela vai ser a mais recente, por conta do meus params definidos no axios, sabe-se que para ordenar da maneira correta, precisamos inverter a ordem
    setTransactions(state => [response.data, ...state])
  }, [])

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  return (
    <TransactionsContext.Provider value={{ transactions, token, fetchTransactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  )
}