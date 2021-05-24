import { FormEvent, useState } from "react";
import Modal from "react-modal";
import { Container, TransactionTypeContainer, RadioBox } from "./styles";
import closeImg from '../../assets/vector.svg';
import icomeImg from '../../assets/entradas.svg';
import outComeImg from '../../assets/saidas.svg';
import { useTransactions } from "../../hooks/useTransactions";

interface NewTranactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTranactionModalProps) {
  const { createTransaction } = useTransactions()

  const [type, setType] = useState('deposit');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [value, setValue] = useState(0);


  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

   await createTransaction({
      title,
      type,
      amount: value,
      category,
    })

    setTitle('');
    setValue(0);
    setCategory('')
    setType('deposit');

    onRequestClose()

  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"

    >
      <button type="button" onClick={onRequestClose} className="react-modal-close">
        <img src={closeImg} alt="Fechar" />
      </button>
      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar transação</h2>

        <input
          placeholder="Titulo"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />

        <input
          type="number"
          placeholder="Valor"
          value={value}
          onChange={event => setValue(Number(event.target.value))}
        />

        <TransactionTypeContainer>
          <RadioBox type="button"
            // className={type === 'deposit' ? 'active' : ''}
            onClick={() => { setType('deposit') }}
            isActive={type === 'deposit'}
            activeColor='green'
          >
            <img src={icomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>
          <RadioBox type="button"
            onClick={() => { setType('withdraw') }}
            isActive={type === 'withdraw'}
            activeColor='red'
          >
            <img src={outComeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <input
          placeholder="Categoria"
          value={category}
          onChange={event => setCategory(event.target.value)}
        />

        <button type="submit">
          Cadastrar
        </button>
      </Container>
    </Modal>
  )
}