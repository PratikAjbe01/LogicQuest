import React, { useState, useEffect } from 'react'

function Todo() {
    const [input, setInput] = useState('');
    const [todoList, setTodoList] = useState([]);
    const [isEdit, setIsEdit] = useState(null);
    const [isInitialized, setIsInitialized] = useState(false);
    
    // Only retrieve data from localStorage on initial mount
    useEffect(() => {
        const retrievedString = localStorage.getItem('myArray');
        if (retrievedString) {
            try {
                const retrievedArray = JSON.parse(retrievedString);
                setTodoList(retrievedArray);
            } catch (error) {
                console.error('Error parsing array from localStorage:', error);
                setTodoList([]);
            }
        }
        setIsInitialized(true);
    }, []);
    
    // Only update localStorage when todoList changes AND after initial load
    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem('myArray', JSON.stringify(todoList));
        }
    }, [todoList, isInitialized]);
    
    const addTodo = (e) => {
        e.preventDefault();
        if (input.trim() === '') return;

        if (isEdit !== null) {
            const list = [...todoList];
            list[isEdit] = input; 
            setTodoList(list);
            setIsEdit(null);
            setInput('');
        } else {
            setTodoList([...todoList, input]);
            setInput('');
        }
    }
    
    const deleteTodo = (ind) => {
        const list = [...todoList];
        list.splice(ind, 1);
        setTodoList(list);
    }
    
    const editTodo = (ind) => {
        setInput(todoList[ind]);
        setIsEdit(ind);
    }
    
    return (
        <main className="w-full min-h-screen flex justify-center items-center flex-col bg-gray-100">
 
            <div className="w-full max-w-md bg-blue-600 text-white p-4 mb-4 rounded">
                <h1 className="text-2xl font-bold text-center">Todo App</h1>
                <p className="text-center mt-2">
                    Keep track of your tasks and manage your daily activities.
                    Your todos are saved in local storage and persist across page refreshes.
                </p>
            </div>
            
            <div className="inputBar mb-4 w-full max-w-md flex">
                <input 
                    type="text" 
                    className="w-full p-2 border-2 outline-0 border-r-0 rounded-l" 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)} 
                 
                    placeholder="Add a new task..."
                />
                <button 
                    className="p-2 border-2 border-l-0 bg-blue-500  rounded-r hover:bg-blue-600" 
                    onClick={addTodo}
                >
                   <span className='text-white'> {isEdit !== null ? 'Update' : 'Add'}</span>
                </button>
            </div>
            
            <div className="notesBar p-2 w-full max-w-md bg-white rounded shadow">
                {todoList.length === 0 ? (
                    <div className="p-4 text-center text-gray-500">
                        No tasks yet. Add some tasks to get started!
                    </div>
                ) : (
                    todoList.map((value, ind) => {
                        return (
                            <div key={ind} className="w-full flex justify-between items-center p-2 border-b">
                                <span className="flex-grow truncate pr-2">{value}</span>
                                <div className="flex">
                                    <button 
                                        className="p-2 mr-2 border bg-blue-500 text-white rounded hover:bg-blue-600" 
                                        onClick={() => editTodo(ind)}
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        className="p-2 border bg-blue-500 text-white rounded hover:bg-blue-600" 
                                        onClick={() => deleteTodo(ind)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        );
                    })
                )}
                
              
                {todoList.length > 0 && (
                    <div className="p-2 text-right text-sm text-gray-600">
                        {todoList.length === 1 ? '1 task' : `${todoList.length} tasks`}
                    </div>
                )}
            </div>
        </main>
    )
}

export default Todo