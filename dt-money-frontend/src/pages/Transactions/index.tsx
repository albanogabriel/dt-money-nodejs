
import { Header } from "../../components/Header";
// import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";
import { PriceHighLight, TransactionTable, TransactionsContainer } from "./styles";
import { TransactionsContext } from "../../context/TransactionsContext";
import { dateFormatter, priceFormatter } from "../../utils/formatter";
import { useContextSelector } from "use-context-selector";

export function Transactions() {
  const transactions = useContextSelector(TransactionsContext , (context) => {
    return context.transactions
  })

  console.log(transactions)

  return (
    <div>
      <Header />
      {/* <Summary /> */}
      <TransactionsContainer>
        <SearchForm />

        <TransactionTable>
          <tbody>
            {transactions.map(transaction => {
              return (
                <tr key={transaction.id}>
                  <td width="50%">{transaction.title}</td>
                  <td>
                    <PriceHighLight variant={transaction.type}>
                      {transaction.type === 'debit' && '- '}
                      {priceFormatter.format(transaction.amount)}
                    </PriceHighLight>
                  </td>
                  <td>{dateFormatter.format(new Date(transaction.created_at))}</td>
                </tr>
              )
            })}
          </tbody>
        </TransactionTable>
      </TransactionsContainer>
    </div>
  )
}