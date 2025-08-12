import React, { useState, useEffect } from 'react';

import AddTodo from './AddTodo';
import TodoList from './TodoList';
import Filter from './Filter';



// Main TodoApp Component
const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  // Initialize with sample data (since localStorage isn't available)
  useEffect(() => {
    const sampleTodos = [
      {
        id: 1,
        text: 'Complete React Todo App',
        completed: false,
        createdAt: new Date().toISOString()
      },
      {
        id: 2,
        text: 'Review code and add comments',
        completed: true,
        createdAt: new Date(Date.now() - 86400000).toISOString()
      }
    ];
    setTodos(sampleTodos);
  }, []);

  // Add new todo
  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date().toISOString()
    };
    setTodos(prev => [newTodo, ...prev]);
  };

  // Toggle todo completion
  const toggleTodo = (id) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  // Delete todo
  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  // Filter todos
  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'pending') return !todo.completed;
    return true;
  });

  // Stats
  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;
  const pendingTodos = totalTodos - completedTodos;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Todo Master
          </h1>
          <p className="text-xl text-gray-600">
            Organize your life, one task at a time
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-6 rounded-2xl border-2 border-gray-200 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{totalTodos}</div>
            <div className="text-gray-600">Total Tasks</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border-2 border-green-200 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{completedTodos}</div>
            <div className="text-gray-600">Completed</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border-2 border-orange-200 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">{pendingTodos}</div>
            <div className="text-gray-600">Pending</div>
          </div>
        </div>

        {/* Add Todo */}
        <div className="mb-8">
          <AddTodo onAdd={addTodo} />
        </div>

        {/* Filter */}
        <div className="mb-8 flex justify-center">
          <Filter currentFilter={filter} onFilterChange={setFilter} />
        </div>

        {/* Todo List */}
        <div className="bg-white rounded-3xl border-2 border-gray-200 p-8 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              {filter === 'all' && 'All Tasks'}
              {filter === 'completed' && 'Completed Tasks'}
              {filter === 'pending' && 'Pending Tasks'}
            </h2>
            <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              {filteredTodos.length} {filteredTodos.length === 1 ? 'task' : 'tasks'}
            </span>
          </div>
          
          <TodoList
            todos={filteredTodos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500">
          <p>Built with React and modern design principles</p>
        </div>
      </div>
    </div>
  );
};

export default TodoApp;