import React from 'react'
import PropTypes from 'prop-types'

import TaskFilter from '../TasksFilter/tasksfilter'

import './footer.css'

export default function Footer({ todo, deletedItems, allFilter, activeFilter, completedFilter }) {
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

Footer.defaultProps = {
  todo: 0,
  filterActive: () => {},
  filterAll: () => {},
  filterCompleted: () => {},
  clearCompleted: () => {},
}
Footer.propTypes = {
  todo: PropTypes.number,
  filterActive: PropTypes.func.isRequired,
  filterAll: PropTypes.func.isRequired,
  filterCompleted: PropTypes.func.isRequired,
  clearCompleted: PropTypes.func.isRequired,
}
