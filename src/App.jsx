// App.jsx
import React from 'react';
import HeaderComponent from './assets/components/HeaderComponent.jsx';
import FooterComponent from './assets/components/FooterComponent.jsx';
import {  useTodoContext  } from './assets/components/TodoContext.jsx';

function App() {
  const {
    todos,
    newTodo,
    darkMode,
    selectedFilter,
    addTodo,
    toggleComplete,
    deleteTodo,
    clearCompleted,
    filterTodos,
    setDarkMode,
    setNewTodo,
  } = useTodoContext();


  
  return (
    
      <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
        <HeaderComponent
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          newTodo={newTodo}
          setNewTodo={setNewTodo}
          addTodo={addTodo}
        />

        <FooterComponent
          todos={todos}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
          clearCompleted={clearCompleted}
          filterTodos={filterTodos}
          selectedFilter={selectedFilter}
          darkMode={darkMode}
        />
      </div>
    
  );
}

export default App;
