// TodoContext.jsx
import { create } from 'zustand';

const useTodoStore = create((set) => ({
  todos: [],
  newTodo: '',
  currentFilter: 'all',
  darkMode: false,
  remainingItems: 0,
  selectedFilter: 'all',

  addTodo: () => {
    set((state) => {
      const newTodo = { text: state.newTodo, completed: false, id: Date.now() };
      const updatedTodos = [...state.todos, newTodo];

      // Update local storage
      localStorage.setItem('todos', JSON.stringify(updatedTodos));

      return {
        todos: updatedTodos,
        newTodo: '',
        remainingItems: state.remainingItems + 1,
      };
    });
  },

  toggleComplete: (id) => {
    set((state) => {
      const updatedTodos = state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );

      // Update local storage
      localStorage.setItem('todos', JSON.stringify(updatedTodos));

      return {
        todos: updatedTodos,
        remainingItems:
          state.remainingItems + (state.todos.find((t) => t.id === id)?.completed ? 1 : -1),
      };
    });
  },

  deleteTodo: (id) => {
    set((state) => {
      const updatedTodos = state.todos.filter((todo) => todo.id !== id);

      // Update local storage
      localStorage.setItem('todos', JSON.stringify(updatedTodos));

      return {
        todos: updatedTodos,
        remainingItems: state.remainingItems - (state.todos.find((t) => t.id === id)?.completed ? 0 : 1),
      };
    });
  },

  clearCompleted: () => {
    set((state) => {
      const updatedTodos = state.todos.filter((todo) => !todo.completed);

      // Update local storage
      localStorage.setItem('todos', JSON.stringify(updatedTodos));

      return {
        todos: updatedTodos,
        remainingItems: updatedTodos.filter((todo) => !todo.completed).length,
      };
    });
  },

  filterTodos: (status) => {
    set((state) => ({
      currentFilter: status,
      selectedFilter: status,
    }));
  },

  setTodos: (todos) => {
    set((state) => ({
      ...state,
      todos,
      remainingItems: todos.filter((todo) => !todo.completed).length,
    }));
  },

  setNewTodo: (newTodo) => set((state) => ({ ...state, newTodo })),
  setCurrentFilter: (currentFilter) => set((state) => ({ ...state, currentFilter })),
  setDarkMode: (darkMode) => set((state) => ({ ...state, darkMode })),
  setRemainingItems: (remainingItems) => set((state) => ({ ...state, remainingItems })),
  setSelectedFilter: (selectedFilter) => set((state) => ({ ...state, selectedFilter })),
}));

// Load data from local storage on component mount
const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
const storedFilter = localStorage.getItem('currentFilter') || 'all';
const storedDarkMode = JSON.parse(localStorage.getItem('darkMode'));

// Initialize the store with the stored data or defaults
useTodoStore.setState({
  todos: storedTodos,
  currentFilter: storedFilter,
  selectedFilter: storedFilter,
  remainingItems: storedTodos.filter((todo) => !todo.completed).length,
  darkMode: storedDarkMode !== null ? storedDarkMode : false,
});

export default useTodoStore;
