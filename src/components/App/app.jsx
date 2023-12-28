import React from 'react'

import NewTaskForm from '../NewTaskForm/newtaskform'
import TaskList from '../TaskList/tasklist'
import Footer from '../Footer/footer'

import './app.css'

class App extends React.Component {
  maxId = 1

  state = {
    todos: [],
  }

  creatTodoItem(label, min, sec) {
    return {
      span: label,
      id: this.maxId++,
      time: Date.now(),
      completed: false,
      edited: false,
      showCompleted: true,
      min: min,
      sec: sec,
      timer: null,
    }
  }

  deleteItem = (id) => {
    this.timerStop(id)
    this.setState(({ todos }) => {
      const idx = todos.findIndex((el) => el.id === id)
      const newArray = [...todos.slice(0, idx), ...todos.slice(idx + 1)]
      return { todos: newArray }
    })
  }

  deletedItems = () => {
    this.setState(({ todos }) => {
      const newArray = [
        ...todos.filter((el) => {
          this.timerStop(el.id)
          return !el.completed
        }),
      ]
      return { todos: newArray }
    })
  }

  addItem = (text, min, sec) => {
    if (!min) min = 0
    if (!sec) sec = 0
    this.setState(({ todos }) => {
      return { todos: [...todos, this.creatTodoItem(text, min, sec)] }
    })
  }

  toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id)

    const oldItem = arr[idx]
    const newItem = { ...oldItem, [propName]: !oldItem[propName] }

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)]
  }

  onToggleCompleted = (id) => {
    this.setState(({ todos }) => {
      return {
        todos: this.toggleProperty(todos, id, 'completed'),
      }
    })
  }

  onToggleEdited = (id, span) => {
    if (!span) return
    this.setState(({ todos }) => {
      return {
        todos: this.toggleProperty(todos, id, 'edited'),
      }
    })
  }

  onChangeEdited = (e, id) => {
    this.setState(({ todos }) => {
      const idx = todos.findIndex((el) => el.id === id)
      const oldItem = todos[idx]
      const newItem = { ...oldItem, span: e.target.value.slice(0, 8).trim() }
      return {
        todos: [...todos.slice(0, idx), newItem, ...todos.slice(idx + 1)],
      }
    })
  }

  onSubmitEdited = (id) => {
    this.setState(({ todos }) => {
      return {
        todos: this.toggleProperty(todos, id, 'edited'),
      }
    })
  }

  allFilter = () => {
    this.setState(({ todos }) => {
      const newArray = todos.map((el) => {
        el.showCompleted = true
        return el
      })
      return {
        todos: newArray,
      }
    })
  }

  activeFilter = () => {
    this.setState(({ todos }) => {
      const newArray = todos.map((el) => {
        el.showCompleted = !el.completed
        return el
      })
      return {
        todos: newArray,
      }
    })
  }

  completedFilter = () => {
    this.setState(({ todos }) => {
      const newArray = todos.map((el) => {
        el.showCompleted = el.completed
        return el
      })
      return {
        todos: newArray,
      }
    })
  }

  timerActive = (id) => {
    const timer = setInterval(() => {
      this.setState(({ todos }) => {
        const idx = todos.findIndex((el) => el.id === id)
        const oldItem = todos[idx]
        let newItem
        oldItem.sec
          ? (newItem = { ...oldItem, sec: oldItem.sec - 1, timer: timer })
          : (newItem = { ...oldItem, sec: 59, min: oldItem.min - 1 })
        // console.log(newItem.min, newItem.sec)
        if (newItem.sec === 0 && newItem.min === 0) this.componentWillUnmount(timer)
        // if (newItem.sec === 0 && newItem.min > 0) newItem = { ...oldItem, sec: 59, min: oldItem.min - 1 }
        return {
          todos: [...todos.slice(0, idx), newItem, ...todos.slice(idx + 1)],
        }
      })
    }, 1000)
  }

  timerStop = (id) => {
    const idx = this.state.todos.findIndex((el) => el.id === id)
    const todoItem = this.state.todos[idx]
    this.componentWillUnmount(todoItem.timer)
  }

  componentWillUnmount(timer) {
    clearInterval(timer)
  }

  render() {
    const todoCount = this.state.todos.filter((el) => !el.completed).length
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTaskForm onItemAdded={this.addItem} />
        </header>
        <section className="main">
          <TaskList
            todos={this.state.todos}
            onDeleted={this.deleteItem}
            onToggleCompleted={this.onToggleCompleted}
            onToggleEdited={this.onToggleEdited}
            onChangeEdited={this.onChangeEdited}
            timerActive={this.timerActive}
            timerStop={this.timerStop}
          />
          <Footer
            todo={todoCount}
            deletedItems={this.deletedItems}
            allFilter={this.allFilter}
            activeFilter={this.activeFilter}
            completedFilter={this.completedFilter}
          />
        </section>
      </section>
    )
  }
}

export default App
