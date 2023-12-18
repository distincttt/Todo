import React from 'react'
import PropTypes from 'prop-types'

import TaskFilter from '../TasksFilter/tasksfilter'

import './footer.css'

class Footer extends React.Component {
  static defaultProps = {
    todo: 0,
    deletedItems: () => {},
    allFilter: () => {},
    activeFilter: () => {},
    onChcompletedFilterangeEdited: () => {},
  }

  static propTypes = {
    todo: PropTypes.number,
    deletedItems: PropTypes.func,
    allFilter: PropTypes.func,
    activeFilter: PropTypes.func,
    onChcompletedFilterangeEdited: PropTypes.func,
  }

  render() {
    const { todo, deletedItems, allFilter, activeFilter, completedFilter } = this.props
    return (
      <footer className="footer">
        <span className="todo-count">{todo} items left</span>
        <TaskFilter allFilter={allFilter} activeFilter={activeFilter} completedFilter={completedFilter} />
        <button className="clear-completed" onClick={deletedItems}>
          Clear completed
        </button>
      </footer>
    )
  }
}

export default Footer
