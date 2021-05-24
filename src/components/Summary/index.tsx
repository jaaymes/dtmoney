import { Container } from "./styles";
import icomeImg from '../../assets/entradas.svg'
import outComeImg from '../../assets/saidas.svg'
import total from '../../assets/total.svg'
import { useTransactions } from "../../hooks/useTransactions";

export function Summary() {
  const { transactions } = useTransactions()

  // const totalDeposit = transactions.reduce((acc, transaction) => {
  //   if (transaction.type === 'deposit') {
  //     return acc + transaction.amount
  //   }
  //   return acc
  // }, 0)

  const summary = transactions.reduce((acc, transaction) => {
    if (transaction.type === 'deposit') {
      acc.deposit += transaction.amount;
      acc.total += transaction.amount;
    } else {
      acc.withdraw += transaction.amount;
      acc.total -= transaction.amount;
    }
    return acc
  }, {
    deposit: 0,
    withdraw: 0,
    total: 0
  })

  return (
    <Container>
      <div>
        <header>
          <p>Entrada</p>
          <img src={icomeImg} alt="Entradas" />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(summary.deposit)}
        </strong>
      </div>
      <div>
        <header>
          <p>Saidas</p>
          <img src={outComeImg} alt="Saídas" />
        </header>
        <strong>
          -{new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(summary.withdraw)}
        </strong>
      </div>
      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src={total} alt="Total" />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(summary.total)}
        </strong>
      </div>
    </Container>
  )
}