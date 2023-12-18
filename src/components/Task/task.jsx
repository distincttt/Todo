import React from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'

import FormEdit from '../FormEdit/formEdit'
import './task.css'

class Task extends React.Component {
  static defaultProps = {
    edited: false,
    completed: false,
    span: 'Error',
    time: 'created 5 minutes ago',
    onDeleted: () => {},
    onToggleCompleted: () => {},
    onToggleEdited: () => {},
    onChangeEdited: () => {},
    id: '',
    showCompleted: true,
  }

  static propTypes = {
    edited: PropTypes.bool,
    completed: PropTypes.bool,
    span: PropTypes.string,
    onDeleted: PropTypes.func,
    onToggleCompleted: PropTypes.func,
    onToggleEdited: PropTypes.func,
    onChangeEdited: PropTypes.func,
    id: PropTypes.number,
    showCompleted: PropTypes.bool,
  }

  state = {
    isHidden: false,
  }

  onEdited = (span) => {
    if (!span) return
    this.setState(({ isHidden }) => {
      return {
        isHidden: !isHidden,
      }
    })
  }

  render() {
    const {
      edited,
      completed,
      span,
      time,
      onDeleted,
      onToggleCompleted,
      onToggleEdited,
      onChangeEdited,
      id,
      showCompleted,
    } = this.props

    let classes = 'task'

    if (edited) classes += ' editing'
    if (completed) classes += ' completed'

    return (
      <>
        {showCompleted && (
          <li className={classes}>
            <label className="li-label">
              <input className="toggle" type="checkbox" onChange={onToggleCompleted} checked={completed}></input>
              <span className="description">{span}</span>
              <span className="created">
                {formatDistanceToNow(time, { includeSeconds: true }, { addSuffix: true })}
              </span>
            </label>
            <div className="button-edit-delete">
              <button
                className="icon icon-edit"
                onClick={() => {
                  this.onEdited(span)
                  onToggleEdited()
                }}
              ></button>
              <button className="icon icon-destroy" onClick={onDeleted}></button>
            </div>
          </li>
        )}
        {this.state.isHidden && (
          <FormEdit
            span={span}
            onChangeEdited={onChangeEdited}
            id={id}
            state={this.state}
            onSubmit={(e) => {
              e.preventDefault()
              this.onEdited(span)
              onToggleEdited()
            }}
          />
        )}
      </>
    )
  }
}

export default Task
