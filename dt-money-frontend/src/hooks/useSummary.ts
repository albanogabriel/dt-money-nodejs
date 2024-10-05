import { TransactionsContext } from "../context/TransactionsContext"
import { useContextSelector } from "use-context-selector"

export function useSummary() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions
  })

  const summary = transactions.reduce(
      (acc, transaction) => {
        if (transaction.type === 'income') {
          acc.income += transaction.price
          acc.total += transaction.price
        } else {
          acc.outcome += transaction.price
          acc.total -= transaction.price
        }
        
        return acc
      },
      { 
        income: 0,
        outcome: 0,
        total: 0 
      }
    )

  console.log({ reduce: summary})

  return summary
}

// quero transformar meu summary com o reduce, em um objeto -> { income: 0 , outcome: 0 , total: 0 }
  // acc -> o acc começa com o nosso estado inicial: { income: 0 , outcome: 0 , total: 0} , definido como 3º parametro de nosso reduce: reduce(acc(1º - acumulador), transaction(2º - itens iteração)) => {lógica}, {estadoinicial(3º)}
  // transaction -> são os itens úncicos iterados da minha tabela([{}, {}, ...]) do banco de dados(localhost:3030/transctions -> context -> aqui iterados) retornado do meu reduce, aquele objeto de transaction, por isso conseguimos fazer a lógica: transaction.type
  // para cada iteração de por exemplo: acc.income += transaction.price ou  acc.outcome += transaction.price
      // vai aumentando no acculator(acc)
      /* { 
        income: 10,
        outcome: 0,
        total: 0 
      } */
      /* { 
        income: 10,
        outcome: 14000,
        total: 0 
      } */
      // e cada iteração vai aumentando