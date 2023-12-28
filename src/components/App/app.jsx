import React, { useState, useEffect } from 'react'

import NewTaskForm from '../NewTaskForm/newtaskform'
import TaskList from '../TaskList/tasklist'
import Footer from '../Footer/footer'

import './app.css'

export default function App() {
  let maxId = 1

  const [todos, setTodos] = useState([])
  const [timerRun, setTimerRun] = useState(false)
  const [timerId, setTimerId] = useState(0)

  function creatTodoItem(label, min, sec) {
    return {
      span: label,
      id: maxId++,
      time: Date.now(),
      completed: false,
      edited: false,
      showCompleted: true,
      min: min,
      sec: sec,
      timer: null,
    }
  }

  const deleteItem = (id) => {
    timerStop(id)
    const idx = todos.findIndex((el) => el.id === id)
    const newArray = [...todos.slice(0, idx), ...todos.slice(idx + 1)]
    setTodos(newArray)
  }

  const deletedItems = () => {
    const newArray = [
      ...todos.filter((el) => {
        timerStop(el.id)
        return !el.completed
      }),
    ]
    setTodos(newArray)
  }

  const addItem = (text, min, sec) => {
    if (!min) min = 0
    if (!sec) sec = 0
    setTodos([...todos, creatTodoItem(text, min, sec)])
  }

  function toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id)

    const oldItem = arr[idx]
    const newItem = { ...oldItem, [propName]: !oldItem[propName] }

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)]
  }

  const onToggleCompleted = (id) => {
    setTodos(toggleProperty(todos, id, 'completed'))
  }

  const onToggleEdited = (id, span) => {
    if (!span) return
    setTodos(toggleProperty(todos, id, 'edited'))
  }

  const onChangeEdited = (e, id) => {
    const idx = todos.findIndex((el) => el.id === id)
    const oldItem = todos[idx]
    const newItem = { ...oldItem, span: e.target.value.slice(0, 8).trim() }
    setTodos([...todos.slice(0, idx), newItem, ...todos.slice(idx + 1)])
  }

  const onSubmitEdited = (id) => {
    setTodos(toggleProperty(todos, id, 'edited'))
  }

  const allFilter = () => {
    const newArray = todos.map((el) => {
      el.showCompleted = true
      return el
    })
    setTodos(newArray)
  }

  const activeFilter = () => {
    const newArray = todos.map((el) => {
      el.showCompleted = !el.completed
      return el
    })
    setTodos(newArray)
  }

  const completedFilter = () => {
    const newArray = todos.map((el) => {
      el.showCompleted = el.completed
      return el
    })
    setTodos(newArray)
  }

  const timerActive = (id) => {
    setTimerRun(true)
    setTimerId(id)
  }

  const timerStop = (id) => {
    setTimerRun(false)
    const idx = todos.findIndex((el) => el.id === id)
    const todoItem = todos[idx]
    clearTimeout(todoItem.timer)
  }
  useEffect(() => {
    if (timerRun) {
      console.log(timerRun)
      const timer = setInterval(() => {
        const idx = todos.findIndex((el) => el.id === timerId)
        const oldItem = todos[idx]
        let newItem
        oldItem.sec
          ? (newItem = { ...oldItem, sec: oldItem.sec - 1, timer: timer })
          : (newItem = { ...oldItem, sec: 59, min: oldItem.min - 1 })

        if (newItem.sec === 0 && newItem.min === 0) timerStop(timerId)
        setTodos([...todos.slice(0, idx), newItem, ...todos.slice(idx + 1)])
      }, 1000)
      return () => clearTimeout(timer)
    }
  })
  const todoCount = todos.filter((el) => !el.completed).length
  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTaskForm onItemAdded={addItem} />
      </header>
      <section className="main">
        <TaskList
          todos={todos}
          onDeleted={deleteItem}
          onToggleCompleted={onToggleCompleted}
          onToggleEdited={onToggleEdited}
          onChangeEdited={onChangeEdited}
          timerActive={timerActive}
          timerStop={timerStop}
        />
        <Footer
          todo={todoCount}
          deletedItems={deletedItems}
          allFilter={allFilter}
          activeFilter={activeFilter}
          completedFilter={completedFilter}
        />
      </section>
    </section>
  )
}
