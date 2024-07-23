import { act, createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    description: 'Levis jacket',
    amount: 85.99,
    date: new Date('2024-12-19')
  },
  {
    id: 'e2',
    description: 'Shein',
    amount: 89.99,
    date: new Date('2024-12-20')
  },
  {
    id: 'e3',
    description: 'Aldo heels',
    amount: 135.99,
    date: new Date('2024-12-25')
  }
]

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({description, amount, date}) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, {description, amount, date}) => {}
})

function expenseReducer(state, action){
  switch(action.type){
    case 'ADD':
      const id = new Date().toString() + Math.random().toString()
      return [{...action.payload, id: id}, ...state]
    case 'UPDATE':
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id == action.payload.id
      )
      const updatableExpense = state[updatableExpenseIndex]
      const updatedItem = {...updatableExpense, ...action.payload.data}
      const updatedExpenses = [...state]
      updatedExpenses[updatableExpenseIndex] = updatedItem
      return updatedExpenses
    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload)
    default: 
      return state
  }
}


export default function ExpenseContextProvider({children}){
  const[expenseState, dispatch] =  useReducer(expenseReducer, DUMMY_EXPENSES)

  function addExpense(expenseData){
    dispatch({type: 'ADD', payload: expenseData})
  }

  function deleteExpense(id){
    dispatch({type: 'DELETE', payload: id})
  }

  function updateExpense(id, expenseData){
    dispatch({type: 'UPDATE', payload: {id: id, data: expenseData}})
  }

  const value = {
    expenses: expenseState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense
  }

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  )
}
