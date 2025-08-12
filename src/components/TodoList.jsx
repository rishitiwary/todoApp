// TodoList Component
import { CheckCircle2 } from 'lucide-react';
import TodoItem from './TodoItem';
const TodoList = ({ todos, onToggle, onDelete }) => {
  if (todos.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-12 h-12 text-blue-500" />
        </div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No tasks found</h3>
        <p className="text-gray-500">Add a new task to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TodoList;
