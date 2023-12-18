import React from 'react'

import './tasksfilter.css'

class TaskFilter extends React.Component {
  static defaultProps = {
    allFilter: () => {},
    activeFilter: () => {},
    completedFilter: () => {},
  }

  state = {
    all: 'selected',
    active: '',
    completed: '',
  }

  changeClass = (e) => {
    this.setState(() => {
      if (e.target.textContent === 'All') return { all: 'selected', active: '', completed: '' }
      if (e.target.textContent === 'Active') return { all: '', active: 'selected', completed: '' }
      if (e.target.textContent === 'Completed') return { all: '', active: '', completed: 'selected' }
    })
  }

  render() {
    const { allFilter, activeFilter, completedFilter } = this.props
    return (
      <ul className="filters">
        <li>
          <button
            className={this.state.all}
            onClick={(e) => {
              this.changeClass(e)
              allFilter()
            }}
          >
            All
          </button>
        </li>
        <li>
          <button
            className={this.state.active}
            onClick={(e) => {
              this.changeClass(e)
              activeFilter()
            }}
          >
            Active
          </button>
        </li>
        <li>
          <button
            className={this.state.completed}
            onClick={(e) => {
              this.changeClass(e)
              completedFilter()
            }}
          >
            Completed
          </button>
        </li>
      </ul>
    )
  }
}

export default TaskFilter
