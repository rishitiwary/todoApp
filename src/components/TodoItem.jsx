// TodoItem Component
import { CheckCircle2, Circle, Trash2 } from 'lucide-react';


const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <div className={`group flex items-center gap-3 p-4 bg-white rounded-xl border-2 transition-all duration-300 hover:shadow-lg hover:border-blue-200 ${
      todo.completed ? 'border-green-200 bg-green-50' : 'border-gray-200'
    }`}>
      <button
        onClick={() => onToggle(todo.id)}
        className={`flex-shrink-0 transition-all duration-300 ${
          todo.completed 
            ? 'text-green-500 hover:text-green-600' 
            : 'text-gray-400 hover:text-blue-500'
        }`}
      >
        {todo.completed ? (
          <CheckCircle2 className="w-6 h-6" />
        ) : (
          <Circle className="w-6 h-6" />
        )}
      </button>
      
      <div className="flex-1 min-w-0">
        <p className={`text-lg transition-all duration-300 ${
          todo.completed 
            ? 'text-gray-500 line-through' 
            : 'text-gray-800'
        }`}>
          {todo.text}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Added {new Date(todo.createdAt).toLocaleDateString()}
        </p>
      </div>
      
      <button
        onClick={() => onDelete(todo.id)}
        className="flex-shrink-0 opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 transition-all duration-300 p-2 rounded-lg hover:bg-red-50"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
};


export default TodoItem;;