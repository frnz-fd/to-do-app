// TodoContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [currentFilter, setCurrentFilter] = useState('all');
  const [darkMode, setDarkMode] = useState(false);
  const [remainingItems, setRemainingItems] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState('all');

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    const storedFilter = localStorage.getItem('currentFilter') || 'all';
    const storedDarkMode = JSON.parse(localStorage.getItem('darkMode')) || false;

    setTodos(storedTodos);
    setCurrentFilter(storedFilter);
    setSelectedFilter(storedFilter);
    setRemainingItems(storedTodos.filter((todo) => !todo.completed).length);
    setDarkMode(storedDarkMode);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('currentFilter', currentFilter);
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [todos, currentFilter, darkMode]);

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      const updatedTodos = [...todos, { text: newTodo, completed: false, id: Date.now() }];
      updateTodos(updatedTodos);
      setNewTodo('');
    }
  };

  const toggleComplete = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    updateTodos(updatedTodos);
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    updateTodos(updatedTodos);
  };

  const clearCompleted = () => {
    const updatedTodos = todos.filter((todo) => !todo.completed);
    updateTodos(updatedTodos);
  };

  const filterTodos = (status) => {
    setCurrentFilter(status);
    setSelectedFilter(status);
  };

  const updateTodos = (updatedTodos) => {
    setTodos(updatedTodos);
    setRemainingItems(updatedTodos.filter((todo) => !todo.completed).length);
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        newTodo,
        currentFilter,
        darkMode,
        remainingItems,
        selectedFilter,
        addTodo,
        toggleComplete,
        deleteTodo,
        clearCompleted,
        filterTodos,
        setDarkMode,
        setNewTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  return useContext(TodoContext);
};
