// TodoContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const TodoContext = createContext();

const LOCAL_STORAGE_KEYS = {
  TODOS: 'todos',
  CURRENT_FILTER: 'currentFilter',
  DARK_MODE: 'darkMode',
};

export const TodoProvider = ({ children }) => {
  // State variables
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [currentFilter, setCurrentFilter] = useState('all');
  const [darkMode, setDarkMode] = useState(false);
  const [remainingItems, setRemainingItems] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Load data from local storage on component mount
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.TODOS)) || [];
    const storedFilter = localStorage.getItem(LOCAL_STORAGE_KEYS.CURRENT_FILTER) || 'all';
    const storedDarkMode = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.DARK_MODE)) || false;

    setTodos(storedTodos);
    setCurrentFilter(storedFilter);
    setSelectedFilter(storedFilter);
    setRemainingItems(storedTodos.filter((todo) => !todo.completed).length);
    setDarkMode(storedDarkMode);
  }, []);

  // Update local storage whenever todos, current filter, or dark mode changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.TODOS, JSON.stringify(todos));
    localStorage.setItem(LOCAL_STORAGE_KEYS.CURRENT_FILTER, currentFilter);
    localStorage.setItem(LOCAL_STORAGE_KEYS.DARK_MODE, JSON.stringify(darkMode));
  }, [todos, currentFilter, darkMode]);

  // Add a new todo to the list
  const addTodo = () => {
    if (newTodo.trim() !== '') {
      const updatedTodos = [...todos, { text: newTodo, completed: false, id: Date.now() }];
      updateTodos(updatedTodos);
      setNewTodo('');
    }
  };

  // Toggle the completion status of a todo
  const toggleComplete = (id) => {
    const updatedTodos = todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo));
    updateTodos(updatedTodos);
  };

  // Delete a todo from the list
  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    updateTodos(updatedTodos);
  };

  // Clear completed todos from the list
  const clearCompleted = () => {
    const updatedTodos = todos.filter((todo) => !todo.completed);
    updateTodos(updatedTodos);
  };

  // Set the current filter for displaying todos
  const filterTodos = (status) => {
    setCurrentFilter(status);
    setSelectedFilter(status);
  };

  // Update todos and remaining items count
  const updateTodos = (updatedTodos) => {
    setTodos(updatedTodos);
    setRemainingItems(updatedTodos.filter((todo) => !todo.completed).length);
  };

  // Provider value includes state variables and functions
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

// Custom hook for accessing the TodoContext
export const useTodoContext = () => {
  return useContext(TodoContext);
};
