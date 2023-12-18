import React from 'react'
import './newtaskform.css'

class NewTaskForm extends React.Component {
  state = {
    span: '',
  }

  onLabelChange = (e) => {
    this.setState({ span: e.target.value.slice(0, 8).trim() })
  }

  onSubmit = (e) => {
    e.preventDefault()
    if (this.state.span.length) this.props.onItemAdded(this.state.span)
    this.setState({ span: '' })
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          onChange={this.onLabelChange}
          value={this.state.span}
        ></input>
      </form>
    )
  }
}

export default NewTaskForm
