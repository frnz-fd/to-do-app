// HeaderComponent.jsx
import React from 'react';

const HeaderComponent = ({ darkMode, setDarkMode, newTodo, setNewTodo, addTodo }) => {
    // Function to handle dark mode toggle
    const handleDarkModeToggle = () => {
        setDarkMode(!darkMode);
        // Update local storage to remember user's dark mode preference
        localStorage.setItem('darkMode', JSON.stringify(!darkMode));
    };

    return (
        <header className={`bg-cover  ${darkMode ? 'bg-dark-header-desk' : 'bg-light-header-desk'} h-2/6`}>
            <section className='max-w-[475px] mx-auto py-5'>
                <div className='flex justify-between'>
                    {/* Title */}
                    <h1 className='text-white text-2xl font-semibold px-6 py-12 text-left w-52'>T O D O</h1>
                    {/* Dark mode toggle button */}
                    <button onClick={handleDarkModeToggle} className='w-fit h-fit py-12 px-8'>
                        {darkMode ? (
                            // Dark mode icon
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26"><path fill="#FFF" fillRule="evenodd" d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z" /></svg>
                        ) : (
                            // Light mode icon
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26"><path fill="#FFF" fillRule="evenodd" d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011 1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z" /></svg>
                        )}
                    </button>
                </div>

                {/* Add new todo */}
                <div
                    className={`addtodos flex justify-start  ${darkMode
                        ? 'bg-DVeryDarkDesaturatedBlue'
                        : 'bg-VeryLightGray'
                        } w-11/12 h-12 rounded-md mx-auto p-3`}
                >
                    {/* Circular border for the new todo input */}
                    <div className={darkMode ? 'absolute rounded-full border border-gray-700 ml-1 w-6 h-6 ' : 'absolute rounded-full border border-gray-300 ml-1 w-6 h-6'}></div>
                    {/* Input for new todo */}
                    <input
                        className={darkMode ? 'w-full bg-inherit px-10 placeholder-gray-500 outline-none text-gray-200 pointer' : 'w-full bg-inherit px-10 placeholder-gray-400 outline-none text-gray-700 pointer'}
                        placeholder='Create a new todo...'
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                    />
                </div>

                {/* Todo list */}

            </section>
        </header>
    );
};

export default HeaderComponent;
