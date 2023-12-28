import React, { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'

import FormEdit from '../FormEdit/formEdit'
import './task.css'

export default function Task({
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
  timerActive,
  timerStop,
  min,
  sec,
}) {
  const [isHidden, setIsHidden] = useState(false)

  const onEdited = (span) => {
    if (!span) return
    setIsHidden(!isHidden)
  }

  let classes = 'task'

  if (edited) classes += ' editing'
  if (completed) classes += ' completed'

  let timeDom
  if (min | sec) {
    if (0 <= min && min < 10) min = `0${min}`
    if (0 <= sec && sec < 10) sec = `0${sec}`
    timeDom = (
      <div className="timer">
        <button className="timer-button" onClick={timerActive}>
          Start
        </button>
        <button className="timer-button" onClick={timerStop}>
          Stop
        </button>
        <span className="timer-span">
          {min}:{sec}
        </span>
      </div>
    )
  } else timeDom = null

  return (
    <>
      {showCompleted && (
        <li className={classes}>
          <label className="li-label">
            <input className="toggle" type="checkbox" onChange={onToggleCompleted} checked={completed}></input>
            <span className="description">{span}</span>
            <span className="created">{formatDistanceToNow(time, { includeSeconds: true }, { addSuffix: true })}</span>
          </label>
          {timeDom}
          <div className="button-edit-delete">
            <button
              className="icon icon-edit"
              onClick={() => {
                onEdited(span)
                onToggleEdited()
              }}
            ></button>
            <button className="icon icon-destroy" onClick={onDeleted}></button>
          </div>
        </li>
      )}
      {isHidden && (
        <FormEdit
          span={span}
          onChangeEdited={onChangeEdited}
          id={id}
          onSubmit={(e) => {
            e.preventDefault()
            onEdited(span)
            onToggleEdited()
          }}
        />
      )}
    </>
  )
}

Task.defaultProps = {
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

Task.propTypes = {
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
