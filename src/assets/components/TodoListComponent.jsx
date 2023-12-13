// TodoListComponent.jsx
import React from 'react';

const TodoListComponent = ({ todos, toggleComplete, deleteTodo, clearCompleted, filterTodos, selectedFilter, darkMode }) => {
  return (
    <section className='max-w-[475px] h-full mx-auto'>
      <main className='relative rounded-lg h-full w-11/12 mx-auto rounded-t-md '>
        {/* Map over the todos array to render each todo item */}
        {todos.map((todo, index) => (
          <div
            key={index}
            className={`todothings pointer flex justify-start ${darkMode
              ? 'bg-DVeryDarkDesaturatedBlue pointer border-gray-700'
              : 'bg-VeryLightGray pointer border-gray-200'
            } w-full h-12 p-3 border-b ${index === 0 ? 'rounded-t-md' : ''} ${todo.completed ? '' : ''}`}>

            {/* Circular button to toggle completion status */}
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
              onClick={() => toggleComplete(todo.id)}
            >
              {/* Checkmark icon when todo is completed */}
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

            {/* Todo text */}
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

            {/* Button to delete todo */}
            <button className='absolute right-4 mt-1 pointer' onClick={() => deleteTodo(todo.id)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
                <path fill="#494C6B" fillRule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z" />
              </svg>
            </button>
          </div>
        ))}

        {/* Display count of items left */}
        <div className={darkMode ? 'flex justify-between items-center px-6 text-sm w-full h-14 rounded-b-lg mx-auto bg-DVeryDarkDesaturatedBlue text-gray-600' : 'flex justify-between items-center px-6 text-sm w-full h-14 rounded-b-lg mx-auto bg-VeryLightGray text-gray-400'}>
          <div> {todos.filter((todo) => !todo.completed).length} items left</div>

          {/* Filter buttons for All, Active, and Completed */}
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

          {/* Button to clear completed todos */}
          <button onClick={clearCompleted}>Clear Completed</button>
        </div>

        {/* Responsive filter buttons for small screens */}
        <div className={darkMode ? "relative mt-5 flex justify-around bg-DVeryDarkDesaturatedBlue text-gray-400 w-full h-12 px-10 mx-auto rounded-md sm:hidden" : "sm:hidden relative mt-5 flex justify-around bg-VeryLightGray text-gray-500 w-full h-12 px-10 mx-auto rounded-md"}>
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
      </main>
    </section>
  );
};

export default TodoListComponent;
