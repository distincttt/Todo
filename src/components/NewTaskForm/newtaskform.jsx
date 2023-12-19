import React from 'react'
import './newtaskform.css'

class NewTaskForm extends React.Component {
  state = {
    span: '',
    min: '',
    sec: '',
  }

  onLabelChange = (e) => {
    this.setState({ span: e.target.value.slice(0, 8).trim() })
  }

  onMinChange = (e) => {
    const value = e.target.value
    e.target.value = value.replace(/\D/g, '')
    e.target.value = e.target.value.slice(0, 3)
    this.setState({ min: e.target.value })
  }

  onSecChange = (e) => {
    const value = e.target.value
    e.target.value = value.replace(/\D/g, '')
    e.target.value = e.target.value.slice(0, 2)
    this.setState({ sec: e.target.value })
  }

  onSubmit = (e) => {
    e.preventDefault()
    if (this.state.span.length) this.props.onItemAdded(this.state.span, this.state.min, this.state.sec)
    this.setState({ span: '' })
    this.setState({ min: '' })
    this.setState({ sec: '' })
  }

  render() {
    return (
      <form className="taskForm" onSubmit={this.onSubmit}>
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={this.onLabelChange}
          value={this.state.span}
        ></input>
        <input
          type="text"
          className="new-todo-form__timer"
          placeholder="Min"
          onChange={this.onMinChange}
          value={this.state.min}
        ></input>
        <input
          type="text"
          className="new-todo-form__timer"
          placeholder="Sec"
          onChange={this.onSecChange}
          value={this.state.sec}
        ></input>
        <button type="submit"></button>
      </form>
    )
  }
}

export default NewTaskForm
