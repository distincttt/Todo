import Task from '../Task/task'

import './tasklist.css'

const TaskList = ({ todos, onDeleted, onChangeEdited, onToggleCompleted, onToggleEdited, timerActive, timerStop }) => {
  return (
    <ul className="todo-list">
      {todos.map((el) => {
        return (
          <Task
            key={el.id}
            {...el}
            onDeleted={() => onDeleted(el.id)}
            onToggleCompleted={() => onToggleCompleted(el.id)}
            onToggleEdited={() => onToggleEdited(el.id, el.span)}
            onChangeEdited={onChangeEdited}
            timerActive={() => timerActive(el.id)}
            timerStop={() => timerStop(el.id)}
          />
        )
      })}
    </ul>
  )
}

export default TaskList
