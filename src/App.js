import './App.css';
import { ExpenseList } from './components/ExpenseList';
import { ExpenseForm } from './components/ExpenseForm';
import { Alert } from './components/Alert';
import uuid from 'uuid/dist/v4';
import { useState, useEffect } from 'react';
import ReactGA from 'react-ga';

const initialExpenses = localStorage.getItem('expenses') 
? JSON.parse(localStorage.getItem('expenses')) 
: [];

function App() {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [charge, setCharge] = useState('');
  const [amount, setAmount] = useState('');
  const [alert, setAlert] = useState({show: false});
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(0);
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses))
  });
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses)
    )
}, [expenses]);
useEffect(() => {
  ReactGA.initialize('G-V73JBXYK9P');
  // To Report Page View 
  ReactGA.pageview(window.location.pathname + window.location.search);
}, [])
useEffect(() => {
  console.log(window.location.pathname)
})

  const handleCharge = e => {
    console.log(`charge:  ${e.target.value}`)
    setCharge(e.target.value);
  };
  const handleAmount = e => {
    setAmount(e.target.value)
  };
  const handleAlert = ({type, text}) => {
    setAlert({show:true, type, text});
    setTimeout(() => {
      setAlert({show:false})
    }, 3000)
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (charge !== '' && amount > 0) {
      if(edit) {
        let tempExpenses = expenses.map(item => {
          return item.id === id ? {...item, charge, amount} :item;
        })
        setExpenses(tempExpenses);
        setEdit(false)
        handleAlert({type: 'success', text: 'item edited'})
      } else {
        const singleExpense = {id: uuid(), charge, amount};
        setExpenses([...expenses, singleExpense]);
        handleAlert({type: 'success', text: 'item added'});
      }
      
      setCharge('');
      setAmount('');
    } else {
        handleAlert({
          type: 'danger', 
          text: `charge can't be empty value amount value has tobe bigger then zero`
        })
    }
  }
  const clearItems = () => {
    setExpenses([]);
    handleAlert({type: 'danger', text: 'all items deleted'});
  }
  const handleDelete = (id) => {
    let tempExpenses = expenses.filter(item => item.id !== id);
    setExpenses(tempExpenses);
    handleAlert({type: 'danger', text: 'item deleted'});
  }
  const handleEdit = id => {
    let expense = expenses.find(item => item.id === id);
    let {charge, amount} = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  }
  return (
    <div>
    {alert.show && <Alert text={alert.text} type = {alert.type}/>}
      <Alert />
      <h1>Budget calculator</h1>
      <main className="App">
        <ExpenseForm 
          charge={charge} 
          amount={amount}
          handleAmount={handleAmount}
          handleCharge={handleCharge}
          handleSubmit={handleSubmit}
          edit={edit}
        />
        <ExpenseList 
        expenses = {expenses} 
        handleDelete={handleDelete} 
        handleEdit={handleEdit} 
        clearItems={clearItems}
        />
      </main>
      <h1>Total spending: $  <span className='total'> {expenses.reduce((acc, cur) =>{
        return (acc += parseInt(cur.amount));
      }, 0)}</span></h1>
    </div>
  );
}

export default App;
