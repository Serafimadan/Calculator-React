import React from 'react'
import {ExpenseItem} from './ExpenseItem'
import {MdDelete} from 'react-icons/md';

export const ExpenseList = ({ expenses, handleDelete, handleEdit, clearItems }) => {
    return (
        <div>
            <ul>
                {expenses.map((expense) => {
                    return (<ExpenseItem 
                    key = {expense.id} 
                    expense = {expense}
                    handleDelete = {handleDelete}
                    handleEdit = {handleEdit}    
                    />)
                })}
            </ul>
                {expenses.length > 0 && <button className = 'btn' onClick={clearItems}>
                clear expenses
                <MdDelete className='btn-icon'/>
                </button>}
            
        </div>
    )
}
