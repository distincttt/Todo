import React, { useState } from 'react'
import './newtaskform.css'

export default function NewTaskForm({ onItemAdded }) {
  const [span, setSpan] = useState('')
  const [min, setMin] = useState('')
  const [sec, setSec] = useState('')

  const onLabelChange = (e) => {
    setSpan(e.target.value.slice(0, 8).trim())
  }

  const onMinChange = (e) => {
    const value = e.target.value
    e.target.value = value.replace(/\D/g, '')
    e.target.value = e.target.value.slice(0, 3)
    setMin(e.target.value)
  }

  const onSecChange = (e) => {
    const value = e.target.value
    e.target.value = value.replace(/\D/g, '')
    e.target.value = e.target.value.slice(0, 2)
    setSec(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (span.length) onItemAdded(span, min, sec)
    setSpan('')
    setMin('')
    setSec('')
  }

  return (
    <form className="taskForm" onSubmit={onSubmit}>
      <input
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus
        onChange={onLabelChange}
        value={span}
      ></input>
      <input type="text" className="new-todo-form__timer" placeholder="Min" onChange={onMinChange} value={min}></input>
      <input type="text" className="new-todo-form__timer" placeholder="Sec" onChange={onSecChange} value={sec}></input>
      <button type="submit"></button>
    </form>
  )
}
