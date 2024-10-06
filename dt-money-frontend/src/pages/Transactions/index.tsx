
import { Header } from "../../components/Header";
// import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";
import { DeleteButton, PriceHighLight, TransactionTable, TransactionsContainer } from "./styles";
import { TransactionsContext } from "../../context/TransactionsContext";
import { dateFormatter, priceFormatter } from "../../utils/formatter";
import { useContextSelector } from "use-context-selector";
import { Summary } from "../../components/Summary";

export function Transactions() {
  const { transactions, deleteTransaction } = useContextSelector(TransactionsContext , (context) => {
    return context
  })


  return (
    <div>
      <Header />
      <Summary />
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
                      {priceFormatter.format(transaction.amount)}
                    </PriceHighLight>
                  </td>
                  <td>{dateFormatter.format(new Date(transaction.created_at))}</td>
                  <td>
                    <DeleteButton onClick={() => deleteTransaction(transaction.id)}>Delete</DeleteButton>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </TransactionTable>
      </TransactionsContainer>
    </div>
  )
}