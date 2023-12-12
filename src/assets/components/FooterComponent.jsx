// FooterComponent.jsx
import React from 'react';
import TodoListComponent from './TodoListComponent';

const FooterComponent = ({ todos, toggleComplete, deleteTodo, clearCompleted, filterTodos, selectedFilter, darkMode }) => {
  const filteredTodos = todos.filter((todo) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'active') return !todo.completed;
    if (selectedFilter === 'completed') return todo.completed;
    return true;
  });

  return (
    <footer className={darkMode ? " py-5 h-full absolute w-full bg-DVeryDarkBlue" : "py-5 absolute h-full w-full bg-VeryLightGrayishBlue"}>
      <TodoListComponent
        todos={filteredTodos}
        toggleComplete={toggleComplete}
        deleteTodo={deleteTodo}
        clearCompleted={clearCompleted}
        filterTodos={filterTodos}
        selectedFilter={selectedFilter}
        darkMode={darkMode}
      />
    </footer>

  );
};

export default FooterComponent;
