import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all');
  const [darkMode, setDarkMode] = useState(false);
  const [remainingItems, setRemainingItems] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState('all');

  useEffect(() => {
    // Load todos and filter from localStorage on component mount
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    const storedFilter = localStorage.getItem('filter') || 'all';

    setTodos(storedTodos);
    setFilter(storedFilter);
    setSelectedFilter(storedFilter);

    const remainingItems = storedTodos.filter((todo) => !todo.completed).length;
    setRemainingItems(remainingItems);
  }, []);

  useEffect(() => {
    // Save todos and filter to localStorage whenever they change
    localStorage.setItem('todos', JSON.stringify(todos));
    localStorage.setItem('filter', filter);
  }, [todos, filter]);

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { text: newTodo, completed: false }]);
      setNewTodo('');
      setRemainingItems(remainingItems + 1);
    }
  };

  const toggleComplete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);

    const remainingItems = updatedTodos.filter((todo) => !todo.completed).length;
    setRemainingItems(remainingItems);
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
    setRemainingItems(updatedTodos.filter((todo) => !todo.completed).length);
  };

  const clearCompleted = () => {
    const updatedTodos = todos.filter((todo) => !todo.completed);
    setTodos(updatedTodos);
    setRemainingItems(updatedTodos.length);
  };

  const filterTodos = (status) => {
    setFilter(status);
    setSelectedFilter(status);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'all') return true;
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <>
      <header className={`bg-cover  ${darkMode ? 'bg-dark-header-desk' : 'bg-light-header-desk'} h-2/6`}>
        <section className='max-w-[475px] mx-auto py-5'>
          <div className='flex justify-between'>
            <h1 className='text-white text-2xl font-semibold px-6 py-12 text-left w-52'>T O D O</h1>
            <button onClick={() => setDarkMode(!darkMode)} className='w-fit h-fit py-12 px-8'>
              {darkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26"><path fill="#FFF" fillRule="evenodd" d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z" /></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26"><path fill="#FFF" fillRule="evenodd" d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z" /></svg>
              )}
            </button>

          </div>

          {/*add new todo */}
          <div
            className={`addtodos flex justify-start ${darkMode
              ? 'bg-DVeryDarkDesaturatedBlue' // Dark mode background color
              : 'bg-VeryLightGray' // Light mode background color
              } w-11/12 h-12 rounded-md mx-auto p-3`}
          >
            <div className={darkMode ? 'rounded-full border border-gray-700 ml-1 w-6 h-6 ' : 'rounded-full border border-gray-300 ml-1 w-6 h-6'}></div>
            <input
              className={darkMode ? 'bg-inherit px-4 placeholder-gray-500 outline-none text-gray-200 pointer' : 'bg-inherit px-4 placeholder-gray-400 outline-none text-gray-700 pointer'}
              placeholder='Create a new todo...'
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            />
          </div>

          {/* todo list */}
          <main className='relative rounded-lg mt-5 w-11/12 mx-auto rounded-t-md '>
            {filteredTodos.map((todo, index) => (
              <div
                key={index}
                className={`todothings pointer flex justify-start ${darkMode
                  ? 'bg-DVeryDarkDesaturatedBlue pointer border-gray-700'
                  : 'bg-VeryLightGray pointer border-gray-200'
                  } w-full h-12 p-3 border-b ${index === 0 ? 'rounded-t-md' : ''} ${todo.completed ? '' : ''}`}>

<div
  style={{
    background: todo.completed
      ? 'linear-gradient(to bottom right, hsl(192, 100%, 67%), hsl(280, 87%, 65%))'
      : 'transparent',
  }}
  className={`group rounded-full absolute p-[6px] border ${darkMode
    ? 'border-gray-700'
    : 'border-gray-300'
  } mx-1 w-6 h-6 pointer transition-all duration-300 hover:border-gradient hover:rounded-full hover:cursor-pointer`}
  onClick={() => toggleComplete(index)}
>
  {todo.completed && (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="11"
      height="9"
      className="text-white"
    >
      <path
        fill="none"
        stroke="#FFF"
        strokeWidth="2"
        d="M1 4.304L3.696 7l6-6"
      />
    </svg>
  )}
</div>



                <p className={`pointer text-left ml-9 px-2 w-56 truncate ${darkMode
                  ? todo.completed
                    ? 'text-gray-500 line-through'
                    : 'text-gray-300'
                  : todo.completed
                    ? 'text-gray-400 line-through'
                    : 'text-gray-700'
                  }`}>
                  {todo.text}
                </p>

                <button className='absolute right-4 pointer' onClick={() => deleteTodo(index)}><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
                  <path fill="#494C6B" fillRule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z" />
                </svg>
                </button>
              </div>
            ))}

            <div className={darkMode ? 'flex justify-between items-center px-6 text-sm w-full h-14 rounded-b-lg mx-auto bg-DVeryDarkDesaturatedBlue text-gray-600' : 'flex justify-between items-center px-6 text-sm w-full h-14 rounded-b-lg mx-auto bg-VeryLightGray text-gray-400'}>
              <div> {remainingItems} items left</div>

              <div className={darkMode ? "flex justify-between bg-DVeryDarkDesaturatedBlue text-gray-400  sm:block hidden" : "sm:block hidden flex justify-between bg-VeryLightGray text-gray-500 "}>
                <button
                  className={`pointer ${selectedFilter === 'all' ? 'text-blue-500' : ''} ${darkMode ? 'dark:hover:text-gray-200' : 'hover:text-gray-800'}`}
                  onClick={() => filterTodos('all')}
                >
                  All
                </button>
                <button
                  className={`pointer ${selectedFilter === 'active' ? 'text-blue-500 ' : ''} ${darkMode ? 'dark:hover:text-gray-200 sm:px-4' : 'hover:text-gray-800 sm:px-4'}`}
                  onClick={() => filterTodos('active')}
                >
                  Active
                </button>
                <button
                  className={`pointer ${selectedFilter === 'completed' ? 'text-blue-500' : ''} ${darkMode ? 'dark:hover:text-gray-200' : 'hover:text-gray-800'}`}
                  onClick={() => filterTodos('completed')}
                >
                  Completed
                </button>
              </div>

              <button onClick={clearCompleted}>Clear Completed</button>
            </div>
          </main>

          <div className={darkMode ? "relative mt-5 flex justify-around bg-DVeryDarkDesaturatedBlue text-gray-400 w-11/12 h-11 px-10 mx-auto rounded-md sm:hidden" : "sm:hidden relative mt-5 flex justify-around bg-VeryLightGray text-gray-500 w-11/12 h-11 px-10 mx-auto rounded-md"}>
            <button
              className={`pointer ${selectedFilter === 'all' ? 'text-blue-500' : ''} ${darkMode ? 'dark:hover:text-gray-200' : 'hover:text-gray-800'}`}
              onClick={() => filterTodos('all')}
            >
              All
            </button>
            <button
              className={`pointer ${selectedFilter === 'active' ? 'text-blue-500' : ''} ${darkMode ? 'dark:hover:text-gray-200' : 'hover:text-gray-800'}`}
              onClick={() => filterTodos('active')}
            >
              Active
            </button>
            <button
              className={`pointer ${selectedFilter === 'completed' ? 'text-blue-500' : ''} ${darkMode ? 'dark:hover:text-gray-200' : 'hover:text-gray-800'}`}
              onClick={() => filterTodos('completed')}
            >
              Completed
            </button>
          </div>


        </section>
      </header>
      <footer className={darkMode ? "h-4/6 w-full bg-DVeryDarkBlue" : "h-4/6 w-full bg-VeryLightGrayishBlue"}></footer>

    </>
  )
}

export default App;
