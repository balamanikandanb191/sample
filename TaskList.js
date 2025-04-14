import React from 'react';

const TaskList = ({ tasks, updateTask, deleteTask }) => {
  return (
    <ul>
      {tasks.map(task => (
        <li key={task._id}>
          <span
            style={{ textDecoration: task.completed ? 'line-through' : 'none', cursor: 'pointer' }}
            onClick={() => updateTask(task._id, { completed: !task.completed })}
          >
            {task.title}
          </span>
          <button onClick={() => deleteTask(task._id)}>❌</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
