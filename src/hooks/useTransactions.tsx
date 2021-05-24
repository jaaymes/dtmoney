import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { api } from '../services/api';

interface TransactionProps {
  id: number;
  title: string;
  type: string;
  amount: number;
  category: string;
  createdAt: string;
}

// interface TransactionInput {
//   title: string;
//   type: string;
//   amount: number;
//   category: string;
// }
type TransactionInput = Omit<TransactionProps, 'id' | 'createdAt'>

// type TransactionInput = Pick<TransactionProps, 'title' | 'amount' | 'category' | 'type'>

interface TransactionsProvider {
  children: ReactNode;
}

interface TransactionContextData {
  transactions: TransactionProps[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
}

const TransactionContext = createContext<TransactionContextData>({} as TransactionContextData);

export function TransactionProvider({ children }: TransactionsProvider) {
  const [transactions, setTransactions] = useState<TransactionProps[]>([]);

  useEffect(() => {
    api.get('/transactions')
      .then(response => setTransactions(response.data.transactions));
  }, []);

  async function createTransaction(TransactionInput: TransactionInput) {
   const response = await api.post('/transactions', {
     ...TransactionInput, createdAt: new Date()
   })
   const { transaction } = response.data;

   setTransactions([
     ...transactions,
     transaction
   ])
  }

  return (
    <TransactionContext.Provider value={{transactions, createTransaction}}>
      {children}
    </TransactionContext.Provider>
  )
}


export function useTransactions(){
  const context = useContext(TransactionContext)

  return context
}